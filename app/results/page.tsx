import Link from "next/link";
import TopNav from "../components/TopNav";
import MapView from "../components/MapView";
import {
  ALTERNATE_POINTS,
  MEETING_POINT,
  PARTICIPANT_COLORS,
  SAMPLE_LEGS,
} from "../lib/sample";

export default function Results() {
  const total = SAMPLE_LEGS.reduce((sum, l) => sum + l.minutes, 0);

  const markers = [
    ...SAMPLE_LEGS.map((leg, i) => ({
      id: leg.name,
      label: leg.name,
      color: PARTICIPANT_COLORS[i % PARTICIPANT_COLORS.length],
      top: leg.mapTop,
      left: leg.mapLeft,
      kind: "origin" as const,
    })),
    {
      id: "meeting-point",
      label: MEETING_POINT.name,
      top: MEETING_POINT.mapTop,
      left: MEETING_POINT.mapLeft,
      kind: "result" as const,
    },
  ];

  return (
    <div className="lds-screen">
      <TopNav title="추천 결과" variant="emphasis" backHref="/" />

      <div className="lds-scroll">
        <MapView markers={markers} className="app-map--inline" />

        <div className="lds-margin" style={{ marginTop: "14px" }}>
          <div className="lds-card" style={{ borderColor: "var(--color-brand)" }}>
            <div className="lds-card__body">
              <span className="lds-badge lds-badge--brand" style={{ width: "fit-content" }}>
                1위 · 가장 공평해요
              </span>
              <span className="lds-card__title" style={{ font: "var(--type-title-1)" }}>
                {MEETING_POINT.name}
              </span>

              <div className="app-fairness" style={{ marginTop: "6px" }}>
                <div className="app-fairness__head">
                  이동시간 차이
                  <span className="app-fairness__value">
                    {MEETING_POINT.spreadMinutes}분
                  </span>
                </div>
                <div className="app-fairness__track">
                  {SAMPLE_LEGS.map((l, i) => (
                    <span
                      key={l.name}
                      className="app-fairness__seg"
                      style={{
                        width: `${(l.minutes / total) * 100}%`,
                        background: PARTICIPANT_COLORS[i % PARTICIPANT_COLORS.length],
                      }}
                    />
                  ))}
                </div>
                <div className="app-legs">
                  {SAMPLE_LEGS.map((l, i) => (
                    <span className="app-leg" key={l.name}>
                      <span
                        className="app-leg__dot"
                        style={{
                          background: PARTICIPANT_COLORS[i % PARTICIPANT_COLORS.length],
                        }}
                      />
                      {l.name} <span className="app-leg__time">{l.minutes}분</span>
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
                <span className="lds-badge lds-badge--info">
                  환승 {MEETING_POINT.transfers}회
                </span>
                <span className="lds-badge">핫플레이스 밀집</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lds-list-header">
          <span className="lds-list-header__title">다른 후보</span>
        </div>
        <div>
          {ALTERNATE_POINTS.map((a) => (
            <div className="lds-row" key={a.name}>
              <span className="lds-avatar">{a.rank}</span>
              <span className="lds-row__text">
                <span className="lds-row__title">{a.name}</span>
                <span className="lds-row__desc">
                  시간차 {a.spreadMinutes}분 · 환승 {a.transfers}회
                </span>
              </span>
              <span className="lds-row__right">›</span>
            </div>
          ))}
        </div>
      </div>

      <div className="lds-sticky-button">
        <Link href="/places" className="lds-box-button lds-box-button--full">
          {MEETING_POINT.name}으로 장소 보기
        </Link>
      </div>
    </div>
  );
}
