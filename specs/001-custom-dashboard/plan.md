# Implementation Plan: 커스텀 대시보드

**Branch**: `001-custom-dashboard` | **Date**: 2026-04-02 | **Spec**: [spec.md](./spec.md)

## Summary

사용자가 대시보드에 Recharts 기반 차트 위젯을 자유롭게 추가/삭제하고, react-grid-layout으로 드래그 앤 드롭 배치 및 크기 조절을 할 수 있는 커스텀 대시보드 구현. 레이아웃은 localStorage에 저장하여 새로고침 후 복원.

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**: React 18, react-grid-layout, recharts, shadcn/ui (Dialog, Button, Card)
**Storage**: localStorage (PoC 단계; 추후 서버 DB로 교체)
**Testing**: Vitest + React Testing Library
**Target Platform**: 웹 브라우저 (데스크탑 우선)
**Project Type**: Web Application (FSD monorepo, apps/web)
**Performance Goals**: 드래그/리사이즈 60fps, 레이아웃 복원 2초 이내
**Constraints**: 모바일 터치 D&D Phase 1 제외, DB 연동 제외
**Scale/Scope**: 단일 사용자 대시보드, 위젯 템플릿 4~6종

## Constitution Check

Constitution이 미설정 상태입니다. 프로젝트 원칙 위반 게이트 없이 진행합니다.

## Project Structure

### Documentation (this feature)

```text
specs/001-custom-dashboard/
├── plan.md              ✓ (this file)
├── research.md          ✓
├── data-model.md        ✓
├── quickstart.md        ✓
├── contracts/
│   └── widget-registry.ts
└── tasks.md             (created by /speckit.tasks)
```

### Source Code (FSD — apps/web/src)

```text
apps/web/src/
├── pages/
│   └── home/
│       ├── index.ts
│       └── ui/
│           └── dashboard-page.tsx          # 기존 파일 → 커스텀 대시보드로 교체
│
├── widgets/
│   └── dashboard/                          # 신규
│       ├── index.ts
│       └── ui/
│           ├── dashboard-grid.tsx          # react-grid-layout 래퍼
│           ├── widget-container.tsx        # 위젯 공통 래퍼 (헤더, 삭제 버튼)
│           └── add-widget-dialog.tsx       # 위젯 선택 Dialog
│
├── features/
│   └── dashboard-layout/                  # 신규
│       ├── index.ts
│       ├── model/
│       │   ├── types.ts                   # WidgetInstance, WidgetDefinition 타입
│       │   ├── widget-registry.ts         # 위젯 정의 목록
│       │   └── layout-store.ts            # Zustand 스토어 (localStorage 연동)
│       └── ui/
│           └── (없음 - UI는 widgets 레이어)
│
└── entities/
    └── widget/                            # 신규
        ├── index.ts
        └── ui/
            ├── charts/
            │   ├── bar-chart-widget.tsx
            │   ├── line-chart-widget.tsx
            │   ├── pie-chart-widget.tsx
            │   ├── area-chart-widget.tsx
            │   └── stat-card-widget.tsx
            └── widget-thumbnail.tsx       # Dialog 내 미리보기용
```

**Structure Decision**: FSD 6레이어 준수. 위젯 비즈니스 로직(타입, 스토어, 레지스트리)은 features 레이어, 공통 차트 컴포넌트는 entities 레이어, 대시보드 조합 UI는 widgets 레이어, 페이지 진입점은 pages 레이어에 배치.
