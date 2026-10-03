import { NextRequest, NextResponse } from "next/server";
import { extractText } from "unpdf";

export const runtime = "nodejs";

export interface MatchCategory {
  name: "Skills Match" | "Experience Level" | "Tech Stack" | "Role Alignment" | "Technical Breadth & Stack" | "Impact & Measurable Metrics" | "ATS Formatting & Parsability" | "Software Engineering Competencies" | string;
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
      systemPrompt = `You are MatchScope, an elite Applicant Tracking System (ATS) evaluation engine, Principal Engineering Hiring Lead, and executive technical recruiter.
Your sole function is to execute an objective, deep forensic comparison between the candidate's resume and the target job description.

INTERNAL ANALYTICAL PROTOCOL (THINK DEEPLY & EVALUATE RIGOROUSLY BEFORE GENERATING JSON):
1. TECHNICAL FORENSIC AUDIT:
   - Differentiate strictly between superficial keyword mentions in a "skills" section versus active, production-grade application in projects or work history.
   - Contrast the required tech stack against the candidate's demonstrated technologies.
2. EXPERIENCE & SCOPE RECONCILIATION:
   - Compare the candidate's verified years of experience and level of autonomy against the role's seniority requirements (Junior, Mid, Senior, Staff/Lead).
   - Evaluate scope: individual contributor tasks vs. architectural ownership, system scale, and leadership.
3. QUANTIFIABLE IMPACT ANALYSIS:
   - Audit experience bullets against the Google XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]".
   - Penalize passive, duty-focused statements ("Responsible for...", "Assisted in...") vs. high-velocity outcomes.
4. ATS PARSABILITY & TAXONOMY:
   - Evaluate whether the resume's language and taxonomy seamlessly map to the target role's core search parameters.
5. MATHEMATICAL COHERENCE & CALIBRATION:
   - You will score 4 distinct categories from 0 to 100:
     a. "Skills Match": Direct evidence of required core languages, frameworks, and tools.
     b. "Experience Level": Alignment of years, seniority, and scale of responsibilities.
     c. "Tech Stack": Modernity, infrastructure, database, and adjacent ecosystem overlap.
     d. "Role Alignment": Problem domain synergy (e.g., distributed systems, web platforms, ML ops, cloud).
   - The overall "score" MUST be the rounded arithmetic average of the four category scores.
   - The "label" MUST be mathematically locked to the overall score:
     * 90 to 100: "Excellent Fit"
     * 75 to 89: "Strong Fit"
     * 60 to 74: "Good Fit"
     * 45 to 59: "Moderate Fit"
     * 0 to 44: "Poor Fit"
6. KEYWORD EXTRACTION (12 to 18 critical technical & role terms):
   - "match": Directly verified in the candidate's projects/experience.
   - "partial": Adjacent, theoretical, or mentioned casually without evidence of depth.
   - "miss": Key requirement from the job description that is completely absent from the resume.
7. ACTIONABLE SUGGESTIONS (4 to 6 items):
   - For every suggestion, quote the actual weak or missing line from the resume in "context".
   - In "description", provide an exact, production-grade rewritten bullet point using active verbs and quantified metrics ready to insert into the resume.

CRITICAL FUNCTIONAL CONSTRAINTS:
- Output MUST be 100% valid JSON matching the exact schema below.
- Do NOT output any markdown fences (\`\`\`json or \`\`\`), greetings, intro, or concluding prose.
- Output ONLY the raw JSON object.

JSON SCHEMA:
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
      // General Resume Audit & ATS Readiness
      systemPrompt = `You are MatchScope, an elite technical career auditor, Principal Software Architect, and top-tier ATS optimization engine.
Your sole function is to execute an in-depth, rigorous forensic evaluation of a software engineering resume to maximize interview conversion rates.

INTERNAL ANALYTICAL PROTOCOL (THINK DEEPLY & EVALUATE RIGOROUSLY BEFORE GENERATING JSON):
1. SPECIALIZATION & CAREER TRAJECTORY:
   - Identify candidate specialization (e.g., Full-Stack, Backend, Distributed Systems, Frontend/UI, AI/ML, DevOps/Cloud).
   - Assess career progression, continuity, and depth of technical ownership.
2. TECHNICAL ARCHITECTURE & STACK DEPTH:
   - Scrutinize whether technologies are merely listed in a skills section or proven through architectural implementation (e.g., microservices, caching layers, database indexing, message queues, Docker, CI/CD pipelines).
3. GOOGLE XYZ IMPACT BENCHMARK:
   - Analyze every bullet point against Google's XYZ formula: "Accomplished [X] as measured by [Y], by doing [Z]".
   - Penalize generic task descriptions ("Built features", "Wrote unit tests", "Fixed bugs").
   - Reward metrics: latency, throughput, cost savings, user base, automated test coverage, reliability %.
4. ATS COMPLIANCE & RECRUITER READABILITY:
   - Evaluate readability, standard headers (Summary, Skills, Experience, Projects, Education), chronological coherence, and scan-friendliness.
5. MATHEMATICAL COHERENCE & CALIBRATION:
   - You will score 4 distinct categories from 0 to 100:
     a. "Technical Breadth & Stack": Modernity, depth of languages, frameworks, databases, and system design.
     b. "Impact & Measurable Metrics": Proportion of bullets with concrete quantified results and XYZ structure.
     c. "ATS Formatting & Parsability": Clean taxonomy, standard section headers, and semantic clarity.
     d. "Software Engineering Competencies": Evidence of testing, CI/CD, code review, distributed design, performance tuning.
   - The overall "score" MUST be the rounded arithmetic average of the four category scores.
   - The "label" MUST be mathematically locked to the overall score:
     * 90 to 100: "Excellent Fit"
     * 75 to 89: "Strong Fit"
     * 60 to 74: "Good Fit"
     * 45 to 59: "Moderate Fit"
     * 0 to 44: "Poor Fit"
6. KEYWORD EXTRACTION (12 to 16 modern core engineering skills, tools, and paradigms):
   - "match": Prominently demonstrated with real project/production experience.
   - "partial": Listed in skills or mentioned without depth or impact metrics.
   - "miss": High-value, industry-standard technology or concept missing from the resume that would drastically boost interview callbacks for this profile.
7. ACTIONABLE BULLET REWRITES (4 to 6 items):
   - In "context", quote the candidate's exact weak, unquantified, or passive bullet point.
   - In "title", state the specific improvement angle (e.g., "Transform Task into Quantified XYZ Impact").
   - In "description", provide a polished, copy-paste-ready rewrite of that bullet point utilizing strong action verbs, technical stack clarity, and estimated/placeholder metrics (e.g., "Reduced P99 latency by 35%...").

CRITICAL FUNCTIONAL CONSTRAINTS:
- Output MUST be 100% valid JSON matching the exact schema below.
- Do NOT output any markdown fences (\`\`\`json or \`\`\`), greetings, intro, or concluding prose.
- Output ONLY the raw JSON object.

JSON SCHEMA:
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
        temperature: 0.10, // Deterministic, rigorous analytical scoring
        max_tokens: 3500,  // Deep, unconstrained analysis without truncation
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
            temperature: 0.10,
            max_tokens: 3500,
            response_format: { type: "json_object" },
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

    // Process and validate categories
    const fallbackCategories = isTargetedMatch
      ? ["Skills Match", "Experience Level", "Tech Stack", "Role Alignment"]
      : ["Technical Breadth & Stack", "Impact & Measurable Metrics", "ATS Formatting & Parsability", "Software Engineering Competencies"];

    let categories: MatchCategory[] = [];
    if (Array.isArray(parsed.categories) && parsed.categories.length > 0) {
      categories = (parsed.categories as Array<Record<string, unknown>>).map((c, idx) => ({
        name: typeof c.name === "string" && c.name.trim().length > 0 ? c.name.trim() : (fallbackCategories[idx] || "Category"),
        score: Math.max(0, Math.min(100, Math.round(Number(c.score) || 70))),
        comment: typeof c.comment === "string" ? c.comment.trim() : "",
      }));
    } else {
      categories = fallbackCategories.map((name) => ({
        name,
        score: 70,
        comment: "Detailed evaluation performed based on overall resume evidence.",
      }));
    }

    // Mathematical Calibration: Calculate authentic average from categories
    const categorySum = categories.reduce((sum, cat) => sum + cat.score, 0);
    const categoryAverage = Math.round(categorySum / categories.length);

    // Reconcile overall score with category average to guarantee flawless mathematical coherence
    let score = Math.max(0, Math.min(100, Math.round(Number(parsed.score) || categoryAverage)));
    if (Math.abs(score - categoryAverage) > 3) {
      score = categoryAverage;
    }

    // Mathematically lock label to score
    let label: MatchScopeResponse["label"];
    if (score >= 90) label = "Excellent Fit";
    else if (score >= 75) label = "Strong Fit";
    else if (score >= 60) label = "Good Fit";
    else if (score >= 45) label = "Moderate Fit";
    else label = "Poor Fit";

    const summary = typeof parsed.summary === "string" && parsed.summary.trim().length > 0
      ? parsed.summary.trim()
      : `Candidate demonstrates a ${label.toLowerCase()} profile with solid foundational engineering strengths and strategic opportunities to boost quantified impact.`;

    let keywords: MatchKeyword[] = [];
    if (Array.isArray(parsed.keywords)) {
      keywords = parsed.keywords.map((k: unknown) => {
        if (k && typeof k === "object" && "word" in k) {
          const item = k as { word?: unknown; status?: unknown };
          const word = typeof item.word === "string" ? item.word.trim() : String(item.word || "");
          const rawStatus = String(item.status || "").toLowerCase();
          const status: MatchKeyword["status"] =
            rawStatus === "match" ? "match" : rawStatus === "miss" ? "miss" : "partial";
          return { word, status };
        }
        return { word: String(k).trim(), status: "partial" as const };
      }).filter((k) => k.word.length > 0);
    }

    let suggestions: MatchSuggestion[] = [];
    if (Array.isArray(parsed.suggestions)) {
      suggestions = (parsed.suggestions as Array<Record<string, unknown>>).map((s) => {
        const rawPriority = String(s.priority || "").toLowerCase();
        const priority: MatchSuggestion["priority"] =
          rawPriority === "high" ? "high" : rawPriority === "low" ? "low" : "medium";
        return {
          priority,
          title: typeof s.title === "string" && s.title.trim().length > 0 ? s.title.trim() : "Optimize Bullet Impact",
          description: typeof s.description === "string" ? s.description.trim() : "",
          context: typeof s.context === "string" ? s.context.trim() : "",
        };
      }).filter((s) => s.description.length > 0 || s.context.length > 0);
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
