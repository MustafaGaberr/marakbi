"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { IoArrowBack } from "react-icons/io5";

interface PaymentCheckoutModalProps {
  paymentUrl: string;
  expiresAt?: string | null;
  onClose: () => void;
}

export default function PaymentCheckoutModal({
  paymentUrl,
  expiresAt,
  onClose,
}: PaymentCheckoutModalProps) {
  const iframeInitialized = useRef(false);
  const hasFiredExpiredRef = useRef(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Lock background scroll when modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Expiration calculation & countdown timer
  useEffect(() => {
    let expireTimestamp: number;
    if (expiresAt) {
      expireTimestamp = new Date(expiresAt.endsWith('Z') ? expiresAt : expiresAt + 'Z').getTime();
    } else {
      expireTimestamp = Date.now() + 15 * 60 * 1000;
    }

    const updateTimer = () => {
      const remaining = Math.max(0, Math.floor((expireTimestamp - Date.now()) / 1000));
      setTimeLeft(remaining);

      if (remaining <= 0 && !hasFiredExpiredRef.current) {
        hasFiredExpiredRef.current = true;
        toast.error("Payment link has expired. Please try again.");
        handleClose();
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Load and initialize Fawaterak plugin
  const initializeFawaterakPlugin = useCallback((url: string) => {
    if (iframeInitialized.current) return;

    const existingScript = document.querySelector('script[src*="fawaterkPlugin"]');

    const initPlugin = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const win = window as any;
      if (typeof win.fawaterkCheckoutV2 === "function") {
        const container = document.getElementById("fawaterkDivId");
        if (container) container.innerHTML = "";

        win.fawaterkCheckoutV2({
          envType: url.includes("staging") ? "test" : "live",
          intentUrl: url,
        });
        iframeInitialized.current = true;
      }
    };

    if (existingScript) {
      initPlugin();
    } else {
      const script = document.createElement("script");
      script.src = "https://app.fawaterk.com/fawaterkPlugin/fawaterkPlugin.js";
      script.async = true;
      script.onload = initPlugin;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => initializeFawaterakPlugin(paymentUrl), 100);
    return () => clearTimeout(timer);
  }, [paymentUrl, initializeFawaterakPlugin]);

  const handleClose = () => {
    const container = document.getElementById("fawaterkDivId");
    if (container) container.innerHTML = "";
    iframeInitialized.current = false;
    onClose();
  };

  if (!mounted) return null;

  const modalJSX = (
    <div className="fixed inset-0 z-[99999] bg-white flex flex-col w-screen h-screen overflow-hidden">
      {/* Top Minimal Navigation Bar */}
      <div className="flex items-center justify-between px-6 h-[52px] border-b border-gray-200 bg-white flex-shrink-0">
        <button
          onClick={handleClose}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium text-sm cursor-pointer"
          aria-label="Cancel and return"
        >
          <IoArrowBack size={20} />
          <span>Cancel & Go Back</span>
        </button>

        {/* Expiration Countdown Badge */}
        {timeLeft !== null && (
          <div
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors ${
              timeLeft < 180
                ? "bg-red-100 text-red-700 border border-red-300 animate-pulse"
                : "bg-amber-50 text-amber-800 border border-amber-200"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>
              Link expires in <strong className="font-mono text-sm">{formatTime(timeLeft)}</strong>
            </span>
          </div>
        )}

        <span className="text-sm font-semibold text-gray-500">
          Secure Payment via Fawaterak
        </span>
      </div>

      {/* Full Screen Iframe Container */}
      <style>{`
        #fawaterkDivId {
          width: 100% !important;
          height: calc(100vh - 52px) !important;
          min-height: calc(100vh - 52px) !important;
          max-height: calc(100vh - 52px) !important;
          overflow: hidden !important;
        }
        #fawaterkContainer,
        #fawaterkIframe,
        #fawaterkDivId iframe {
          width: 100% !important;
          height: 100% !important;
          min-height: 100% !important;
          max-height: 100% !important;
          border: none !important;
          margin: 0 !important;
          padding: 0 !important;
          box-shadow: none !important;
          border-radius: 0 !important;
        }
      `}</style>
      <div
        id="fawaterkDivId"
        className="w-full bg-white overflow-hidden"
      />
    </div>
  );

  return createPortal(modalJSX, document.body);
}
