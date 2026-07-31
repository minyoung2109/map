export type CategoryId =
  | "food"
  | "cafe"
  | "drink"
  | "movie"
  | "exhibit"
  | "shopping"
  | "activity";

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "food", label: "식사" },
  { id: "cafe", label: "카페" },
  { id: "drink", label: "술" },
  { id: "movie", label: "영화" },
  { id: "exhibit", label: "전시" },
  { id: "shopping", label: "쇼핑" },
  { id: "activity", label: "액티비티" },
];

export function categoryLabel(id: string): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
