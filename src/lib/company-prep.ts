// General, publicly-known interview focus areas for common recruiters —
// sourced from widely-shared community prep knowledge (Glassdoor, LeetCode
// discuss, GfG interview experiences), NOT scraped or official data from
// these companies. Treat as a starting point for prep, not a guarantee of
// what will actually be asked.

export interface CompanyPrepProfile {
  name: string;
  aliases: string[];
  focusAreas: string[];
  note: string;
}

export const COMPANY_PREP: CompanyPrepProfile[] = [
  {
    name: "Amazon",
    aliases: ["amazon"],
    focusAreas: ["Trees & Graphs", "OOP Design", "Leadership Principles (behavioral)"],
    note: "Heavy emphasis on behavioral answers tied to their Leadership Principles alongside DSA — prep STAR-format stories, not just code.",
  },
  {
    name: "Google",
    aliases: ["google"],
    focusAreas: ["Graphs", "Dynamic Programming", "System Design (senior roles)"],
    note: "Fewer but harder problems, strong focus on clean code and edge-case handling over speed.",
  },
  {
    name: "Microsoft",
    aliases: ["microsoft", "msft"],
    focusAreas: ["Arrays & Strings", "Trees", "Object-Oriented Design"],
    note: "Broad DSA coverage; on-campus rounds often include a design/OOP round.",
  },
  {
    name: "Meta",
    aliases: ["meta", "facebook"],
    focusAreas: ["Arrays & Hashing", "Graphs", "Product-sense (for PM-adjacent roles)"],
    note: "Fast-paced rounds — practice solving under strict time pressure.",
  },
  {
    name: "Flipkart",
    aliases: ["flipkart"],
    focusAreas: ["Dynamic Programming", "Trees", "Low-Level Design"],
    note: "Known for an LLD (low-level design) round in addition to standard DSA.",
  },
  {
    name: "Adobe",
    aliases: ["adobe"],
    focusAreas: ["Arrays & Strings", "Recursion & Backtracking", "OOP Design"],
    note: "Generally considered approachable DSA difficulty with a strong CS-fundamentals round.",
  },
  {
    name: "Goldman Sachs",
    aliases: ["goldman sachs", "goldman"],
    focusAreas: ["Arrays & Strings", "SQL", "OOP Design"],
    note: "Expect a strong emphasis on SQL and CS fundamentals alongside DSA for tech roles.",
  },
  {
    name: "Morgan Stanley",
    aliases: ["morgan stanley"],
    focusAreas: ["Arrays", "Linked Lists", "OOP Design"],
    note: "Fundamentals-heavy — solid CS basics matter as much as DSA speed.",
  },
  {
    name: "Uber",
    aliases: ["uber"],
    focusAreas: ["Graphs", "Dynamic Programming", "System Design"],
    note: "System design shows up earlier in the process than at many companies.",
  },
  {
    name: "Walmart",
    aliases: ["walmart", "walmart global tech", "walmart labs"],
    focusAreas: ["Arrays & Strings", "Trees", "Dynamic Programming"],
    note: "Broad, standard DSA coverage across rounds.",
  },
  {
    name: "Atlassian",
    aliases: ["atlassian"],
    focusAreas: ["Graphs", "Dynamic Programming", "Values-based behavioral round"],
    note: "A values-fit behavioral round is a real filter here, not a formality.",
  },
  {
    name: "Salesforce",
    aliases: ["salesforce"],
    focusAreas: ["Arrays & Strings", "Trees", "OOP Design"],
    note: "Standard DSA loop with a strong OOP/design component.",
  },
  {
    name: "Oracle",
    aliases: ["oracle"],
    focusAreas: ["Arrays", "Linked Lists", "DBMS fundamentals"],
    note: "CS fundamentals (DBMS, OS) come up alongside DSA more than at product-only companies.",
  },
  {
    name: "Zomato",
    aliases: ["zomato", "eternal"],
    focusAreas: ["Arrays & Strings", "System Design", "Product thinking"],
    note: "Startups like this often weight practical problem-solving and product sense alongside DSA.",
  },
  {
    name: "Swiggy",
    aliases: ["swiggy"],
    focusAreas: ["Graphs", "Dynamic Programming", "System Design"],
    note: "Expect a system design round even for relatively junior roles.",
  },
  {
    name: "Razorpay",
    aliases: ["razorpay"],
    focusAreas: ["Arrays & Strings", "Low-Level Design", "API Design"],
    note: "Fintech context — correctness and edge cases matter more than raw speed.",
  },
  {
    name: "Rubrik",
    aliases: ["rubrik"],
    focusAreas: ["Trees & Graphs", "Dynamic Programming", "Systems fundamentals"],
    note: "Known for a rigorous, systems-heavy interview loop.",
  },
  {
    name: "Sprinklr",
    aliases: ["sprinklr"],
    focusAreas: ["Dynamic Programming", "Trees", "Low-Level Design"],
    note: "DSA-heavy loop, commonly recruits on campus with multiple coding rounds.",
  },
  {
    name: "Qualcomm",
    aliases: ["qualcomm"],
    focusAreas: ["C/C++ fundamentals", "Operating Systems", "Arrays"],
    note: "Core/hardware-adjacent roles lean more on OS and C fundamentals than pure DSA speed.",
  },
  {
    name: "Samsung",
    aliases: ["samsung", "samsung r&d"],
    focusAreas: ["Arrays & Strings", "OOP Design", "CS fundamentals"],
    note: "Broad fundamentals coverage across DSA, OS, and OOP.",
  },
];

export function matchCompanyPrep(targetCompanies: string | null): CompanyPrepProfile[] {
  if (!targetCompanies) return [];
  const names = targetCompanies
    .split(/[,/]/)
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  const matches: CompanyPrepProfile[] = [];
  for (const name of names) {
    const profile = COMPANY_PREP.find((c) => c.aliases.some((a) => name.includes(a)));
    if (profile && !matches.includes(profile)) matches.push(profile);
  }
  return matches;
}
