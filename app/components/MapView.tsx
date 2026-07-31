import type { CSSProperties, ReactNode } from "react";
import MapCanvas from "./MapCanvas";

export type MapMarker = {
  id: string;
  label: string;
  color?: string;
  top: string;
  left: string;
  kind: "origin" | "result";
};

type MapViewProps = {
  markers: MapMarker[];
  /** Floating filter pills over the top of the map, as a map service shows. */
  filters?: ReactNode;
  /** Zoom, scale and locate controls. Off for the small inline map. */
  controls?: boolean;
  className?: string;
  style?: CSSProperties;
};

export default function MapView({
  markers,
  filters,
  controls = false,
  className,
  style,
}: MapViewProps) {
  return (
    <div className={`app-map${className ? ` ${className}` : ""}`} style={style}>
      <MapCanvas />

      {filters ? <div className="app-map__filters">{filters}</div> : null}

      {markers.map((m) =>
        m.kind === "result" ? (
          <span key={m.id} className="app-map__pin" style={{ top: m.top, left: m.left }}>
            <span className="app-map__pin-glyph">📍</span>
            {m.label}
          </span>
        ) : (
          <span
            key={m.id}
            className="app-map__dot"
            style={{ top: m.top, left: m.left, background: m.color }}
          >
            <span className="app-map__dot-label">{m.label}</span>
          </span>
        )
      )}

      {controls ? (
        <>
          <div className="app-map__controls">
            <button type="button" className="app-map__control" aria-label="확대">
              +
            </button>
            <button type="button" className="app-map__control" aria-label="축소">
              −
            </button>
          </div>
          <button
            type="button"
            className="app-map__control app-map__locate"
            aria-label="현재 위치"
          >
            ◎
          </button>
          <div className="app-map__scale">
            <span className="app-map__scale-bar" />
            100m
          </div>
        </>
      ) : null}
    </div>
  );
}
