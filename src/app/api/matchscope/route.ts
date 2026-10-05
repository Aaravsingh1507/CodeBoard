import { NextRequest, NextResponse } from "next/server";
import { extractText } from "unpdf";

export const runtime = "nodejs";

export interface MatchCategory {
  name: string;
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

export interface RoadmapDsa {
  recommendedCount: string;
  focusTopics: string[];
  advice: string;
}

export interface RoadmapProject {
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  technologies: string[];
  description: string;
  whyItMatters: string;
}

export interface RoadmapTool {
  tool: string;
  status: "Mastered" | "Needs Practice" | "Must Learn";
  explanation: string;
}

export interface CareerRoadmap {
  suitability: string;
  dsaTarget: RoadmapDsa;
  projectsTarget: {
    additionalNeeded: string;
    recommendedProjects: RoadmapProject[];
  };
  toolsMastery: RoadmapTool[];
}

export interface MatchScopeResponse {
  score: number;
  label: "Poor Fit" | "Moderate Fit" | "Good Fit" | "Strong Fit" | "Excellent Fit";
  summary: string;
  categories: MatchCategory[];
  keywords: MatchKeyword[];
  suggestions: MatchSuggestion[];
  roadmap: CareerRoadmap;
  detectedCandidateRole?: string;
}

const DEFAULT_MODEL = "openai/gpt-oss-120b";
const FALLBACK_MODEL = "qwen/qwen3.8-27b";

/**
 * Fast heuristic validation to detect documents that are obviously NOT resumes
 * (e.g. academic research papers, invoices, receipts, legal agreements, syllabi, or empty text)
 */
function validateResumeHeuristics(text: string): { isValid: boolean; reason?: string } {
  const cleaned = text.trim();
  const words = cleaned.split(/\s+/).filter(Boolean);

  if (cleaned.length < 100 || words.length < 25) {
    return {
      isValid: false,
      reason:
        "The uploaded document contains very little or no readable text. If you uploaded a scanned PDF, please ensure it contains selectable text, or upload a standard PDF, DOCX, TXT, or Markdown resume.",
    };
  }

  const lower = cleaned.toLowerCase();

  // Resume section / keyword markers
  const resumeMarkers = [
    "education", "university", "college", "school", "bachelor", "master", "ph.d",
    "b.tech", "b.e", "b.s", "m.tech", "m.s", "degree", "gpa", "cgpa",
    "experience", "work history", "employment", "intern", "internship",
    "developer", "engineer", "software", "programmer", "architect",
    "projects", "personal projects", "academic projects",
    "skills", "technical skills", "technologies", "frameworks", "programming languages",
    "curriculum vitae", "resume", "certifications", "achievements",
    "summary", "objective"
  ];

  let matchedMarkers = 0;
  for (const marker of resumeMarkers) {
    if (lower.includes(marker)) {
      matchedMarkers++;
    }
  }

  // 1. Academic Research Papers
  const first2000 = lower.substring(0, 2000);
  const hasAbstract = first2000.includes("abstract");
  const hasPaperTerms =
    lower.includes("arxiv:") ||
    lower.includes("doi.org") ||
    lower.includes("ieee") ||
    lower.includes("in this paper") ||
    lower.includes("we propose") ||
    lower.includes("et al.") ||
    lower.includes("conference on") ||
    lower.includes("proceedings of");
  const hasCitations = /references\s*\[\d+\]|references\s*\n\s*\[1\]|bibliography/i.test(lower);
  const hasPaperSections =
    lower.includes("methodology") ||
    lower.includes("related work") ||
    lower.includes("experimental results") ||
    lower.includes("experiments");

  if ((hasAbstract || hasPaperTerms) && (hasCitations || hasPaperSections) && matchedMarkers < 3) {
    return {
      isValid: false,
      reason:
        "This document appears to be an academic or research paper, not a personal resume. MatchScope only evaluates candidate resumes and CVs. Please upload your personal resume or CV with your education, skills, projects, and work experience.",
    };
  }

  // 2. Invoices / Receipts / Financial Bills
  const isInvoice =
    (lower.includes("invoice") || lower.includes("receipt") || lower.includes("bill to") || lower.includes("amount due") || lower.includes("tax invoice")) &&
    (lower.includes("subtotal") || lower.includes("payment terms") || lower.includes("due date") || lower.includes("total amount"));
  if (isInvoice && matchedMarkers < 2) {
    return {
      isValid: false,
      reason:
        "This document appears to be a financial invoice or receipt, not a personal resume. Please upload a valid candidate resume or CV.",
    };
  }

  // 3. Legal Contracts / Terms / Privacy Policies
  const isLegalDoc =
    (lower.includes("terms and conditions") || lower.includes("privacy policy") || lower.includes("nondisclosure agreement") || lower.includes("hereby agree")) &&
    (lower.includes("governing law") || lower.includes("confidential information") || lower.includes("intellectual property rights") || lower.includes("warranties"));
  if (isLegalDoc && matchedMarkers < 2) {
    return {
      isValid: false,
      reason:
        "This document appears to be a legal agreement or policy document, not a personal resume. Please upload a valid candidate resume or CV.",
    };
  }

  // 4. Course Syllabi / Homework Assignments
  const isAssignment =
    (lower.includes("syllabus") || lower.includes("homework assignment") || lower.includes("final exam") || lower.includes("problem set")) &&
    (lower.includes("grading policy") || lower.includes("office hours") || lower.includes("due date:"));
  if (isAssignment && matchedMarkers < 2) {
    return {
      isValid: false,
      reason:
        "This document appears to be a course syllabus or assignment, not a personal resume. Please upload a valid candidate resume or CV.",
    };
  }

  return { isValid: true };
}

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

