"use client";

import { useRef, useState } from "react";
import TopNav from "../components/TopNav";

type Slot = {
  id: string;
  time: string;
  title: string;
  meta: string;
  metaTone?: "caution";
  locked?: boolean;
};

const initialSlots: Slot[] = [
  { id: "arrive", time: "19:20", title: "도착 · 강남역", meta: "평균 이동 25분", locked: true },
  { id: "dinner", time: "19:30", title: "저녁 식사 · 이탈리안 레스토랑", meta: "2시간 · 21:30 마감" },
  { id: "exhibit", time: "21:30", title: "전시 · OO미술관", meta: "1시간 · 마감 임박", metaTone: "caution" },
];

export default function Schedule() {
  const [slots, setSlots] = useState(initialSlots);
  const [toast, setToast] = useState<string | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showToast(message: string) {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }

  function handleDragStart(index: number) {
    if (slots[index].locked) return;
    setDragIndex(index);
  }

  function handleDrop(index: number) {
    const from = dragIndex;
    setDragIndex(null);
    if (from === null || slots[index].locked || from === index) return;

    setSlots((prev) => {
      const times = prev.map((s) => s.time);
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(index, 0, moved);
      return next.map((s, i) => ({ ...s, time: times[i] }));
    });
    showToast("일정 순서가 바뀌었어요");
  }

  async function handleShare() {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: "코스 일정", url: window.location.href });
        return;
      } catch {
        // user cancelled — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("링크가 복사되었어요");
    } catch {
      showToast("공유 링크를 복사하지 못했어요");
    }
  }

  return (
    <div className="lds-screen" style={{ position: "relative" }}>
      <TopNav
        title="코스 일정"
        backHref="/places"
        right={
          <button
            type="button"
            className="lds-topnav__action"
            style={{ border: 0, background: "transparent", cursor: "pointer" }}
            onClick={handleShare}
          >
            공유
          </button>
        }
      />

      <div className="lds-scroll">
        <p
          className="lds-margin"
          style={{ margin: "10px var(--screen-margin) 0", font: "var(--type-body-4)", color: "var(--color-text-tertiary)" }}
        >
          ✋ 드래그하여 순서를 바꿀 수 있어요
        </p>

        <div className="app-timeline" style={{ marginTop: "6px" }}>
          {slots.map((slot, index) => (
            <div
              className="app-timeline__item"
              key={slot.id}
              draggable={!slot.locked}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(index)}
              onDragEnd={() => setDragIndex(null)}
              style={{ opacity: dragIndex === index ? 0.5 : 1 }}
            >
              <span
                className="app-timeline__time"
                style={{ color: slot.locked ? "var(--color-text-tertiary)" : undefined }}
              >
                {slot.time}
              </span>
              <div className="app-timeline__body">
                <span className="app-timeline__title">{slot.title}</span>
                <span className="app-timeline__meta">
                  {slot.metaTone === "caution" ? (
                    <>
                      {slot.meta.split("·")[0]}·{" "}
                      <span style={{ color: "var(--color-caution)" }}>
                        {slot.meta.split("·")[1]}
                      </span>
                    </>
                  ) : (
                    slot.meta
                  )}
                </span>
              </div>
              <span className="app-timeline__grip">{slot.locked ? "" : "⠿"}</span>
            </div>
          ))}
        </div>
      </div>

      {toast ? (
        <div className="lds-snackbar">{toast}</div>
      ) : null}

      <div className="lds-sticky-button">
        <button
          type="button"
          className="lds-box-button lds-box-button--full"
          onClick={handleShare}
        >
          일정 공유하기
        </button>
      </div>
    </div>
  );
}
