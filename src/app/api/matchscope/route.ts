import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export interface MatchCategory {
  name: "Skills Match" | "Experience Level" | "Tech Stack" | "Role Alignment" | string;
  score: number;
  comment: string;
}

export interface MatchKeyword {
  word: string;
  status: "match" | "partial" | "miss";
}

export interface MatchSuggestion {
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  context: string;
}

export interface MatchScopeResponse {
  score: number;
  label: "Poor Fit" | "Moderate Fit" | "Good Fit" | "Strong Fit" | "Excellent Fit";
  summary: string;
  categories: MatchCategory[];
  keywords: MatchKeyword[];
  suggestions: MatchSuggestion[];
}

const DEFAULT_MODEL = "openai/gpt-oss-120b";
const FALLBACK_MODEL = "qwen/qwen3.8-27b";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured in environment variables." },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { resume, jobDescription } = body as { resume?: string; jobDescription?: string };

    if (!resume || !resume.trim()) {
      return NextResponse.json(
        { error: "Please provide your resume text for analysis." },
        { status: 400 }
      );
    }

    if (!jobDescription || !jobDescription.trim()) {
      return NextResponse.json(
        { error: "Please provide the target job description to match against." },
        { status: 400 }
      );
    }

    if (resume.trim().length < 30) {
      return NextResponse.json(
        { error: "Resume text is too short. Please provide a more complete resume." },
        { status: 400 }
      );
    }

    if (jobDescription.trim().length < 30) {
      return NextResponse.json(
        { error: "Job description is too short. Please provide a more detailed job posting." },
        { status: 400 }
      );
    }

    const systemPrompt = `You are MatchScope, an elite AI technical recruiter, ATS matching algorithm, and hiring strategist.
Your task is to critically analyze a candidate's Resume against a Job Description.

Analyze deeply:
1. Score (0 to 100): Weighted match based on requirements, experience seniority, tech stack, and responsibilities.
2. Label: Assign one of strictly: "Poor Fit", "Moderate Fit", "Good Fit", "Strong Fit", "Excellent Fit".
   - 0-44: "Poor Fit"
   - 45-59: "Moderate Fit"
   - 60-74: "Good Fit"
   - 75-89: "Strong Fit"
   - 90-100: "Excellent Fit"
3. Summary: Exactly a 2-line summary explaining the overall fit, primary strength, and main gap.
4. Categories: Exactly 4 categories with score (0-100) and a concise, specific 1-2 sentence comment:
   - "Skills Match"
   - "Experience Level"
   - "Tech Stack"
   - "Role Alignment"
5. Keywords: Extract 12 to 18 critical technical, domain, and role keywords from the Job Description. Classify each:
   - "match": The skill/tool/concept is explicitly and strongly demonstrated in the resume.
   - "partial": The skill/tool is implied, adjacent (e.g. SQL vs PostgreSQL), or briefly mentioned without depth.
   - "miss": The skill/tool/requirement is missing from the resume.
6. Suggestions: 4 to 6 specific, actionable resume fixes ranked by priority ('high', 'medium', or 'low').
   - High priority fixes for major gaps, medium for missing keywords/context, low for phrasing/formatting.
   - IMPORTANT: DO NOT give generic advice like "tailor your resume" or "use action verbs". Reference actual resume content or exact bullets in the 'context' field, and provide the exact phrasing or metric to add in 'description'.

CRITICAL INSTRUCTION:
Return ONLY a valid JSON object. No markdown formatting, no code fences (\`\`\`json or \`\`\`), no conversational intro or outro.

Required JSON structure:
{
  "score": number,
  "label": "Poor Fit" | "Moderate Fit" | "Good Fit" | "Strong Fit" | "Excellent Fit",
  "summary": string,
  "categories": [
    { "name": "Skills Match", "score": number, "comment": string },
    { "name": "Experience Level", "score": number, "comment": string },
    { "name": "Tech Stack", "score": number, "comment": string },
    { "name": "Role Alignment", "score": number, "comment": string }
  ],
  "keywords": [
    { "word": string, "status": "match" | "partial" | "miss" }
  ],
  "suggestions": [
    {
      "priority": "high" | "medium" | "low",
      "title": string,
      "description": string,
      "context": string
    }
  ]
}`;

    const userContent = `CANDIDATE RESUME:
"""
${resume.trim()}
"""

TARGET JOB DESCRIPTION:
"""
${jobDescription.trim()}
"""`;

    let chosenModel = process.env.GROQ_MATCHSCOPE_MODEL || DEFAULT_MODEL;
    let groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: chosenModel,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
        temperature: 0.15,
        max_tokens: 2048,
        response_format: { type: "json_object" },
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.warn(`Groq request with ${chosenModel} failed (${groqRes.status}):`, errText);
      if (chosenModel !== FALLBACK_MODEL && (groqRes.status === 404 || errText.includes("model_not_found") || errText.includes("does not exist"))) {
        chosenModel = FALLBACK_MODEL;
        groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: chosenModel,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userContent },
            ],
            temperature: 0.15,
            max_tokens: 2048,
          }),
        });
      }
    }

    if (!groqRes.ok) {
      const errBody = await groqRes.text();
      return NextResponse.json(
        { error: `Groq AI API error (${groqRes.status}): ${errBody}` },
        { status: 502 }
      );
    }

    const jsonResponse = (await groqRes.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const rawContent: string = jsonResponse.choices?.[0]?.message?.content ?? "";

    if (!rawContent) {
      return NextResponse.json(
        { error: "AI model returned an empty response. Please try again." },
        { status: 502 }
      );
    }

    // Strip markdown code fences if present
    let cleaned = rawContent.trim();
    cleaned = cleaned.replace(/^\`\`\`json\s*/i, "").replace(/^\`\`\`\s*/i, "").replace(/\`\`\`\s*$/i, "").trim();

    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1) {
      cleaned = cleaned.substring(firstBrace, lastBrace + 1);
    }

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(cleaned) as Record<string, unknown>;
    } catch {
      console.error("Failed to parse JSON from Groq:", cleaned);
      return NextResponse.json(
        { error: "Could not parse AI response as valid JSON.", raw: cleaned },
        { status: 502 }
      );
    }

    // Normalize and sanitize fields
    const score = Math.max(0, Math.min(100, Math.round(Number(parsed.score) || 0)));

    let label: MatchScopeResponse["label"] = "Good Fit";
    if (typeof parsed.label === "string" && ["Poor Fit", "Moderate Fit", "Good Fit", "Strong Fit", "Excellent Fit"].includes(parsed.label)) {
      label = parsed.label as MatchScopeResponse["label"];
    } else {
      if (score >= 90) label = "Excellent Fit";
      else if (score >= 75) label = "Strong Fit";
      else if (score >= 60) label = "Good Fit";
      else if (score >= 45) label = "Moderate Fit";
      else label = "Poor Fit";
    }

    const summary = typeof parsed.summary === "string" ? parsed.summary.trim() : "";

    const expectedCategoryNames = ["Skills Match", "Experience Level", "Tech Stack", "Role Alignment"];
    let categories: MatchCategory[] = [];
    if (Array.isArray(parsed.categories)) {
      categories = (parsed.categories as Array<Record<string, unknown>>).map((c, idx) => ({
        name: typeof c.name === "string" ? c.name : (expectedCategoryNames[idx] || "Category"),
        score: Math.max(0, Math.min(100, Math.round(Number(c.score) || score))),
        comment: typeof c.comment === "string" ? c.comment : "",
      }));
    } else {
      categories = expectedCategoryNames.map((name) => ({
        name,
        score,
        comment: "Analysis generated based on overall alignment.",
      }));
    }

    let keywords: MatchKeyword[] = [];
    if (Array.isArray(parsed.keywords)) {
      keywords = parsed.keywords.map((k: unknown) => {
        if (k && typeof k === "object" && "word" in k) {
          const item = k as { word?: unknown; status?: unknown };
          const word = typeof item.word === "string" ? item.word.trim() : String(item.word);
          const status = (item.status === "match" || item.status === "partial" || item.status === "miss")
            ? item.status
            : "partial";
          return { word, status };
        }
        return { word: String(k), status: "partial" as const };
      });
    }

    let suggestions: MatchSuggestion[] = [];
    if (Array.isArray(parsed.suggestions)) {
      suggestions = (parsed.suggestions as Array<Record<string, unknown>>).map((s) => ({
        priority: (s.priority === "high" || s.priority === "medium" || s.priority === "low") ? s.priority : "medium",
        title: typeof s.title === "string" ? s.title : "Improvement Opportunity",
        description: typeof s.description === "string" ? s.description : "",
        context: typeof s.context === "string" ? s.context : "",
      }));
    }

    const result: MatchScopeResponse = {
      score,
      label,
      summary,
      categories,
      keywords,
      suggestions,
    };

    return NextResponse.json({
      success: true,
      data: result,
      modelUsed: chosenModel,
    });
  } catch (err: unknown) {
    const errorObj = err as Error;
    console.error("MatchScope API error:", errorObj);
    return NextResponse.json(
      { error: errorObj?.message || "An unexpected error occurred while analyzing the match." },
      { status: 500 }
    );
  }
}