    // Strip unprintable control / binary characters
    resume = resume.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, " ").trim();

    if (!resume) {
      return NextResponse.json(
        { error: "Please upload your resume file (PDF/TXT/MD) or provide resume text for analysis." },
        { status: 400 }
      );
    }

    // Fast heuristic pre-check
    const heuristicCheck = validateResumeHeuristics(resume);
    if (!heuristicCheck.isValid) {
      return NextResponse.json(
        {
          success: false,
          isValidResume: false,
          error: heuristicCheck.reason,
        },
        { status: 400 }
      );
    }

    const isTargetedMatch = Boolean(jobDescription && jobDescription.trim().length > 20);

    let systemPrompt: string;
    let userContent: string;

    if (isTargetedMatch) {
      systemPrompt = `You are MatchScope, a friendly, deeply knowledgeable senior software engineer and tech mentor.
Your job is to read the candidate's resume and compare it against the target job posting.
Explain everything in SIMPLE, PLAIN, BEGINNER-FRIENDLY ENGLISH. Do not use confusing recruitment jargon or corporate buzzwords.

CRITICAL STEP 1 - RESUME VALIDITY GATE (MANDATORY BEFORE ANY EVALUATION):
Before performing any evaluation, determine whether the provided CANDIDATE RESUME is genuinely an individual person's resume or CV.
A genuine resume details an individual candidate's qualifications: their contact details, education, work experience, technical/professional skills, or personal projects.

NON-RESUMES INCLUDE (YOU MUST STRICTLY REJECT THESE):
- Academic or scientific research papers, preprints, journal articles (e.g. papers on machine learning, algorithms, physics, biology, etc.)
- Course lecture slides, textbooks, homework assignments, problem sets, syllabi
- Invoices, receipts, financial records, bank statements
- Legal agreements, contracts, licenses, terms of service, privacy policies
- Technical documentation, software manuals, README files, API specifications, architectural whitepapers
- Random notes, essays, blog posts, fiction, news articles, blank or garbled documents

IF THE DOCUMENT IS NOT A PROPER RESUME:
You MUST immediately reject it and return ONLY valid JSON matching this schema:
{
  "isValidResume": false,
  "rejectionReason": "This document is not a proper resume. [Brief 1-sentence friendly explanation of what this document appears to be, and a clear request to upload their personal resume or CV with education, skills, projects, and work history to get evaluated.]"
}
CRITICAL: If isValidResume is false, do NOT invent scores, do NOT invent categories, do NOT create a roadmap, and do NOT claim suitability or unsuitability for any role (e.g. do NOT evaluate for AI Engineer or Software Engineer or any role).

IF AND ONLY IF THE DOCUMENT IS A VALID RESUME:
Set "isValidResume": true, specify the candidate's target role in "detectedCandidateRole" (e.g. "Full Stack Developer", "Frontend Developer", "Backend Developer", "AI/ML Engineer", "Data Engineer", "DevOps Engineer", "Mobile Developer", or matching the target job), and evaluate:
1. Real Project Quality: Did they build actual working software, or just follow simple tutorials? Are their projects relevant to what this job asks for?
2. Tools & Skills Mastery: Which tools listed in their resume are genuinely mastered in real code, versus just listed as buzzwords in a skills list?
3. Role Suitability: Tell them plainly: Are they ready for this specific job right now? If not, what exact gaps are holding them back?
4. LeetCode & DSA Target: Tell them how many coding/DSA problems they should practice (e.g. 60-80 problems) and the exact topics (like Trees, Graphs, Two Pointers) needed for this kind of role.
5. Projects to Build: Tell them how many more projects they need to build, and give 2 concrete, tailored project ideas with tech stack to prove they can do this job.
6. Honest Scoring (0-100):
   - Categories:
     * "Job Requirements Match" (0-100)
     * "Required Tech Stack" (0-100)
     * "Project Experience Depth" (0-100)
     * "Seniority & Experience Match" (0-100)
   - Overall score MUST equal the rounded average of the 4 category scores.
   - Label: 90-100: "Excellent Fit", 75-89: "Strong Fit", 60-74: "Good Fit", 45-59: "Moderate Fit", 0-44: "Poor Fit".
7. Keywords (12 to 16 key skills/tools from the job):
   - "match": They proved this in a real project.
   - "partial": Mentioned casually or only in skills list without proof.
   - "miss": Missing from resume, but required for the job.
8. Suggestions (4 to 5 bullet improvements):
   - In "context", quote the weak/vague sentence from their resume.
   - In "title", write a simple friendly tip.
   - In "description", write a rewritten, impressive bullet point showing real results and numbers.

OUTPUT FORMAT: Return ONLY valid JSON matching this schema:
{
  "isValidResume": true,
  "detectedCandidateRole": string,
  "score": number,
  "label": "Poor Fit" | "Moderate Fit" | "Good Fit" | "Strong Fit" | "Excellent Fit",
  "summary": string,
  "categories": [
    { "name": "Job Requirements Match", "score": number, "comment": string },
    { "name": "Required Tech Stack", "score": number, "comment": string },
    { "name": "Project Experience Depth", "score": number, "comment": string },
    { "name": "Seniority & Experience Match", "score": number, "comment": string }
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
  ],
  "roadmap": {
    "suitability": string,
    "dsaTarget": {
      "recommendedCount": string,
      "focusTopics": string[],
      "advice": string
    },
    "projectsTarget": {
      "additionalNeeded": string,
      "recommendedProjects": [
        {
          "title": string,
          "difficulty": "Beginner" | "Intermediate" | "Advanced",
          "technologies": string[],
          "description": string,
          "whyItMatters": string
        }
      ]
    },
    "toolsMastery": [
      {
        "tool": string,
        "status": "Mastered" | "Needs Practice" | "Must Learn",
        "explanation": string
      }
    ]
  }
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
      // General Software Developer Readiness Evaluation
      systemPrompt = `You are MatchScope, a friendly, encouraging, and deeply experienced senior software engineer and mentor.
Your job is to inspect the candidate's resume, check out their projects, skills, and tools, and give them honest, crystal-clear guidance in SIMPLE, EVERYDAY ENGLISH.
Do NOT use confusing ATS recruitment jargon, complex corporate terminology, or robotic phrasing. Speak directly to the developer like a helpful mentor.

CRITICAL STEP 1 - RESUME VALIDITY GATE (MANDATORY BEFORE ANY EVALUATION):
Before performing any evaluation, determine whether the provided CANDIDATE RESUME is genuinely an individual person's resume or CV.
A genuine resume details an individual candidate's qualifications: their contact details, education, work experience, technical/professional skills, or personal projects.

NON-RESUMES INCLUDE (YOU MUST STRICTLY REJECT THESE):
- Academic or scientific research papers, preprints, journal articles (e.g. papers on machine learning, algorithms, physics, biology, etc.)
- Course lecture slides, textbooks, homework assignments, problem sets, syllabi
- Invoices, receipts, financial records, bank statements
- Legal agreements, contracts, licenses, terms of service, privacy policies
- Technical documentation, software manuals, README files, API specifications, architectural whitepapers
- Random notes, essays, blog posts, fiction, news articles, blank or garbled documents

IF THE DOCUMENT IS NOT A PROPER RESUME:
You MUST immediately reject it and return ONLY valid JSON matching this schema:
{
  "isValidResume": false,
  "rejectionReason": "This document is not a proper resume. [Brief 1-sentence friendly explanation of what this document appears to be, and a clear request to upload their personal resume or CV with education, skills, projects, and work history to get evaluated.]"
}
CRITICAL: If isValidResume is false, do NOT invent scores, do NOT invent categories, do NOT create a roadmap, and do NOT claim suitability or unsuitability for any role (e.g. do NOT evaluate for AI Engineer or Software Engineer or any role).

IF AND ONLY IF THE DOCUMENT IS A VALID RESUME:
Set "isValidResume": true, identify the candidate's primary technical domain/role in "detectedCandidateRole" (e.g. "Full Stack Developer", "Frontend Developer", "Backend Developer", "AI/ML Engineer", "Data Engineer", "DevOps Engineer", "Mobile Developer", etc.), and evaluate:
1. Projects Quality & Real-World Proof:
   - Check out their projects. Are they real, useful applications with databases and user authentication, or just simple tutorial copies?
   - Do their projects show they can actually build software from scratch?
2. Tools & Skills Mastery:
   - Go through their tools (like React, Node.js, Python, PostgreSQL, Docker, etc.).
   - Mark which tools are truly "Mastered" (proven in real projects), which "Needs Practice" (only mentioned briefly or in a skills list), and which are "Must Learn" (essential tools for their career path that they haven't touched yet).
3. Role Suitability Verdict:
   - Plainly state: Are they ready for junior, mid-level, or internship developer jobs in their domain right now? What is the main thing they need to do to start getting interview calls?
4. LeetCode & DSA Preparation Target:
   - Recommend a realistic number of LeetCode / DSA problems they should solve based on current industry hiring bars (e.g. "60 to 80 LeetCode problems, focusing on Medium level").
   - List the 4 to 6 top DSA topics they must practice (e.g. Arrays & Hashing, Two Pointers, Trees, Graphs, Dynamic Programming).
   - Give practical advice on how to practice without burning out.
5. Projects Needed & Focus Projects:
   - Tell them how many more projects they need to build (e.g. "1 High-Impact Capstone Project").
   - Give 2 specific, impressive project ideas tailored to their background with suggested tech stack, explaining why each project will impress hiring teams.
6. Honest Scoring (0-100):
   - Categories:
     * "Real Projects Quality" (0-100)
     * "Tool & Tech Mastery" (0-100)
     * "Coding & Problem Solving" (0-100)
     * "Resume Clarity & Impact" (0-100)
   - Overall score MUST equal the rounded average of the 4 category scores.
   - Label: 90-100: "Excellent Fit", 75-89: "Strong Fit", 60-74: "Good Fit", 45-59: "Moderate Fit", 0-44: "Poor Fit".
7. Keywords (12 to 16 key skills/concepts):
   - "match": Proven in projects or work experience.
   - "partial": Only listed in skills list without depth or proof.
   - "miss": Key industry tool missing that would significantly boost their profile.
8. Suggestions (4 to 5 bullet upgrades):
   - Quote the candidate's exact weak/vague line in "context".
   - In "title", give a clear, simple tip.
   - In "description", write a rewritten, impressive bullet point showing real action, tools used, and estimated results/numbers.

OUTPUT FORMAT: Return ONLY valid JSON matching this schema:
{
  "isValidResume": true,
  "detectedCandidateRole": string,
  "score": number,
  "label": "Poor Fit" | "Moderate Fit" | "Good Fit" | "Strong Fit" | "Excellent Fit",
  "summary": string,
  "categories": [
    { "name": "Real Projects Quality", "score": number, "comment": string },
    { "name": "Tool & Tech Mastery", "score": number, "comment": string },
    { "name": "Coding & Problem Solving", "score": number, "comment": string },
    { "name": "Resume Clarity & Impact", "score": number, "comment": string }
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
  ],
  "roadmap": {
    "suitability": string,
    "dsaTarget": {
      "recommendedCount": string,
      "focusTopics": string[],
      "advice": string
    },
    "projectsTarget": {
      "additionalNeeded": string,
      "recommendedProjects": [
        {
          "title": string,
          "difficulty": "Beginner" | "Intermediate" | "Advanced",
          "technologies": string[],
          "description": string,
          "whyItMatters": string
        }
      ]
    },
    "toolsMastery": [
      {
        "tool": string,
        "status": "Mastered" | "Needs Practice" | "Must Learn",
        "explanation": string
      }
    ]
  }
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
        temperature: 0.12,
        max_tokens: 3800,
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
            temperature: 0.12,
            max_tokens: 3800,
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

    // Clean JSON response
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

    // CRITICAL CHECK: Did the AI identify that this document is not a proper resume?
    if (parsed.isValidResume === false) {
      const rejectionReason =
        typeof parsed.rejectionReason === "string" && parsed.rejectionReason.trim().length > 0
          ? parsed.rejectionReason.trim()
          : "This document is not a proper resume. Please upload a valid candidate resume or CV containing your education, skills, projects, and work experience.";
      return NextResponse.json(
        {
          success: false,
          isValidResume: false,
          error: rejectionReason,
        },
        { status: 400 }
      );
    }

    // Safety fallback: if rejectionReason was populated without a score
    if (typeof parsed.rejectionReason === "string" && parsed.rejectionReason.trim().length > 0 && !parsed.score) {
      return NextResponse.json(
        {
          success: false,
          isValidResume: false,
          error: parsed.rejectionReason.trim(),
        },
        { status: 400 }
      );
    }

    const detectedCandidateRole =
      typeof parsed.detectedCandidateRole === "string" && parsed.detectedCandidateRole.trim().length > 0
        ? parsed.detectedCandidateRole.trim()
        : isTargetedMatch
        ? "Target Role"
        : "Software Engineer";

    // Process categories
    const fallbackCategories = isTargetedMatch
      ? ["Job Requirements Match", "Required Tech Stack", "Project Experience Depth", "Seniority & Experience Match"]
      : ["Real Projects Quality", "Tool & Tech Mastery", "Coding & Problem Solving", "Resume Clarity & Impact"];

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
        comment: "Evaluation based on overall profile and skills review.",
      }));
    }

    // Mathematical calibration
    const categorySum = categories.reduce((sum, cat) => sum + cat.score, 0);
    const categoryAverage = Math.round(categorySum / categories.length);

    let score = Math.max(0, Math.min(100, Math.round(Number(parsed.score) || categoryAverage)));
    if (Math.abs(score - categoryAverage) > 3) {
      score = categoryAverage;
    }

    let label: MatchScopeResponse["label"];
    if (score >= 90) label = "Excellent Fit";
    else if (score >= 75) label = "Strong Fit";
    else if (score >= 60) label = "Good Fit";
    else if (score >= 45) label = "Moderate Fit";
    else label = "Poor Fit";

    const summary = typeof parsed.summary === "string" && parsed.summary.trim().length > 0
      ? parsed.summary.trim()
      : `You have a solid foundation with good potential. By refining your project depth and practicing core problem-solving, you can significantly increase your interview conversion.`;

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
          title: typeof s.title === "string" && s.title.trim().length > 0 ? s.title.trim() : "Improve Bullet Impact",
          description: typeof s.description === "string" ? s.description.trim() : "",
          context: typeof s.context === "string" ? s.context.trim() : "",
        };
      }).filter((s) => s.description.length > 0 || s.context.length > 0);
    }

    // Process career roadmap (DSA targets, focus projects, tool mastery)
    const rawRoadmap = (parsed.roadmap || {}) as Record<string, unknown>;
    const rawDsa = (rawRoadmap.dsaTarget || {}) as Record<string, unknown>;
    const rawProjects = (rawRoadmap.projectsTarget || {}) as Record<string, unknown>;

    const roadmap: CareerRoadmap = {
      suitability: typeof rawRoadmap.suitability === "string" && rawRoadmap.suitability.trim().length > 0
        ? rawRoadmap.suitability.trim()
        : `Suitable for junior to early mid-level ${detectedCandidateRole} roles. Building 1-2 production-ready capstone projects will make you competitive for top-tier companies.`,
      dsaTarget: {
        recommendedCount: typeof rawDsa.recommendedCount === "string" && rawDsa.recommendedCount.trim().length > 0
          ? rawDsa.recommendedCount.trim()
          : "60 to 80 LeetCode Problems (focus on Mediums)",
        focusTopics: Array.isArray(rawDsa.focusTopics) && rawDsa.focusTopics.length > 0
          ? (rawDsa.focusTopics as string[]).map((t) => String(t).trim()).filter(Boolean)
          : ["Arrays & Hashing", "Two Pointers", "Trees & Binary Search", "Graphs & BFS/DFS", "Dynamic Programming"],
        advice: typeof rawDsa.advice === "string" && rawDsa.advice.trim().length > 0
          ? rawDsa.advice.trim()
          : "Focus on understanding patterns (like Sliding Window, DFS/BFS, and Two Pointers) rather than memorizing solutions.",
      },
      projectsTarget: {
        additionalNeeded: typeof rawProjects.additionalNeeded === "string" && rawProjects.additionalNeeded.trim().length > 0
          ? rawProjects.additionalNeeded.trim()
          : "1 Major Capstone Project",
        recommendedProjects: Array.isArray(rawProjects.recommendedProjects) && rawProjects.recommendedProjects.length > 0
          ? (rawProjects.recommendedProjects as Array<Record<string, unknown>>).map((p) => {
              const diffRaw = String(p.difficulty || "").toLowerCase();
              const difficulty: RoadmapProject["difficulty"] =
                diffRaw === "beginner" ? "Beginner" : diffRaw === "advanced" ? "Advanced" : "Intermediate";
              return {
                title: typeof p.title === "string" ? p.title.trim() : "Full-Stack Distributed System",
                difficulty,
                technologies: Array.isArray(p.technologies) ? (p.technologies as string[]).map(String) : ["TypeScript", "Next.js", "PostgreSQL", "Redis"],
                description: typeof p.description === "string" ? p.description.trim() : "Build an end-to-end web app with caching, authentication, and live data synchronization.",
                whyItMatters: typeof p.whyItMatters === "string" ? p.whyItMatters.trim() : "Demonstrates hands-on mastery of system design and real-world backend scalability.",
              };
            })
          : [
              {
                title: "Real-Time Collaborative Developer Workspace",
                difficulty: "Intermediate",
                technologies: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Redis", "Docker"],
                description: "Build an interactive platform with live document/code editing, role-based authentication, and Redis pub/sub messaging.",
                whyItMatters: "Proves you know how to build low-latency systems and manage state beyond simple CRUD apps.",
              },
            ],
      },
      toolsMastery: Array.isArray(rawRoadmap.toolsMastery) && rawRoadmap.toolsMastery.length > 0
        ? (rawRoadmap.toolsMastery as Array<Record<string, unknown>>).map((t) => {
            const rawStatus = String(t.status || "").toLowerCase();
            const status: RoadmapTool["status"] =
              rawStatus.includes("master") ? "Mastered" : rawStatus.includes("learn") ? "Must Learn" : "Needs Practice";
            return {
              tool: typeof t.tool === "string" ? t.tool.trim() : "Core Tool",
              status,
              explanation: typeof t.explanation === "string" ? t.explanation.trim() : "Demonstrated in projects.",
            };
          })
        : [
            { tool: "React / Frontend", status: "Mastered", explanation: "Clear component structure and UI implementations in projects." },
            { tool: "Databases & SQL", status: "Needs Practice", explanation: "Mentioned, but should showcase complex joins, indexing, or migration scripts." },
            { tool: "Docker & CI/CD", status: "Must Learn", explanation: "Adding Docker containers and GitHub Actions will elevate your resume to industry standard." },
          ],
    };

    const result: MatchScopeResponse = {
      score,
      label,
      summary,
      categories,
      keywords,
      suggestions,
      roadmap,
      detectedCandidateRole,
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
