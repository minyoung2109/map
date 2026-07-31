"use client";

import { useState } from "react";
import Link from "next/link";
import TopNav from "../components/TopNav";
import Chip from "../components/Chip";

type Place = {
  id: string;
  title: string;
  desc: string;
  badge?: { label: string; variant: "caution" | "brand" };
};

const FOOD_PLACES: Place[] = [
  {
    id: "italian",
    title: "이탈리안 레스토랑",
    desc: "도보 5분 · 파스타·피자",
    badge: { label: "21:30 마감 임박", variant: "caution" },
  },
  {
    id: "korean",
    title: "한식 다이닝",
    desc: "도보 3분 · 22:00 마감",
    badge: { label: "인기", variant: "brand" },
  },
];

const CAFE_PLACES: Place[] = [
  { id: "roastery", title: "로스터리 카페", desc: "도보 4분 · 22:00 마감" },
];

function kakaoMapUrl(query: string) {
  return `https://map.kakao.com/?q=${encodeURIComponent(query)}`;
}

export default function Places() {
  const [active, setActive] = useState<Record<string, boolean>>({
    food: true,
    exhibit: true,
    cafe: false,
  });
  const [selected, setSelected] = useState<Place | null>(null);

  function toggle(id: string) {
    setActive((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="lds-screen" style={{ position: "relative" }}>
      <TopNav title="강남역 근처" backHref="/results" />

      <div className="lds-scroll">
        <div className="lds-chip-row lds-chip-row--scroll" style={{ paddingTop: "8px" }}>
          <Chip selected={active.food} onClick={() => toggle("food")}>
            식사 · {FOOD_PLACES.length}곳
          </Chip>
          <Chip selected={active.exhibit} onClick={() => toggle("exhibit")}>
            전시 · 1곳
          </Chip>
          <Chip selected={active.cafe} onClick={() => toggle("cafe")}>
            카페 · {CAFE_PLACES.length}곳
          </Chip>
        </div>

        {active.food ? (
          <>
            <div className="lds-list-header">
              <span className="lds-list-header__title">식사</span>
              <span className="lds-list-header__aux">영업중 우선</span>
            </div>
            <div className="lds-card-collection lds-card-collection--horizontal">
              {FOOD_PLACES.map((place) => (
                <button
                  key={place.id}
                  type="button"
                  className="lds-card"
                  style={{ textAlign: "left", cursor: "pointer" }}
                  onClick={() => setSelected(place)}
                >
                  <div className="lds-card__media">사진</div>
                  {place.badge ? (
                    <span
                      className={`lds-badge lds-badge--${place.badge.variant} lds-card__indicator`}
                    >
                      {place.badge.label}
                    </span>
                  ) : null}
                  <div className="lds-card__body">
                    <span className="lds-card__title">{place.title}</span>
                    <span className="lds-card__desc">{place.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : null}

        {active.cafe ? (
          <>
            <div className="lds-list-header">
              <span className="lds-list-header__title">카페</span>
            </div>
            <div className="lds-card-collection lds-card-collection--horizontal">
              {CAFE_PLACES.map((place) => (
                <button
                  key={place.id}
                  type="button"
                  className="lds-card"
                  style={{ textAlign: "left", cursor: "pointer" }}
                  onClick={() => setSelected(place)}
                >
                  <div className="lds-card__media">사진</div>
                  <div className="lds-card__body">
                    <span className="lds-card__title">{place.title}</span>
                    <span className="lds-card__desc">{place.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : null}

        {active.exhibit ? (
          <>
            <div className="lds-list-header">
              <span className="lds-list-header__title">전시</span>
              <span className="lds-list-header__aux">지민님과 더 가까운 곳</span>
            </div>
            <div className="lds-margin">
              <button
                type="button"
                className="lds-card"
                style={{
                  flexDirection: "row",
                  textAlign: "left",
                  cursor: "pointer",
                  width: "100%",
                }}
                onClick={() =>
                  setSelected({
                    id: "gallery",
                    title: "OO미술관",
                    desc: "강남역보다 지민님 쪽이 가까워요 · 20:00까지",
                  })
                }
              >
                <div
                  className="lds-card__media"
                  style={{ width: "96px", aspectRatio: "auto", flex: "none" }}
                >
                  사진
                </div>
                <div className="lds-card__body" style={{ justifyContent: "center" }}>
                  <span className="lds-card__title">OO미술관</span>
                  <span className="lds-card__desc">
                    강남역보다 지민님 쪽이 가까워요 · 20:00까지
                  </span>
                  <span
                    className="lds-badge lds-badge--info"
                    style={{ width: "fit-content", marginTop: "2px" }}
                  >
                    도보 12분 더
                  </span>
                </div>
              </button>
            </div>
          </>
        ) : null}
      </div>

      {selected ? (
        <>
          <div className="lds-scrim" onClick={() => setSelected(null)} />
          <div className="lds-sheet">
            <div className="lds-sheet__handlebar" />
            <div className="lds-sheet__header">
              <span className="lds-sheet__title">{selected.title}</span>
              <button
                type="button"
                className="lds-sheet__close"
                style={{ border: 0, background: "transparent", cursor: "pointer" }}
                onClick={() => setSelected(null)}
                aria-label="닫기"
              >
                ✕
              </button>
            </div>
            <div className="lds-scroll lds-margin" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div className="lds-card__media" style={{ borderRadius: "12px" }}>
                사진
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                <span className="lds-badge lds-badge--brand">영업중</span>
                {selected.badge ? (
                  <span className={`lds-badge lds-badge--${selected.badge.variant}`}>
                    {selected.badge.label}
                  </span>
                ) : null}
              </div>
              <p style={{ margin: 0, font: "var(--type-body-2)", color: "var(--color-text-secondary)" }}>
                {selected.desc}
              </p>
              <p style={{ margin: 0, font: "var(--type-body-4)", color: "var(--color-text-tertiary)" }}>
                영업시간은 표준 카테고리 기준 추정치예요. 정확한 정보는 카카오맵에서 확인하세요.
              </p>
            </div>
            <div className="lds-sheet__buttons lds-button-group lds-button-group--vertical">
              <Link href="/schedule" className="lds-box-button">
                이 장소로 정하기
              </Link>
              <a
                href={kakaoMapUrl(`강남역 ${selected.title}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="lds-box-button lds-box-button--outline"
                style={{ textAlign: "center" }}
              >
                카카오맵에서 보기
              </a>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
