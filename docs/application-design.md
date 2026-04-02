# Application Design — 통합 설계 문서

## 프로젝트 개요
사내 인트라넷 웹사이트의 프론트엔드 모노레포 아키텍처 설계.
Turborepo + FSD (Feature-Sliced Design) + React SPA.

---

## 1. 모노레포 구조

```
monorepo-root/
├── apps/
│   └── web/                          # React SPA (Vite)
│       └── src/
│           ├── app/                   # 프로바이더, 라우터, AuthGuard
│           ├── pages/                 # 10개 슬라이스 (home, community, leave, notice, profile, organization, attendance, approval, auth, settings)
│           ├── widgets/               # layout, header, sidebar, bottom-nav, notification
│           ├── features/              # auth, create-post, leave-request, approval-request, attendance-check, search, file-upload
│           ├── entities/              # user, post, leave, notice, department, attendance, approval
│           └── shared/                # api, model, ui, lib, config, i18n
├── packages/
│   ├── ui/                            # shadcn/ui 기반 (15~20개 컴포넌트) + Storybook
│   └── config/                        # ESLint, Prettier, TypeScript 공통 설정
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## 2. 기술 결정 요약

| 결정 사항 | 선택 | 근거 |
|---|---|---|
| 라우팅 | TanStack Router | 타입 안전, React Query 통합, 코드 스플리팅 |
| 스타일링 | Tailwind CSS + shadcn/ui | Figma 커스텀 디자인 대응, 헤드리스 컴포넌트 |
| 서버 상태 | React Query | 캐싱, 리페칭, 낙관적 업데이트 |
| 클라이언트 상태 | Zustand (최소 스토어 + 필요시 추가) | auth, UI, settings 기본 + feature 로컬 스토어 |
| API 구조 | shared/api 인스턴스 + 세그먼트별 훅 | FSD 원칙 준수, 유지보수 용이 |
| 레이아웃 | PC: 사이드바+헤더, 모바일: 하단 탭+헤더 | 반응형 UX 최적화 |
| i18n | 한국어, 영어, 일본어 | 확장 가능한 구조 |
| 테스트 | Vitest + RTL + Playwright | 단위/컴포넌트/E2E 커버리지 |

## 3. FSD 레이어 설계

### app/ — 앱 초기화
- Providers: QueryClient, Router, I18n, Theme 조합
- Router: TanStack Router 라우트 트리 (lazy loading)
- AuthGuard: 인증 상태 확인, 미인증 시 리다이렉트

### pages/ — 10개 슬라이스, 17개 라우트
```
/                    → DashboardPage
/community           → CommunityListPage
/community/:id       → CommunityDetailPage
/community/write     → CommunityWritePage
/leave               → LeaveManagementPage
/leave/request       → LeaveRequestPage
/leave/calendar      → LeaveCalendarPage
/notice              → NoticeListPage
/notice/:id          → NoticeDetailPage
/profile             → ProfilePage
/organization        → OrganizationPage
/attendance          → AttendancePage
/approval            → ApprovalListPage
/approval/:id        → ApprovalDetailPage
/approval/request    → ApprovalRequestPage
/login               → LoginPage
/settings            → SettingsPage
```

### widgets/ — 5개 슬라이스
- layout: AppLayout (반응형 레이아웃 전환)
- header: Header (검색, 알림, 유저 메뉴)
- sidebar: Sidebar (PC 네비게이션)
- bottom-nav: BottomNavigation (모바일 탭)
- notification: NotificationPanel

### features/ — 7개 슬라이스
- auth, create-post, leave-request, approval-request, attendance-check, search, file-upload
- 각 슬라이스: ui/, api/ (mutations), model/ (필요시 로컬 스토어)

### entities/ — 7개 슬라이스
- user, post, leave, notice, department, attendance, approval
- 각 슬라이스: model/ (타입), api/ (queries), ui/ (엔티티 카드/리스트 아이템)

### shared/ — 6개 세그먼트
- api/: Axios 인스턴스, 인터셉터, 공통 타입
- model/: Zustand 스토어 (useAuthStore, useUIStore, useSettingsStore)
- ui/: 앱 전용 공통 UI (PageHeader, EmptyState, ErrorBoundary)
- lib/: 유틸리티 (날짜, 권한, 유효성 검증)
- config/: 환경 변수, 상수, 라우트 경로
- i18n/: 번역 파일 (ko, en, ja)

## 4. packages/ui 컴포넌트 (15~20개)

### 카테고리별 구성
- 기본 프리미티브 (8개): Button, Input, Textarea, Card, Badge, Avatar, Skeleton, Separator
- 폼 (7개): Form, Select, Checkbox, RadioGroup, Switch, DatePicker, Label
- 오버레이 (5개): Dialog, Toast, Tooltip, Popover, AlertDialog
- 데이터 (3개): Table, Tabs, Pagination

### 설계 원칙
- Radix UI 헤드리스 컴포넌트 + Tailwind CSS
- cva로 variant 정의, cn()으로 클래스 관리
- 앱에서는 props 기반 사용 (`<Button variant="primary" size="sm" />`)

## 5. 의존성 흐름

```
packages/config (설정)
       ↑
packages/ui (UI 컴포넌트)
       ↑
apps/web (앱)
  └── app → pages → widgets → features → entities → shared
      (FSD 단방향 의존성)
```

## 6. 데이터 흐름

- 서버 데이터: 백엔드 API → shared/api → entity/feature api/ → React Query 캐시 → UI
- 클라이언트 상태: 사용자 액션 → Zustand 스토어 → 구독 컴포넌트 리렌더링
- 인증: SSO IdP → features/auth → shared/model/auth-store → shared/api 인터셉터

---

*상세 내용은 개별 설계 문서 참조:*
- `components.md` — 컴포넌트 정의 및 책임
- `component-methods.md` — 메서드 시그니처
- `services.md` — 서비스 정의 및 오케스트레이션
- `component-dependency.md` — 의존성 관계 및 통신 패턴
