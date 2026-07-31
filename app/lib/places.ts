import type { CategoryId } from "./categories";

export type Place = {
  id: string;
  category: CategoryId;
  title: string;
  kind: string;
  desc: string;
  photo: string;
  photoCount: number;
  score: number;
  reviews: number;
  price: string;
  closesAt: string;
  /** Set when the place sits off the meeting point, toward one participant. */
  nearer?: string;
  badge?: { label: string; variant: "caution" | "brand" };
};

/**
 * Sample places for the screen-only build. Photography is stand-in imagery;
 * Kakao/Naver place data replaces every field here once the APIs are wired up.
 */
export const PLACES: Place[] = [
  {
    id: "italian",
    category: "food",
    title: "일 몰리노",
    kind: "이탈리안",
    desc: "강남역 11번 출구 도보 5분",
    photo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=70",
    photoCount: 12,
    score: 4.62,
    reviews: 738,
    price: "26,000원",
    closesAt: "21:30",
    badge: { label: "21:30 마감 임박", variant: "caution" },
  },
  {
    id: "korean",
    category: "food",
    title: "한상차림 강남점",
    kind: "한정식",
    desc: "강남역 12번 출구 도보 3분",
    photo: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=70",
    photoCount: 8,
    score: 4.41,
    reviews: 1204,
    price: "18,000원",
    closesAt: "22:00",
    badge: { label: "인기", variant: "brand" },
  },
  {
    id: "roastery",
    category: "cafe",
    title: "로스터리 도렐",
    kind: "카페",
    desc: "강남역 10번 출구 도보 4분",
    photo: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800&q=70",
    photoCount: 21,
    score: 4.55,
    reviews: 486,
    price: "7,500원",
    closesAt: "22:00",
  },
  {
    id: "gallery",
    category: "exhibit",
    title: "언주로 갤러리",
    kind: "미술관",
    desc: "상설전 · 20:00 관람 마감",
    photo: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=70",
    photoCount: 6,
    score: 4.73,
    reviews: 192,
    price: "12,000원",
    closesAt: "20:00",
    nearer: "지민",
  },
];

export function placesByCategory(category: CategoryId): Place[] {
  return PLACES.filter((p) => p.category === category);
}
