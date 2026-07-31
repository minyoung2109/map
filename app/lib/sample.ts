/**
 * Sample data for the screen-only build.
 *
 * Shared by the results screen and the desktop map pane so both tell the same
 * story. Replaced by ODsay / Kakao responses once the APIs are wired up.
 */

export const PARTICIPANT_COLORS = [
  "var(--lds-blue-500)",
  "var(--lds-orange-500)",
  "var(--lds-gray-500)",
  "var(--lds-green-700)",
];

export type SampleLeg = {
  name: string;
  station: string;
  minutes: number;
  mapTop: string;
  mapLeft: string;
};

export const SAMPLE_LEGS: SampleLeg[] = [
  { name: "지민", station: "신도림역", minutes: 27, mapTop: "30%", mapLeft: "18%" },
  { name: "서연", station: "삼성역", minutes: 25, mapTop: "68%", mapLeft: "80%" },
  { name: "준호", station: "교대역", minutes: 23, mapTop: "82%", mapLeft: "34%" },
];

export const MEETING_POINT = {
  name: "강남역",
  spreadMinutes: 4,
  transfers: 1,
  mapTop: "47%",
  mapLeft: "52%",
};

export const ALTERNATE_POINTS = [
  { rank: 2, name: "신논현역", spreadMinutes: 6, transfers: 0 },
  { rank: 3, name: "교대역", spreadMinutes: 9, transfers: 2 },
];
