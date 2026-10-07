"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Briefcase,
  Building2,
  BarChart2,
  Calendar,
  Save,
  Check,
  Loader2,
  ChevronRight,
  ChevronDown,
  Sparkles,
} from "lucide-react";

interface ProfileDetailsFormProps {
  initialData: {
    leetcodeUsername: string | null;
    targetRole: string | null;
    targetCompanies: string | null;
    jobSearchStatus: string | null;
    placementDate: string | null;
    digestEnabled: boolean;
  };
  standardRoles: string[];
  action: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
}

export function ProfileDetailsForm({
  initialData,
  standardRoles,
  action,
}: ProfileDetailsFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setSaveStatus("saving");
    setErrorMessage(null);

    startTransition(async () => {
      try {
        const result = await action(formData);
        if (result?.success) {
          setSaveStatus("saved");
          setShowToast(true);
          router.refresh();

          // Auto-hide toast after 3.5 seconds
          setTimeout(() => {
            setShowToast(false);
          }, 3500);

          // Reset button state after 3 seconds
          setTimeout(() => {
            setSaveStatus("idle");
          }, 3000);
        } else {
          setSaveStatus("error");
          setErrorMessage(result?.error || "Failed to save changes. Please try again.");
          setTimeout(() => setSaveStatus("idle"), 4000);
        }
      } catch (err: any) {
        setSaveStatus("error");
        setErrorMessage(err?.message || "An unexpected error occurred.");
        setTimeout(() => setSaveStatus("idle"), 4000);
      }
    });
  };

  return (
    <>
      {/* Floating Animated Toast Banner */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-[90%] pointer-events-none transition-all duration-300">
          <div className="flex items-center gap-3.5 rounded-2xl border border-emerald-500/40 bg-[#090d1f]/95 px-5 py-3.5 shadow-[0_0_35px_rgba(16,185,129,0.35),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-2xl animate-fade-in">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]">
              <Check size={16} className="stroke-[3]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                <span>Changes saved successfully</span>
                <Sparkles size={13} className="text-emerald-400" />
              </p>
              <p className="text-xs text-slate-300 truncate">
                Your profile details and goal pacing are up to date.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Form Error Banner */}
      {errorMessage && (
        <div className="mb-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs text-rose-300 shadow-sm animate-fade-in">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-5 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Field 1: LeetCode username */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1.5">
              <User size={13} className="text-slate-400" />
              <span>LeetCode username</span>
            </label>
            <div className="relative flex items-center">
              <User size={14} className="absolute left-3.5 text-slate-500 pointer-events-none" />
              <input
                name="leetcodeUsername"
                defaultValue={initialData.leetcodeUsername ?? ""}
                placeholder="LeetCode username"
                className="h-11 w-full rounded-xl border border-slate-700/70 bg-[#0b0e1e]/90 pl-10 pr-3.5 text-sm text-white placeholder:text-slate-600 transition-all focus:border-indigo-500/80 focus:bg-[#0e1226] focus:outline-none focus:ring-1 focus:ring-indigo-500/40 shadow-inner"
              />
            </div>
          </div>

          {/* Field 2: Target role */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1.5">
              <Briefcase size={13} className="text-slate-400" />
              <span>Target role</span>
            </label>
            <div className="relative flex items-center">
              <select
                name="targetRole"
                defaultValue={initialData.targetRole ?? "Generative AI Engineer"}
                className="h-11 w-full appearance-none rounded-xl border border-slate-700/70 bg-[#0b0e1e]/90 px-3.5 pr-10 text-sm text-white transition-all focus:border-indigo-500/80 focus:bg-[#0e1226] focus:outline-none focus:ring-1 focus:ring-indigo-500/40 shadow-inner cursor-pointer"
              >
                {initialData.targetRole && !standardRoles.includes(initialData.targetRole) && (
                  <option value={initialData.targetRole} className="bg-[#0b0e1e] text-white">
                    {initialData.targetRole}
                  </option>
                )}
                {standardRoles.map((role) => (
                  <option key={role} value={role} className="bg-[#0b0e1e] text-white">
                    {role}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Field 3: Target companies */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1.5">
              <Building2 size={13} className="text-slate-400" />
              <span>Target companies</span>
            </label>
            <div className="relative flex items-center">
              <input
                name="targetCompanies"
                defaultValue={initialData.targetCompanies ?? ""}
                placeholder="Google, Microsoft, Amazon"
                className="h-11 w-full rounded-xl border border-slate-700/70 bg-[#0b0e1e]/90 px-3.5 text-sm text-white placeholder:text-slate-600 transition-all focus:border-indigo-500/80 focus:bg-[#0e1226] focus:outline-none focus:ring-1 focus:ring-indigo-500/40 shadow-inner"
              />
            </div>
          </div>

          {/* Field 4: Job search status */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1.5">
              <BarChart2 size={13} className="text-slate-400" />
              <span>Job search status</span>
            </label>
            <div className="relative flex items-center">
              <select
                name="jobSearchStatus"
                defaultValue={initialData.jobSearchStatus ?? "passive"}
                className="h-11 w-full appearance-none rounded-xl border border-slate-700/70 bg-[#0b0e1e]/90 px-3.5 pr-10 text-sm text-white transition-all focus:border-indigo-500/80 focus:bg-[#0e1226] focus:outline-none focus:ring-1 focus:ring-indigo-500/40 shadow-inner cursor-pointer"
              >
                <option value="passive" className="bg-[#0b0e1e] text-white">
                  Open to opportunities
                </option>
                <option value="active" className="bg-[#0b0e1e] text-white">
                  Actively applying
                </option>
                <option value="not_looking" className="bg-[#0b0e1e] text-white">
                  Not looking
                </option>
              </select>
              <ChevronDown size={14} className="absolute right-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Field 5: Placement date (Full Width) */}
          <div className="sm:col-span-2">
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1.5">
              <Calendar size={13} className="text-slate-400" />
              <span>Placement date (used to pace your goals)</span>
            </label>
            <div className="relative flex items-center">
              <User size={14} className="absolute left-3.5 text-slate-500 pointer-events-none" />
              <input
                name="placementDate"
                type="date"
                defaultValue={initialData.placementDate ?? ""}
                className="h-11 w-full rounded-xl border border-slate-700/70 bg-[#0b0e1e]/90 pl-10 pr-10 text-sm text-white placeholder:text-slate-600 transition-all focus:border-indigo-500/80 focus:bg-[#0e1226] focus:outline-none focus:ring-1 focus:ring-indigo-500/40 shadow-inner cursor-pointer [color-scheme:dark]"
              />
              <Calendar size={15} className="absolute right-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Field 6: Weekly Email Digest Checkbox (Full Width) */}
          <div className="sm:col-span-2 pt-1">
            <label className="flex items-start gap-3 cursor-pointer select-none group">
              <div className="relative flex items-center pt-0.5">
                <input
                  type="checkbox"
                  name="digestEnabled"
                  defaultChecked={initialData.digestEnabled}
                  className="peer sr-only"
                />
                <div className="h-5 w-5 rounded-md border border-slate-600/80 bg-[#0b0e1e] transition-all peer-checked:border-indigo-400 peer-checked:bg-gradient-to-br peer-checked:from-indigo-600 peer-checked:to-purple-600 shadow-xs flex items-center justify-center">
                  <Check size={13} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity stroke-[2.5]" />
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                  Send me a weekly email digest of my readiness score and nudges
                </p>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                  Get personalized tips, progress updates and opportunities straight to your inbox.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Save Changes Button with Fluid Micro-Animations */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saveStatus === "saving" || isPending}
            className={`relative inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition-all duration-300 cursor-pointer overflow-hidden ${
              saveStatus === "saved"
                ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 shadow-[0_0_28px_rgba(16,185,129,0.55)] scale-105"
                : saveStatus === "saving" || isPending
                ? "bg-gradient-to-r from-indigo-600 via-purple-700 to-indigo-700 shadow-[0_0_25px_rgba(99,102,241,0.5)] opacity-90 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-500 hover:from-indigo-400 hover:to-blue-400 shadow-[0_0_22px_rgba(147,51,234,0.45)] hover:shadow-[0_0_30px_rgba(147,51,234,0.65)] hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {/* Animated shimmer light across button during saving */}
            {(saveStatus === "saving" || isPending) && (
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1.5s_infinite]" />
            )}

            {saveStatus === "saving" || isPending ? (
              <>
                <Loader2 size={15} className="animate-spin text-white" />
                <span>Saving changes...</span>
              </>
            ) : saveStatus === "saved" ? (
              <>
                <Check size={16} className="stroke-[3] text-white animate-bounce" />
                <span>Changes saved!</span>
                <Sparkles size={14} className="text-emerald-200" />
              </>
            ) : (
              <>
                <Save size={15} />
                <span>Save changes</span>
                <ChevronRight size={14} />
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
}
