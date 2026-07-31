/**
 * The drawn map surface.
 *
 * Stands in for the Kakao Maps SDK canvas until the API keys are wired up.
 * Modelled on how a Korean map service renders this zoom level: warm land,
 * cased road hierarchy with arterials picked out in ochre, building
 * footprints, a river, parks, subway lines with station stops, and enough
 * labels that the surface reads as a place rather than a diagram.
 *
 * Coordinates are hand-placed in a 800x600 viewBox. Swapping in the real SDK
 * means deleting this file — markers live in MapView and are positioned in
 * percentages, so they carry over unchanged.
 */

const BLOCKS: [number, number, number, number][] = [
  [40, 150, 118, 62], [40, 224, 118, 44], [40, 280, 76, 58],
  [128, 280, 30, 58], [180, 150, 92, 62], [180, 224, 92, 44],
  [180, 280, 92, 58], [296, 150, 104, 40], [296, 202, 104, 64],
  [296, 280, 104, 58], [424, 150, 88, 62], [424, 224, 88, 44],
  [424, 280, 88, 34], [534, 150, 96, 62], [534, 224, 96, 44],
  [534, 280, 96, 58], [654, 150, 106, 62], [654, 224, 106, 44],
  [654, 280, 106, 58], [40, 66, 118, 54], [180, 66, 92, 54],
  [296, 66, 104, 54], [424, 66, 88, 54], [534, 66, 96, 54],
  [654, 66, 106, 54], [40, 366, 118, 48], [180, 366, 92, 48],
  [296, 366, 104, 48], [424, 366, 88, 48], [534, 366, 96, 48],
];

const ROADS = {
  highway: ["M0 462 C 140 452, 300 476, 460 460 C 600 446, 700 466, 800 456"],
  arterial: ["M0 134 H800", "M0 348 H800", "M280 0 V600", "M512 0 V600"],
  collector: ["M0 212 H800", "M0 268 H600", "M160 40 V440", "M640 40 V440", "M0 414 H800"],
  local: ["M400 40 V440", "M80 40 V440", "M720 60 V420", "M0 96 H800", "M0 314 H520"],
};

