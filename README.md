# 중간 지점 찾기

서로 멀리 떨어진 친구들이 약속을 잡을 때, 출발지와 목적만 입력하면 **이동시간이 가장 공평한 중간 지점**과 **코스 일정**을 추천하는 웹서비스.

## 현재 상태

**화면 구현 단계.** 외부 API 키 없이 동작하며, 지도·경로·장소 데이터는 샘플 데이터로 대체되어 있습니다.

| 화면 | 경로 | 상태 |
|---|---|---|
| 참가자·목적 입력 | `/` | 동작 (참가자 추가/삭제, 카테고리 복수 선택) |
| 계산 중 | `/calculating` | 동작 (연출용 진행 표시) |
| 추천 결과 | `/results` | 화면만 (샘플 데이터) |
| 장소 탐색 + 상세 시트 | `/places` | 동작 (필터 칩, 바텀시트, 카카오맵 링크) |
| 코스 일정 | `/schedule` | 동작 (드래그로 순서 변경, 공유) |

## 아직 붙지 않은 것

- ODsay API — 대중교통 소요시간·환승 횟수
- 카카오 로컬 API / 카카오맵 SDK — 장소 검색, 지도
- 네이버 지역검색 API — 장소 데이터 보완

세 API 모두 키를 서버 환경변수로만 두고 Next.js Route Handler로 프록시할 예정입니다. (네이버 지역검색은 CORS 미지원이라 프록시가 필수)

## 개발

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## 구조

```
app/
  page.tsx            참가자·목적 입력
  calculating/        계산 중
  results/            추천 결과
  places/             장소 탐색 + 상세 바텀시트
  schedule/           코스 일정
  components/         TopNav, Chip
  lib/categories.ts   카테고리 정의
design-system/
  tokens.css          색상·타이포·레이아웃 토큰 (라이트/다크)
  components.css      LDS 컴포넌트 + 서비스 전용 컴포넌트
  wireframes.html     6개 화면 와이어프레임 (정적 문서)
docs/superpowers/specs/
  2026-07-31-meetpoint-recommender-design.md   설계 문서
```

## 디자인 시스템

[LINE Design System for Messenger](https://designsystem.line.me/) 공개 문서에서 색상·타이포그래피 스케일·레이아웃 규칙과 컴포넌트 명세를 추출해 토큰화했습니다. 공식 문서에 수치가 공개되지 않은 값(radius, elevation 등)은 CSS 주석에 `[DERIVED]`로 표시했습니다.

LINE Green(`#06C755`)은 LINE의 상표입니다. 커머셜 배포 시 `--color-brand` 계열 토큰만 교체하면 브랜드를 바꿀 수 있도록 시맨틱 레이어로 분리해 두었습니다.
