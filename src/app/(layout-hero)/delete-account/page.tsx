"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { customerApi, storage } from "@/lib/api";

export default function DeleteAccountPage() {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your account? This action cannot be undone."
    );
    if (!confirmed) return;

    setErrorMessage(null);
    setSuccessMessage(null);
    setIsDeleting(true);

    const response = await customerApi.deleteProfile();

    if (response.success) {
      storage.clearAll();
      setSuccessMessage("Your account has been deleted. Redirecting to home...");
      setTimeout(() => {
        router.push("/");
      }, 800);
    } else {
      setErrorMessage(response.error || "Unable to delete your account. Please try again later.");
    }

    setIsDeleting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-600 mb-4">Delete Page</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">Account Deletion</h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-600 sm:text-base">
            You can permanently delete your account and associated data directly from the app.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6 text-sm font-medium text-slate-600">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">Google Play Policy Compliant</span>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Delete Your Account</h2>
                  <p className="mt-3 text-slate-600">
                    You can permanently delete your account and associated data directly from the app.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    "Open the app",
                    "Go to Settings",
                    "Tap Delete Account",
                    "Review the information and confirm the deletion",
                  ].map((step, index) => (
                    <div key={step} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0C4A8C] text-white font-semibold">{index + 1}</span>
                        <p className="text-sm text-slate-700">{step}</p>
                      </div>
                      <span className="text-slate-400 text-xs">›</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
                  <h3 className="text-base font-semibold text-amber-950">Important Notice</h3>
                  <p className="mt-2 text-sm text-amber-900">
                    Deleting your account is permanent and cannot be undone. All your data will be removed and you will lose access to all features and content associated with this account.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Ready to delete your account?</h3>
                <p className="mt-2 text-sm text-slate-600">This will permanently remove your profile and all associated data.</p>
              </div>
              {errorMessage ? (
                <p className="text-sm text-red-600">{errorMessage}</p>
              ) : successMessage ? (
                <p className="text-sm text-green-600">{successMessage}</p>
              ) : null}
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-200 transition duration-200 ease-in-out hover:bg-red-700 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeleting ? "Deleting account..." : "Delete Account"}
              </button>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Data Deleted</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#0C4A8C]" />User account</p>
                <p className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#0C4A8C]" />Personal profile information</p>
                <p className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#0C4A8C]" />App data associated with your account</p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Data Retention</h3>
              <p className="mt-4 text-sm text-slate-600">
                Some information may be retained only if required by applicable laws or for fraud prevention purposes. This data is stored securely and never used for marketing.
              </p>
              <p className="mt-4 text-xs text-slate-400">Protected under applicable data law</p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
                  <span className="text-xl">✉</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Need Help?</h3>
                  <p className="mt-2 text-sm text-slate-600">If you’re unable to access your account or need assistance, contact our support team — we typically respond within 24 hours.</p>
                  <a href="mailto:support@daffa.pro" className="mt-3 inline-flex items-center rounded-full bg-[#0C4A8C] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0a3d7a]">
                    support@daffa.pro
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
