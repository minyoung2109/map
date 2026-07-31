import Link from "next/link";
import type { ReactNode } from "react";

type TopNavProps = {
  title: string;
  variant?: "regular" | "emphasis";
  backHref?: string;
  right?: ReactNode;
};

export default function TopNav({
  title,
  variant = "regular",
  backHref,
  right,
}: TopNavProps) {
  return (
    <div className={`lds-topnav lds-topnav--${variant}`}>
      <span className="lds-topnav__left">
        {backHref ? (
          <Link href={backHref} className="lds-icon-button" aria-label="뒤로 가기">
            ‹
          </Link>
        ) : null}
      </span>
      <span className="lds-topnav__title">{title}</span>
      <span className="lds-topnav__right">{right}</span>
    </div>
  );
}
