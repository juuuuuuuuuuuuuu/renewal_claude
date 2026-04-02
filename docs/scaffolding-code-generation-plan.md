# Code Generation Plan — 모노레포 스캐폴딩

## 단위 컨텍스트
- **단위명**: monorepo-scaffolding
- **목표**: Turborepo + FSD 아키텍처 기반 프론트엔드 모노레포 스캐폴딩
- **코드 위치**: 워크스페이스 루트 (aidlc-docs/ 외부)

---

## 코드 생성 단계

### Step 1: 모노레포 루트 설정
- [x] package.json (루트 — pnpm workspace, Turborepo scripts)
- [x] pnpm-workspace.yaml
- [x] turbo.json (파이프라인: build, lint, test, type-check, storybook)
- [x] tsconfig.json (루트 — 프로젝트 참조)
- [x] .gitignore
- [x] .npmrc (pnpm 설정)

### Step 2: packages/config — 공통 설정 패키지
- [x] packages/config/package.json
- [x] packages/config/eslint/base.js (공통 ESLint 설정)
- [x] packages/config/eslint/react.js (React 전용 ESLint 설정)
- [x] packages/config/prettier/index.js (Prettier 설정)
- [x] packages/config/typescript/base.json (공통 TS 설정)
- [x] packages/config/typescript/react.json (React 전용 TS 설정)

### Step 3: packages/ui — UI 컴포넌트 라이브러리 기반 설정
- [x] packages/ui/package.json
- [x] packages/ui/tsconfig.json
- [x] packages/ui/tailwind.config.ts
- [x] packages/ui/postcss.config.js
- [x] packages/ui/src/lib/utils.ts (cn() 유틸리티 — clsx + tailwind-merge)
- [x] packages/ui/src/index.ts (public API)
- [x] packages/ui/.storybook/main.ts (Storybook 설정)
- [x] packages/ui/.storybook/preview.ts (Storybook 프리뷰)
- [x] packages/ui/src/styles/globals.css (Tailwind 기본 스타일)

### Step 4: packages/ui — 기본 프리미티브 컴포넌트 (8개)
- [x] packages/ui/src/components/button.tsx + button.stories.tsx
- [x] packages/ui/src/components/input.tsx + input.stories.tsx
- [x] packages/ui/src/components/textarea.tsx
- [x] packages/ui/src/components/card.tsx
- [x] packages/ui/src/components/badge.tsx
- [x] packages/ui/src/components/avatar.tsx
- [x] packages/ui/src/components/skeleton.tsx
- [x] packages/ui/src/components/separator.tsx
- [x] packages/ui/src/index.ts 업데이트 (모든 컴포넌트 export)

### Step 5: packages/ui — 폼 컴포넌트 (7개)
- [x] packages/ui/src/components/label.tsx
- [x] packages/ui/src/components/select.tsx
- [x] packages/ui/src/components/checkbox.tsx
- [x] packages/ui/src/components/radio-group.tsx
- [x] packages/ui/src/components/switch.tsx
- [x] packages/ui/src/components/date-picker.tsx
- [x] packages/ui/src/components/form.tsx (React Hook Form 통합)
- [x] packages/ui/src/index.ts 업데이트

### Step 6: packages/ui — 오버레이 + 데이터 컴포넌트 (8개)
- [x] packages/ui/src/components/dialog.tsx
- [x] packages/ui/src/components/alert-dialog.tsx
- [x] packages/ui/src/components/toast.tsx
- [x] packages/ui/src/components/tooltip.tsx
- [x] packages/ui/src/components/popover.tsx
- [x] packages/ui/src/components/table.tsx
- [x] packages/ui/src/components/tabs.tsx
- [x] packages/ui/src/components/pagination.tsx
- [x] packages/ui/src/index.ts 최종 업데이트

### Step 7: apps/web — 앱 기반 설정
- [x] apps/web/package.json
- [x] apps/web/tsconfig.json
- [x] apps/web/vite.config.ts
- [x] apps/web/tailwind.config.ts
- [x] apps/web/postcss.config.js
- [x] apps/web/index.html
- [x] apps/web/src/main.tsx (엔트리 포인트)
- [x] apps/web/src/app/index.tsx (App 루트 컴포넌트)
- [x] apps/web/src/app/providers.tsx (프로바이더 조합)
- [x] apps/web/src/app/styles/globals.css

### Step 8: apps/web — 라우팅 + 인증 가드
- [x] apps/web/src/app/router.tsx (TanStack Router 라우트 트리)
- [x] apps/web/src/app/auth-guard.tsx (인증 상태 확인)

