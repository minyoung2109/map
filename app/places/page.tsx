"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TopNav from "../components/TopNav";
import Chip from "../components/Chip";
import MapView from "../components/MapView";
import PlaceCard from "../components/PlaceCard";
import { PLACES, type Place } from "../lib/places";
import { CATEGORIES, type CategoryId } from "../lib/categories";
import { MEETING_POINT } from "../lib/sample";

/** Only the categories chosen on the input screen appear here. */
const CHOSEN: CategoryId[] = ["food", "cafe", "exhibit"];

function kakaoMapUrl(query: string) {
  return `https://map.kakao.com/?q=${encodeURIComponent(query)}`;
}

export default function Places() {
  const [active, setActive] = useState<CategoryId[]>(CHOSEN);
  const [selected, setSelected] = useState<Place | null>(null);

  function toggle(id: CategoryId) {
    setActive((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  const visible = CHOSEN.filter((c) => active.includes(c));

  return (
    <div className="lds-screen" style={{ position: "relative" }}>
      <TopNav title={`${MEETING_POINT.name} 근처`} backHref="/results" />

      <div className="lds-scroll">
        <MapView
          className="app-map--inline"
          controls
          markers={[
            {
              id: "meeting-point",
              label: MEETING_POINT.name,
              top: MEETING_POINT.mapTop,
              left: MEETING_POINT.mapLeft,
              kind: "result",
            },
          ]}
          filters={CHOSEN.map((id) => {
            const label = CATEGORIES.find((c) => c.id === id)?.label ?? id;
            const count = PLACES.filter((p) => p.category === id).length;
            return (
              <Chip
                key={id}
                selected={active.includes(id)}
                onClick={() => toggle(id)}
              >
                {label} {count}
              </Chip>
            );
          })}
        />

        {visible.map((id) => {
          const label = CATEGORIES.find((c) => c.id === id)?.label ?? id;
          const items = PLACES.filter((p) => p.category === id);
          const fallback = items.find((p) => p.nearer);

          return (
            <section key={id}>
              <div className="lds-list-header">
                <span className="lds-list-header__title">{label}</span>
                <span className="lds-list-header__aux">
                  {fallback
                    ? `${fallback.nearer}님과 더 가까운 곳`
                    : "영업중 우선"}
                </span>
              </div>
              <div className="lds-margin" style={{ display: "flex", flexDirection: "column" }}>
                {items.map((place) => (
                  <PlaceCard
                    key={place.id}
                    place={place}
                    onSelect={() => setSelected(place)}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {visible.length === 0 ? (
          <div className="lds-empty">
            <span className="lds-empty__icon">🔍</span>
            <span className="lds-empty__title">선택한 카테고리가 없어요</span>
            <span className="lds-empty__desc">
              지도 위의 필터를 눌러 보고 싶은 장소를 골라주세요.
            </span>
          </div>
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
                style={{ border: 0, background: "transparent" }}
                onClick={() => setSelected(null)}
                aria-label="닫기"
              >
                ✕
              </button>
            </div>

            <div
              className="lds-scroll lds-margin"
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div className="app-place__figure">
                <Image
                  src={selected.photo}
                  alt=""
                  fill
                  sizes="(min-width: 900px) 380px, 100vw"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className="app-place__stats">
                <span className="app-place__star">★</span>
                <span className="app-place__score">{selected.score.toFixed(2)}</span>
                <span className="app-place__sep">|</span>
                리뷰 <b>{selected.reviews.toLocaleString("ko-KR")}</b>
                <span className="app-place__sep">|</span>
                평균 <b>{selected.price}</b>
              </div>

              <div style={{ display: "flex", gap: "6px" }}>
                <span className="lds-badge lds-badge--brand">영업중</span>
                <span className="lds-badge lds-badge--caution">
                  {selected.closesAt} 마감
                </span>
              </div>

              <p style={{ margin: 0, font: "var(--type-body-2)", color: "var(--color-text-secondary)" }}>
                예상 도착 19:32 · {selected.desc}
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
                href={kakaoMapUrl(`${MEETING_POINT.name} ${selected.title}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="lds-box-button lds-box-button--outline"
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
