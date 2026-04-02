# Tasks: 커스텀 대시보드

**Input**: Design documents from `/specs/001-custom-dashboard/`
**Stack**: React 18 + TypeScript, react-grid-layout, recharts, Zustand, shadcn/ui
**Structure**: FSD (apps/web/src) — entities → features → widgets → pages

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 병렬 실행 가능 (다른 파일, 의존성 없음)
- **[USn]**: 해당 User Story 태스크
- 모든 경로는 `apps/web/src/` 기준

---

## Phase 1: Setup (패키지 & 환경)

**Purpose**: 필요한 라이브러리 설치 및 CSS 설정

- [x] T001 `apps/web` 워크스페이스에 react-grid-layout, recharts, nanoid 패키지 설치
- [x] T002 react-grid-layout CSS를 `apps/web/src/main.tsx`에 import 추가 (v2에서 react-resizable CSS는 번들 포함)

---

## Phase 2: Foundational (공통 타입 & 차트 컴포넌트)

**Purpose**: 모든 User Story가 공유하는 타입 정의, 위젯 레지스트리, Zustand 스토어, Recharts 차트 컴포넌트

**⚠️ CRITICAL**: Phase 2 완료 전까지 어떤 User Story도 시작할 수 없음

- [x] T003 `apps/web/src/features/dashboard-layout/model/types.ts` 생성
- [x] T004 [P] `apps/web/src/features/dashboard-layout/model/widget-registry.ts` 생성 — 5종 위젯 정의 등록
- [x] T005 [P] `apps/web/src/features/dashboard-layout/model/layout-store.ts` 생성 — Zustand + persist middleware
- [x] T006 [P] `apps/web/src/entities/widget/ui/charts/bar-chart-widget.tsx` 생성
- [x] T007 [P] `apps/web/src/entities/widget/ui/charts/line-chart-widget.tsx` 생성
- [x] T008 [P] `apps/web/src/entities/widget/ui/charts/area-chart-widget.tsx` 생성
- [x] T009 [P] `apps/web/src/entities/widget/ui/charts/pie-chart-widget.tsx` 생성
- [x] T010 [P] `apps/web/src/entities/widget/ui/charts/stat-card-widget.tsx` 생성
- [x] T011 `apps/web/src/entities/widget/index.ts` 생성
- [x] T012 `apps/web/src/features/dashboard-layout/index.ts` 생성

**Checkpoint**: 타입, 스토어, 차트 컴포넌트 준비 완료 → User Story 구현 시작 가능

---

## Phase 3: User Story 1 — 위젯 추가 및 삭제 (Priority: P1) 🎯 MVP

**Goal**: 위젯 추가 버튼 → Dialog → 위젯 선택 → 대시보드 표시, X 버튼으로 삭제

**Independent Test**:
1. `pnpm dev` 실행 후 대시보드 접속
2. "위젯 추가" 버튼 클릭 → Dialog 열림 확인
3. 위젯 선택 → 대시보드에 차트 카드 표시 확인
4. X 버튼 클릭 → 위젯 제거 확인

### Implementation for User Story 1

- [x] T013 [US1] `apps/web/src/widgets/dashboard/ui/widget-container.tsx` 생성
- [x] T014 [US1] `apps/web/src/entities/widget/ui/widget-thumbnail.tsx` 생성
- [x] T015 [US1] `apps/web/src/widgets/dashboard/ui/add-widget-dialog.tsx` 생성
- [x] T016 [US1] `apps/web/src/widgets/dashboard/ui/dashboard-grid.tsx` 생성 (react-grid-layout v2 API 적용)
- [x] T017 [US1] `apps/web/src/pages/home/ui/dashboard-page.tsx` 수정
- [x] T018 [US1] `apps/web/src/widgets/dashboard/index.ts` 생성

**Checkpoint**: 위젯 추가/삭제 동작 확인 → MVP 완성

---

## Phase 4: User Story 4 — 레이아웃 저장 및 복원 (Priority: P1)

**Goal**: 대시보드 구성이 새로고침 후에도 유지됨, 신규 사용자는 기본 레이아웃 표시

**Independent Test**:
1. 위젯 추가 후 새로고침 → 동일 위젯 목록 복원 확인
2. 위젯 삭제 후 새로고침 → 삭제된 위젯 미표시 확인
3. localStorage 키 `dashboard-layout-v1` 데이터 삭제 후 새로고침 → 기본 레이아웃 표시 확인

### Implementation for User Story 4

- [x] T019 [US4] layout-store.ts — DEFAULT_WIDGETS/LAYOUTS, persist merge 스키마 검증
- [x] T020 [US4] dashboard-grid.tsx — onLayoutChange → updateLayouts 자동 저장
- [x] T021 [US4] dashboard-grid.tsx — 빈 위젯 Empty State UI

**Checkpoint**: 새로고침 후 레이아웃 복원 확인

---

## Phase 5: User Story 2 — 드래그 앤 드롭 배치 (Priority: P2)

**Goal**: 위젯을 드래그하여 원하는 그리드 위치로 이동, 스냅 적용

**Independent Test**:
1. 위젯 헤더 드래그 → 다른 위치로 이동 확인
2. 두 위젯을 같은 위치로 드래그 시 자동 밀림 확인
3. 이동 후 새로고침 → 이동된 위치 유지 확인