### Step 9: apps/web — shared/ 레이어
- [x] apps/web/src/shared/api/instance.ts (Axios 인스턴스 + 인터셉터)
- [x] apps/web/src/shared/api/types.ts (ApiResponse, PaginatedResponse 등)
- [x] apps/web/src/shared/api/index.ts
- [x] apps/web/src/shared/model/auth-store.ts (useAuthStore)
- [x] apps/web/src/shared/model/ui-store.ts (useUIStore)
- [x] apps/web/src/shared/model/settings-store.ts (useSettingsStore)
- [x] apps/web/src/shared/model/index.ts
- [x] apps/web/src/shared/ui/page-header.tsx
- [x] apps/web/src/shared/ui/empty-state.tsx
- [x] apps/web/src/shared/ui/error-boundary.tsx
- [x] apps/web/src/shared/ui/index.ts
- [x] apps/web/src/shared/lib/format-date.ts
- [x] apps/web/src/shared/lib/index.ts
- [x] apps/web/src/shared/config/env.ts
- [x] apps/web/src/shared/config/routes.ts (라우트 경로 상수)
- [x] apps/web/src/shared/config/index.ts
- [x] apps/web/src/shared/i18n/config.ts (i18n 설정)
- [x] apps/web/src/shared/i18n/locales/ko.json
- [x] apps/web/src/shared/i18n/locales/en.json
- [x] apps/web/src/shared/i18n/locales/ja.json
- [x] apps/web/src/shared/i18n/index.ts

### Step 10: apps/web — entities/ 레이어 (7개 슬라이스 스텁)
- [x] entities/user/ (model/types.ts, api/queries.ts, ui/user-card.tsx, index.ts)
- [x] entities/post/ (model/types.ts, api/queries.ts, index.ts)
- [x] entities/leave/ (model/types.ts, api/queries.ts, index.ts)
- [x] entities/notice/ (model/types.ts, api/queries.ts, index.ts)
- [x] entities/department/ (model/types.ts, api/queries.ts, index.ts)
- [x] entities/attendance/ (model/types.ts, api/queries.ts, index.ts)
- [x] entities/approval/ (model/types.ts, api/queries.ts, index.ts)

### Step 11: apps/web — features/ 레이어 (7개 슬라이스 스텁)
- [x] features/auth/ (ui/login-form.tsx, api/mutations.ts, index.ts)
- [x] features/create-post/ (ui/create-post-form.tsx, index.ts)
- [x] features/leave-request/ (ui/leave-request-form.tsx, index.ts)
- [x] features/approval-request/ (ui/approval-request-form.tsx, index.ts)
- [x] features/attendance-check/ (ui/attendance-check-in.tsx, index.ts)
- [x] features/search/ (ui/global-search.tsx, index.ts)
- [x] features/file-upload/ (ui/file-uploader.tsx, index.ts)

### Step 12: apps/web — widgets/ 레이어
- [x] widgets/layout/ (ui/app-layout.tsx, index.ts)
- [x] widgets/header/ (ui/header.tsx, index.ts)
- [x] widgets/sidebar/ (ui/sidebar.tsx, index.ts)
- [x] widgets/bottom-nav/ (ui/bottom-navigation.tsx, index.ts)

### Step 13: apps/web — pages/ 레이어 (10개 슬라이스 스텁)
- [x] pages/home/ (ui/dashboard-page.tsx, index.ts)
- [x] pages/community/ (ui/community-list-page.tsx, ui/community-detail-page.tsx, ui/community-write-page.tsx, index.ts)
- [x] pages/leave/ (ui/leave-management-page.tsx, ui/leave-request-page.tsx, ui/leave-calendar-page.tsx, index.ts)
- [x] pages/notice/ (ui/notice-list-page.tsx, ui/notice-detail-page.tsx, index.ts)
- [x] pages/profile/ (ui/profile-page.tsx, index.ts)
- [x] pages/organization/ (ui/organization-page.tsx, index.ts)
- [x] pages/attendance/ (ui/attendance-page.tsx, index.ts)
- [x] pages/approval/ (ui/approval-list-page.tsx, ui/approval-detail-page.tsx, ui/approval-request-page.tsx, index.ts)
- [x] pages/auth/ (ui/login-page.tsx, index.ts)
- [x] pages/settings/ (ui/settings-page.tsx, index.ts)

### Step 14: 테스트 인프라 설정
- [x] apps/web/vitest.config.ts
- [x] apps/web/src/test/setup.ts (테스트 셋업)
- [x] apps/web/src/test/test-utils.tsx (커스텀 렌더 유틸)
- [x] apps/web/playwright.config.ts
- [x] packages/ui/vitest.config.ts

### Step 15: 코드 생성 요약 문서
- [x] aidlc-docs/construction/scaffolding/code/code-summary.md 생성