export default function MapCanvas() {
  return (
    <svg
      className="app-map__canvas"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="추천 지점과 참가자 출발지를 표시한 지도"
    >
      <rect width="800" height="600" fill="var(--map-land)" />

      {/* River along the south, with the riverside park on its bank */}
      <path
        d="M0 500 C 160 486, 320 512, 470 496 C 620 480, 710 504, 800 492 L800 600 L0 600 Z"
        fill="var(--map-water)"
      />
      <path
        d="M0 486 C 160 472, 320 498, 470 482 C 620 466, 710 490, 800 478 L800 494 C 710 506, 620 482, 470 498 C 320 514, 160 488, 0 502 Z"
        fill="var(--map-park)"
      />

      {/* Parks */}
      <g fill="var(--map-park)" stroke="var(--map-park-edge)" strokeWidth="1.5">
        <rect x="654" y="366" width="106" height="72" rx="8" />
        <rect x="188" y="440" width="120" height="34" rx="8" />
      </g>

      {/* Building footprints */}
      <g fill="var(--map-block)">
        {BLOCKS.map(([x, y, w, h], i) => (
          <rect
            key={i}
            x={x}
            y={y}
            width={w}
            height={h}
            rx="2"
            fill={i % 3 === 0 ? "var(--map-block-alt)" : "var(--map-block)"}
          />
        ))}
      </g>
      {/* A few larger complexes read as apartment blocks */}
      <g fill="var(--map-block-alt)">
        <rect x="46" y="156" width="24" height="50" rx="2" />
        <rect x="76" y="156" width="24" height="50" rx="2" />
        <rect x="106" y="156" width="24" height="50" rx="2" />
        <rect x="540" y="230" width="20" height="32" rx="2" />
        <rect x="566" y="230" width="20" height="32" rx="2" />
        <rect x="592" y="230" width="20" height="32" rx="2" />
      </g>

      {/* Roads — casing first, then fill, so each street reads as a real road */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <g stroke="var(--map-road-edge)">
          {ROADS.arterial.map((d, i) => <path key={`ae${i}`} d={d} strokeWidth="26" />)}
          {ROADS.collector.map((d, i) => <path key={`ce${i}`} d={d} strokeWidth="16" />)}
          {ROADS.local.map((d, i) => <path key={`le${i}`} d={d} strokeWidth="10" />)}
        </g>
        <g stroke="var(--map-highway-edge)">
          {ROADS.highway.map((d, i) => <path key={`he${i}`} d={d} strokeWidth="28" />)}
        </g>
        <g stroke="var(--map-road)">
          {ROADS.arterial.map((d, i) => <path key={`a${i}`} d={d} strokeWidth="21" />)}
          {ROADS.collector.map((d, i) => <path key={`c${i}`} d={d} strokeWidth="12" />)}
          {ROADS.local.map((d, i) => <path key={`l${i}`} d={d} strokeWidth="7" />)}
        </g>
        <g stroke="var(--map-highway)">
          {ROADS.highway.map((d, i) => <path key={`h${i}`} d={d} strokeWidth="23" />)}
        </g>
      </g>

      {/* Subway lines with station stops */}
      <g fill="none" strokeLinecap="round">
        <path d="M0 348 H800" stroke="var(--lds-green-700)" strokeWidth="4" opacity="0.9" />
        <path d="M280 0 V600" stroke="#D4443F" strokeWidth="4" opacity="0.85" />
      </g>
      <g stroke="var(--lds-white)" strokeWidth="2.5">
        <circle cx="280" cy="348" r="7" fill="var(--lds-green-700)" />
        <circle cx="512" cy="348" r="5.5" fill="var(--lds-green-700)" />
        <circle cx="80" cy="348" r="5.5" fill="var(--lds-green-700)" />
        <circle cx="280" cy="134" r="5.5" fill="#D4443F" />
        <circle cx="280" cy="462" r="5.5" fill="#D4443F" />
      </g>

      {/* Labels */}
      <g fontFamily="var(--font-sans)" fill="var(--map-label)">
        <text x="98" y="112" fontSize="14" fontWeight="500" fill="var(--map-label-sub)">역삼1동</text>
        <text x="600" y="112" fontSize="14" fontWeight="500" fill="var(--map-label-sub)">삼성2동</text>
        <text x="98" y="404" fontSize="14" fontWeight="500" fill="var(--map-label-sub)">서초3동</text>
        <text x="676" y="410" fontSize="12" fill="var(--map-label-sub)">근린공원</text>

        <g fontSize="11">
          <text x="330" y="330">테헤란로</text>
          <text x="292" y="240" transform="rotate(-90 292 240)">강남대로</text>
          <text x="60" y="536" fill="var(--map-label-sub)">한강</text>
          <text x="330" y="452" fontSize="10" fill="var(--map-label-sub)">강변북로</text>
        </g>

        <g fontSize="10.5" fill="var(--map-label)">
          <text x="46" y="238">역삼래미안</text>
          <text x="186" y="238">푸르지오시티</text>
          <text x="430" y="196">파이낸스센터</text>
          <text x="540" y="196">삼성타워</text>
          <text x="660" y="196">코엑스몰</text>
          <text x="186" y="316">서초우성아파트</text>
          <text x="430" y="316">교대법조타운</text>
          <text x="540" y="316">강남우체국</text>
        </g>
      </g>

      {/* POI chips */}
      <g>
        {[
          { x: 336, y: 300, glyph: "🍽" },
          { x: 236, y: 196, glyph: "☕" },
          { x: 592, y: 300, glyph: "🎬" },
          { x: 452, y: 392, glyph: "🖼" },
          { x: 120, y: 300, glyph: "🛍" },
        ].map((p) => (
          <g key={`${p.x}-${p.y}`}>
            <rect
              x={p.x - 11}
              y={p.y - 11}
              width="22"
              height="22"
              rx="7"
              fill="var(--map-poi)"
            />
            <text
              x={p.x}
              y={p.y + 4}
              fontSize="11"
              textAnchor="middle"
              fill="#FFFFFF"
            >
              {p.glyph}
            </text>
          </g>
        ))}
      </g>

      {/* Station names sit above everything else */}
      <g fontFamily="var(--font-sans)" fontSize="12" fontWeight="700" fill="var(--map-label)">
        <text x="294" y="372">강남역</text>
        <text x="524" y="372" fontWeight="500" fontSize="11">역삼역</text>
        <text x="92" y="372" fontWeight="500" fontSize="11">교대역</text>
      </g>
    </svg>
  );
}