### Implementation for User Story 2

- [x] T022 [US2] dashboard-grid.tsx — dragConfig handle + verticalCompactor
- [x] T023 [US2] widget-container.tsx — .widget-drag-handle 클래스 + cursor-grab
- [x] T024 [US2] dashboard-grid.tsx — react-grid-layout 내장 placeholder 스타일 사용

**Checkpoint**: 드래그 앤 드롭 동작 및 그리드 스냅 확인

---

## Phase 6: User Story 3 — 위젯 크기 조절 (Priority: P2)

**Goal**: 우측 하단 핸들로 너비/높이 조절, 위젯별 최소/최대 크기 제한 동작

**Independent Test**:
1. 우측 하단 핸들 드래그 → 크기 변경 확인
2. 최소 크기 이하로 축소 시도 → 최소 크기 유지 확인
3. 크기 변경 후 새로고침 → 변경된 크기 유지 확인

### Implementation for User Story 3

- [x] T025 [US3] layout-store.ts addWidget — minW/minH/maxW/maxH 반영
- [x] T026 [US3] dashboard-grid.tsx — resizeConfig handles: ['se']
- [x] T027 [US3] widget-container.tsx — pb-4로 리사이즈 핸들 공간 확보

**Checkpoint**: 크기 조절 및 최소/최대 제한 동작 확인

---

## Phase 7: User Story 5 — 반응형 레이아웃 (Priority: P3)

**Goal**: 화면 크기(lg/md/sm)에 따라 위젯이 겹침 없이 재배열

**Independent Test**:
1. 브라우저 창 폭 480px 이하로 축소 → 위젯이 단일 열 배열 확인
2. 창 폭 768px → 중간 레이아웃 확인
3. 창 폭 1200px 이상 → 12컬럼 레이아웃 확인

### Implementation for User Story 5

- [x] T028 [US5] layout-store.ts — DEFAULT_LAYOUTS에 md/sm 레이아웃 포함
- [x] T029 [US5] layout-store.ts addWidget — lg/md/sm 모두 추가
- [x] T030 [US5] dashboard-grid.tsx — breakpoints/cols 명시적 설정

**Checkpoint**: 모든 화면 크기에서 위젯 겹침 없음 확인

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: UX 개선 및 코드 정리

- [ ] T031 [P] `apps/web/src/widgets/dashboard/ui/dashboard-grid.tsx` 수정 — 빈 대시보드 Empty State UI 추가 (위젯 없을 때 "위젯을 추가해 보세요" 안내)
- [ ] T032 [P] `apps/web/src/features/dashboard-layout/model/widget-registry.ts` 수정 — 각 위젯에 썸네일 아이콘 추가 (lucide-react 아이콘 활용)
- [ ] T033 quickstart.md의 검증 절차 5단계 수동 확인 및 이슈 수정

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: 즉시 시작 가능
- **Phase 2 (Foundational)**: Phase 1 완료 후 → 모든 User Story 블로킹
- **Phase 3 (US1)**: Phase 2 완료 후 → MVP 완성 포인트
- **Phase 4 (US4)**: Phase 3 완료 후 (저장할 위젯이 존재해야 함)
- **Phase 5 (US2)**: Phase 4 완료 후 (레이아웃 저장과 D&D는 연동)
- **Phase 6 (US3)**: Phase 5와 병렬 가능 (독립적인 기능)
- **Phase 7 (US5)**: Phase 4 완료 후 시작 가능
- **Phase 8 (Polish)**: 모든 User Story 완료 후

### Parallel Opportunities

```
Phase 2 내 병렬 실행 가능:
  T004 widget-registry.ts
  T005 layout-store.ts
  T006 bar-chart-widget.tsx
  T007 line-chart-widget.tsx
  T008 area-chart-widget.tsx
  T009 pie-chart-widget.tsx
  T010 stat-card-widget.tsx

Phase 5, 6, 7은 Phase 4 이후 병렬 진행 가능:
  개발자 A: Phase 5 (D&D)
  개발자 B: Phase 6 (Resize)
  개발자 C: Phase 7 (반응형)
```

---

## Implementation Strategy

### MVP First (US1 + US4만)

1. Phase 1: Setup (패키지 설치)
2. Phase 2: Foundational (타입, 스토어, 차트 컴포넌트)
3. Phase 3: US1 (위젯 추가/삭제)
4. Phase 4: US4 (레이아웃 저장)
5. **STOP & VALIDATE**: 위젯 추가 → 새로고침 → 복원 동작 확인

### Full Delivery 순서

Setup → Foundational → US1 → US4 → US2/US3(병렬) → US5 → Polish

---

## Notes

- recharts `ResponsiveContainer`는 부모 요소 크기를 따르므로 `WidgetContainer` 높이가 `100%`여야 함
- `react-grid-layout` CSS 미import 시 드래그/리사이즈 시각적 피드백 없음 (T002 필수)
- `nanoid`로 `instanceId` 생성 시 동일 위젯 중복 추가 지원
- localStorage 키에 버전(`v1`) 포함 — 스키마 변경 시 `v2`로 올려 자동 초기화
