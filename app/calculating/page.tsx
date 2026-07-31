"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const STEPS = [
  { at: 0, label: "역 후보 탐색" },
  { at: 35, label: "소요시간·환승 비교" },
  { at: 70, label: "카테고리별 장소 밀집도 확인" },
];

export default function Calculating() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 4, 100));
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress < 100) return;
    const timeout = setTimeout(() => router.push("/results"), 300);
    return () => clearTimeout(timeout);
  }, [progress, router]);

  return (
    <div
      className="lds-screen"
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        padding: "0 32px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "var(--color-brand-subtle)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <div
          style={{
            width: "28px",
            height: "28px",
            border: "3px solid var(--color-brand)",
            borderRightColor: "transparent",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
      </div>

      <div>
        <p style={{ font: "var(--type-title-3)", margin: "0 0 4px" }}>
          이동 시간을 비교하고 있어요
        </p>
        <p
          style={{
            font: "var(--type-body-3)",
            color: "var(--color-text-tertiary)",
            margin: 0,
          }}
        >
          대중교통 기준 · 환승 정보 포함
        </p>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "220px",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          font: "var(--type-body-4)",
          color: "var(--color-text-tertiary)",
        }}
      >
        {STEPS.map((step) => (
          <span
            key={step.label}
            style={{
              color:
                progress >= step.at
                  ? "var(--color-text-secondary)"
                  : "var(--color-text-quaternary)",
            }}
          >
            {progress >= step.at ? "✓" : "·"} {step.label}
          </span>
        ))}
      </div>

      <div className="lds-progress" style={{ width: "100%", maxWidth: "220px" }}>
        <div className="lds-progress__fill" style={{ width: `${progress}%` }} />
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
