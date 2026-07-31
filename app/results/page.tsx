import Link from "next/link";
import TopNav from "../components/TopNav";

const legs = [
  { name: "지민", minutes: 27, color: "var(--lds-blue-500)" },
  { name: "서연", minutes: 25, color: "var(--lds-orange-500)" },
  { name: "준호", minutes: 23, color: "var(--lds-gray-500)" },
];

const alternates = [
  { rank: 2, name: "신논현역", diff: 6, transfers: 0 },
  { rank: 3, name: "교대역", diff: 9, transfers: 2 },
];

export default function Results() {
  const total = legs.reduce((sum, l) => sum + l.minutes, 0);

  return (
    <div className="lds-screen">
      <TopNav title="추천 결과" variant="emphasis" backHref="/" />

      <div className="lds-scroll">
        <div className="app-map">
          <span
            className="app-map__dot"
            style={{ background: "var(--lds-blue-500)", top: "30%", left: "22%" }}
          />
          <span
            className="app-map__dot"
            style={{ background: "var(--lds-orange-500)", top: "62%", left: "74%" }}
          />
          <span
            className="app-map__dot"
            style={{ background: "var(--lds-gray-500)", top: "78%", left: "30%" }}
          />
          <span className="app-map__pin" style={{ top: "44%", left: "44%" }}>
            📍 강남역
          </span>
        </div>

        <div className="lds-margin" style={{ marginTop: "14px" }}>
          <div className="lds-card" style={{ borderColor: "var(--color-brand)" }}>
            <div className="lds-card__body">
              <span className="lds-badge lds-badge--brand" style={{ width: "fit-content" }}>
                1위 · 가장 공평해요
              </span>
              <span className="lds-card__title" style={{ font: "var(--type-title-1)" }}>
                강남역
              </span>

              <div className="app-fairness" style={{ marginTop: "6px" }}>
                <div className="app-fairness__head">
                  이동시간 차이
                  <span className="app-fairness__value">4분</span>
                </div>
                <div className="app-fairness__track">
                  {legs.map((l) => (
                    <span
                      key={l.name}
                      className="app-fairness__seg"
                      style={{
                        width: `${(l.minutes / total) * 100}%`,
                        background: l.color,
                      }}
                    />
                  ))}
                </div>
                <div className="app-legs">
                  {legs.map((l) => (
                    <span className="app-leg" key={l.name}>
                      <span className="app-leg__dot" style={{ background: l.color }} />
                      {l.name} <span className="app-leg__time">{l.minutes}분</span>
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
                <span className="lds-badge lds-badge--info">환승 1회</span>
                <span className="lds-badge">핫플레이스 밀집</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lds-list-header">
          <span className="lds-list-header__title">다른 후보</span>
        </div>
        <div>
          {alternates.map((a) => (
            <div className="lds-row" key={a.name}>
              <span className="lds-avatar">{a.rank}</span>
              <span className="lds-row__text">
                <span className="lds-row__title">{a.name}</span>
                <span className="lds-row__desc">
                  시간차 {a.diff}분 · 환승 {a.transfers}회
                </span>
              </span>
              <span className="lds-row__right">›</span>
            </div>
          ))}
        </div>
      </div>

      <div className="lds-sticky-button">
        <Link href="/places" className="lds-box-button lds-box-button--full">
          강남역으로 장소 보기
        </Link>
      </div>
    </div>
  );
}
