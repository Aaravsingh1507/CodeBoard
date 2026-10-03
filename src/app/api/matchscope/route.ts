import { NextRequest, NextResponse } from "next/server";
import { extractText } from "unpdf";

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

    let resume = "";
    let jobDescription = "";

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      jobDescription = (formData.get("jobDescription") as string) || "";
      const rawResumeText = (formData.get("resume") as string) || "";

      const file = formData.get("file") as File | null;
      if (file && file.size > 0) {
        const fileName = (file.name || "").toLowerCase();
        if (fileName.endsWith(".pdf") || file.type === "application/pdf") {
          const arrayBuffer = await file.arrayBuffer();
          const pdfResult = await extractText(new Uint8Array(arrayBuffer));
          const pdfText = Array.isArray(pdfResult.text)
            ? pdfResult.text.join("\n\n")
            : String(pdfResult.text || "");
          resume = pdfText.trim();
        } else {
          // Text, markdown, or code file
          const text = await file.text();
          resume = text.trim();
        }
      }

      if (!resume && rawResumeText) {
        resume = rawResumeText.trim();
      }
    } else {
      const body = await req.json().catch(() => ({}));
      resume = (body.resume || "").trim();
      jobDescription = (body.jobDescription || "").trim();
    }

    if (!resume) {
      return NextResponse.json(
        { error: "Please upload your resume file (PDF/TXT/MD) or provide resume text for analysis." },
        { status: 400 }
      );
    }

    const isTargetedMatch = Boolean(jobDescription && jobDescription.trim().length > 20);

    let systemPrompt: string;
    let userContent: string;

    if (isTargetedMatch) {
      systemPrompt = `You are MatchScope, an expert AI applicant tracking system (ATS) analyst and senior technical recruiter.
Your job is to objectively and rigorously analyze how well a candidate's resume matches a target job description.

SCORING METHODOLOGY:
1. Overall Match Score (0 to 100):
   - Score objectively based on concrete evidence in the resume matching the job description.
2. Label:
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
   - Reference actual resume content or exact bullets in 'context', and provide the exact phrasing or metric to add in 'description'.

Return ONLY a valid JSON object. No markdown code fences, no conversational prose.
JSON structure:
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

      userContent = `CANDIDATE RESUME:
"""
${resume}
"""

TARGET JOB DESCRIPTION:
"""
${jobDescription.trim()}
"""`;
    } else {
      // General Resume Evaluation & ATS Hiring Audit
      systemPrompt = `You are MatchScope, an elite technical career coach, senior engineering hiring manager, and ATS auditor.
You analyze resumes uploaded by software engineers and developers to evaluate their overall hiring readiness, ATS compatibility, technical depth, and quantifiable impact.

SCORING METHODOLOGY:
1. Overall ATS & Hiring Readiness Score (0 to 100):
   - 0-44: "Poor Fit" (Critical formatting issues, lacks metrics, vague descriptions)
   - 45-59: "Moderate Fit" (Adequate skills listed, but missing quantifiable impact or modern tech stack depth)
   - 60-74: "Good Fit" (Solid technical baseline, clean structure, could improve impact metrics)
   - 75-89: "Strong Fit" (Well-crafted engineering resume, strong metrics, clear scope)
   - 90-100: "Excellent Fit" (Top 5% tech resume, elite impact, high ATS parsability)
2. Summary: Exactly a 2-line executive summary summarizing the candidate's core specialization, primary technical strength, and key area to elevate.
3. Categories: Exactly 4 categories with score (0-100) and specific, honest 1-2 sentence feedback:
   - "Technical Breadth & Stack" (Depth of languages, frameworks, system architecture)
   - "Impact & Measurable Metrics" (Usage of quantifiable results, Google XYZ formula, scale indicators)
   - "ATS Formatting & Parsability" (Structure clarity, standard headers, bullet conciseness)
   - "Software Engineering Competencies" (Testing, CI/CD, algorithms, collaborative development)
4. Keywords: Extract 12 to 16 modern core engineering skills, libraries, and architectural concepts relevant to the candidate's inferred profile. Classify each:
   - "match": Prominently demonstrated with real project/work experience.
   - "partial": Mentioned casually or only in skills list without project context.
   - "miss": Key industry competency that is missing and would significantly boost interview rate.
5. Suggestions: 4 to 6 concrete, actionable bullet rewrites and improvements ranked by priority ('high', 'medium', or 'low').
   - Identify weak, vague, or passive lines from the resume in 'context'.
   - In 'description', provide the exact rewritten bullet points using quantified impact and strong action verbs.

Return ONLY a valid JSON object. No markdown code fences, no conversational prose.
JSON structure:
{
  "score": number,
  "label": "Poor Fit" | "Moderate Fit" | "Good Fit" | "Strong Fit" | "Excellent Fit",
  "summary": string,
  "categories": [
    { "name": "Technical Breadth & Stack", "score": number, "comment": string },
    { "name": "Impact & Measurable Metrics", "score": number, "comment": string },
    { "name": "ATS Formatting & Parsability", "score": number, "comment": string },
    { "name": "Software Engineering Competencies", "score": number, "comment": string }
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

      userContent = `CANDIDATE RESUME:
"""
${resume}
"""`;
    }

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
    cleaned = cleaned.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();

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

    const fallbackCategories = isTargetedMatch
      ? ["Skills Match", "Experience Level", "Tech Stack", "Role Alignment"]
      : ["Technical Breadth & Stack", "Impact & Measurable Metrics", "ATS Formatting & Parsability", "Software Engineering Competencies"];

    let categories: MatchCategory[] = [];
    if (Array.isArray(parsed.categories)) {
      categories = (parsed.categories as Array<Record<string, unknown>>).map((c, idx) => ({
        name: typeof c.name === "string" ? c.name : (fallbackCategories[idx] || "Category"),
        score: Math.max(0, Math.min(100, Math.round(Number(c.score) || score))),
        comment: typeof c.comment === "string" ? c.comment : "",
      }));
    } else {
      categories = fallbackCategories.map((name) => ({
        name,
        score,
        comment: "Analysis generated based on overall evaluation.",
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
      { error: errorObj?.message || "An unexpected error occurred while analyzing the resume." },
      { status: 500 }
    );
  }
}
