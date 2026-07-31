import Image from "next/image";
import type { Place } from "../lib/places";

type PlaceCardProps = {
  place: Place;
  onSelect: () => void;
};

export default function PlaceCard({ place, onSelect }: PlaceCardProps) {
  return (
    <button type="button" className="app-place" onClick={onSelect}>
      <span className="app-place__figure">
        <Image
          src={place.photo}
          alt=""
          fill
          sizes="(min-width: 900px) 380px, 100vw"
          style={{ objectFit: "cover" }}
        />
        <span className="app-place__count">1/{place.photoCount}</span>
        {place.badge ? (
          <span className="app-place__badges">
            <span className={`lds-badge lds-badge--${place.badge.variant}`}>
              {place.badge.label}
            </span>
          </span>
        ) : null}
      </span>

      <span className="app-place__body">
        <span className="app-place__name">
          <span className="app-place__title">{place.title}</span>
          <span className="app-place__kind">{place.kind}</span>
        </span>

        <span className="app-place__stats">
          <span className="app-place__star">★</span>
          <span className="app-place__score">{place.score.toFixed(2)}</span>
          <span className="app-place__sep">|</span>
          리뷰 <b>{place.reviews.toLocaleString("ko-KR")}</b>
          <span className="app-place__sep">|</span>
          평균 <b>{place.price}</b>
        </span>

        <span className="app-place__desc">
          {place.nearer
            ? `강남역보다 ${place.nearer}님 쪽이 가까워요 · ${place.closesAt}까지`
            : place.desc}
        </span>
      </span>
    </button>
  );
}
