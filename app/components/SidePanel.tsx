"use client";

import { usePathname } from "next/navigation";
import MapView from "./MapView";
import { PARTICIPANT_COLORS, SAMPLE_LEGS, MEETING_POINT } from "../lib/sample";

/**
 * The persistent map pane shown beside the flow on wide screens.
 *
 * On a phone the map belongs inside the screen that needs it; on a desktop a
 * map service keeps it visible throughout, so this pane mirrors the state of
 * the current step rather than appearing and disappearing.
 */
export default function SidePanel() {
  const pathname = usePathname();
  const decided = pathname !== "/" && pathname !== "/calculating";

  const markers = [
    ...SAMPLE_LEGS.map((leg, i) => ({
      id: leg.name,
      label: leg.name,
      color: PARTICIPANT_COLORS[i % PARTICIPANT_COLORS.length],
      top: leg.mapTop,
      left: leg.mapLeft,
      kind: "origin" as const,
    })),
    ...(decided
      ? [
          {
            id: "meeting-point",
            label: MEETING_POINT.name,
            top: MEETING_POINT.mapTop,
            left: MEETING_POINT.mapLeft,
            kind: "result" as const,
          },
        ]
      : []),
  ];

  return (
    <aside className="app-side" aria-label="지도">
      <MapView markers={markers} className="app-side__map" controls />
      <div className="app-side__caption">
        {decided ? (
          <>
            <strong>{MEETING_POINT.name}</strong>에서 만나요 · 이동시간 차이{" "}
            {MEETING_POINT.spreadMinutes}분
          </>
        ) : (
          <>출발지를 입력하면 가장 공평한 지점을 찾아드려요</>
        )}
      </div>
    </aside>
  );
}
