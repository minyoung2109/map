"use client";

import { useState } from "react";
import Link from "next/link";
import TopNav from "./components/TopNav";
import Chip from "./components/Chip";
import { CATEGORIES, type CategoryId } from "./lib/categories";

type Participant = {
  id: string;
  name: string;
  station: string;
  time: string;
};

// Sample data so the flow is walkable before the routing APIs are wired up.
// The names match the participants shown on /results and /places.
const initialParticipants: Participant[] = [
  { id: "1", name: "지민", station: "신도림역", time: "18:30" },
  { id: "2", name: "서연", station: "삼성역", time: "18:40" },
  { id: "3", name: "준호", station: "교대역", time: "18:35" },
];

const MAX_RECOMMENDED = 4;

export default function Home() {
  const [participants, setParticipants] = useState(initialParticipants);
  const [categories, setCategories] = useState<CategoryId[]>([
    "food",
    "exhibit",
  ]);
  const [draft, setDraft] = useState<{
    name: string;
    station: string;
    time: string;
  } | null>(null);

  function toggleCategory(id: CategoryId) {
    setCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  function removeParticipant(id: string) {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
  }

  function confirmDraft() {
    if (!draft || !draft.name.trim() || !draft.station.trim()) return;
    setParticipants((prev) => [
      ...prev,
      { id: crypto.randomUUID(), ...draft },
    ]);
    setDraft(null);
  }

  const canSearch = participants.length >= 2 && categories.length >= 1;

  return (
    <div className="lds-screen">
      <TopNav title="약속 정보 입력" />

      <div className="lds-scroll">
        <div className="lds-list-header">
          <span className="lds-list-header__title">
            참가자 ({participants.length})
          </span>
          <span className="lds-list-header__aux">최소 2명</span>
        </div>

        {participants.map((p) => (
          <div className="lds-row" key={p.id}>
            <span className="lds-avatar lds-avatar--brand">
              {p.name.slice(0, 1)}
            </span>
            <span className="lds-row__text">
              <span className="lds-row__title">{p.name}</span>
              <span className="lds-row__desc">
                {p.station} · {p.time} 출발
              </span>
            </span>
            <button
              type="button"
              className="lds-row__right"
              style={{
                border: 0,
                background: "transparent",
                cursor: "pointer",
              }}
              onClick={() => removeParticipant(p.id)}
              aria-label={`${p.name} 삭제`}
            >
              삭제
            </button>
          </div>
        ))}

        {draft ? (
          <div
            className="lds-margin"
            style={{
              marginTop: "10px",
              padding: "12px",
              border: "1px solid var(--color-brand)",
              borderRadius: "12px",
              background: "var(--color-brand-subtle)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <span
              style={{
                font: "var(--type-body-4)",
                fontWeight: 600,
                color: "var(--color-brand)",
              }}
            >
              새 참가자
            </span>
            <div className="lds-input">
              <span className="lds-input__label">
                이름<span className="lds-input__required">*</span>
              </span>
              <div className="lds-input__control">
                <input
                  className="lds-input__field"
                  style={{ border: 0, background: "transparent", outline: "none", width: "100%" }}
                  placeholder="이름을 입력하세요"
                  value={draft.name}
                  onChange={(e) =>
                    setDraft({ ...draft, name: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="lds-input">
              <span className="lds-input__label">
                출발역<span className="lds-input__required">*</span>
              </span>
              <div className="lds-input__control">
                <input
                  className="lds-input__field"
                  style={{ border: 0, background: "transparent", outline: "none", width: "100%" }}
                  placeholder="역 이름을 입력하세요"
                  value={draft.station}
                  onChange={(e) =>
                    setDraft({ ...draft, station: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="lds-input">
              <span className="lds-input__label">출발 시간</span>
              <div className="lds-input__control">
                <input
                  type="time"
                  className="lds-input__field"
                  style={{ border: 0, background: "transparent", outline: "none", width: "100%" }}
                  value={draft.time}
                  onChange={(e) =>
                    setDraft({ ...draft, time: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="lds-button-group">
              <button
                type="button"
                className="lds-box-button lds-box-button--outline lds-box-button--sm"
                onClick={() => setDraft(null)}
              >
                취소
              </button>
              <button
                type="button"
                className="lds-box-button lds-box-button--sm"
                onClick={confirmDraft}
              >
                추가
              </button>
            </div>
          </div>
        ) : (
          <div className="lds-margin" style={{ marginTop: "6px" }}>
            <button
              type="button"
              className="lds-capsule lds-capsule--mono"
              onClick={() =>
                setDraft({ name: "", station: "", time: "18:30" })
              }
            >
              + 참가자 추가
            </button>
          </div>
        )}

        {participants.length >= MAX_RECOMMENDED + 1 ? (
          <p
            className="lds-margin"
            style={{
              marginTop: "10px",
              font: "var(--type-body-4)",
              color: "var(--color-text-tertiary)",
            }}
          >
            5명 이상이면 비슷한 지역끼리 묶어 대표 출발지 하나로 입력해보세요.
          </p>
        ) : null}

        <hr className="lds-divider" style={{ marginTop: "18px" }} />

        <div className="lds-list-header">
          <span className="lds-list-header__title">무엇을 하고 싶나요?</span>
          <span className="lds-list-header__aux">복수 선택</span>
        </div>
        <div className="lds-margin lds-chip-row">
          {CATEGORIES.map((c) => (
            <Chip
              key={c.id}
              selected={categories.includes(c.id)}
              onClick={() => toggleCategory(c.id)}
            >
              {c.label}
            </Chip>
          ))}
        </div>
      </div>

      <div className="lds-sticky-button">
        {canSearch ? (
          <Link href="/calculating" className="lds-box-button lds-box-button--full">
            중간 지점 찾기 · {categories.length}개 선택됨
          </Link>
        ) : (
          <button
            type="button"
            className="lds-box-button lds-box-button--full lds-box-button--inactive"
            disabled
          >
            참가자 2명, 목적 1개 이상 선택해주세요
          </button>
        )}
      </div>
    </div>
  );
}
