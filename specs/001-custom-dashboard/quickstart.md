# Quickstart: 커스텀 대시보드

## 1. 패키지 설치

```bash
pnpm --filter @hub/web add react-grid-layout recharts nanoid
pnpm --filter @hub/web add -D @types/react-grid-layout
```

## 2. 구현 순서

### Step 1 — 타입 & 위젯 레지스트리

`apps/web/src/features/dashboard-layout/model/types.ts`
→ contracts의 인터페이스를 그대로 구현

`apps/web/src/features/dashboard-layout/model/widget-registry.ts`
→ 5종 위젯 정의 등록 (bar-chart, line-chart, area-chart, pie-chart, stat-card)

### Step 2 — Zustand 스토어 (localStorage 연동)

`apps/web/src/features/dashboard-layout/model/layout-store.ts`

```ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      widgets: DEFAULT_WIDGETS,
      layouts: DEFAULT_LAYOUTS,
      addWidget: (definitionId) => { /* instanceId = nanoid() */ },
      removeWidget: (instanceId) => { /* widgets와 layouts에서 제거 */ },
      updateLayouts: (layouts) => set({ layouts }),
      resetToDefault: () => set({ widgets: DEFAULT_WIDGETS, layouts: DEFAULT_LAYOUTS }),
    }),
    {
      name: 'dashboard-layout-v1',
      // 저장 전 스키마 유효성 검증
      merge: (persisted, current) => validateAndMerge(persisted, current),
    }
  )
)
```

### Step 3 — Recharts 위젯 컴포넌트

`apps/web/src/entities/widget/ui/charts/bar-chart-widget.tsx`

```tsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const DUMMY_DATA = [
  { name: '1월', value: 40 },
  { name: '2월', value: 55 },
  // ...
]

export function BarChartWidget() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={DUMMY_DATA}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#6366f1" />
      </BarChart>
    </ResponsiveContainer>
  )
}
```

### Step 4 — 위젯 컨테이너 & 그리드

`apps/web/src/widgets/dashboard/ui/widget-container.tsx`
→ Card 래퍼 + 타이틀 + 삭제 버튼 (X)

`apps/web/src/widgets/dashboard/ui/dashboard-grid.tsx`

```tsx
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

export function DashboardGrid() {
  const { widgets, layouts, updateLayouts, removeWidget } = useDashboardStore()

  return (
    <ResponsiveGridLayout
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 768, sm: 480 }}
      cols={{ lg: 12, md: 8, sm: 4 }}
      rowHeight={80}
      onLayoutChange={(_, allLayouts) => updateLayouts(allLayouts)}
    >
      {widgets.map(widget => (
        <div key={widget.instanceId}>
          <WidgetContainer
            widget={widget}
            onRemove={() => removeWidget(widget.instanceId)}
          />
        </div>
      ))}
    </ResponsiveGridLayout>
  )
}
```

### Step 5 — 위젯 추가 Dialog

`apps/web/src/widgets/dashboard/ui/add-widget-dialog.tsx`
→ shadcn Dialog + 위젯 정의 목록 그리드 카드
→ 클릭 시 `addWidget(definition.id)` 호출

### Step 6 — 대시보드 페이지 교체

`apps/web/src/pages/home/ui/dashboard-page.tsx`

```tsx
export function DashboardPage() {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1>대시보드</h1>
        <AddWidgetDialog />
      </div>
      <DashboardGrid />
    </div>
  )
}
```

## 3. CSS 주의사항

react-grid-layout은 CSS 파일을 별도로 import해야 합니다:

```ts
// apps/web/src/app/index.tsx 또는 dashboard-page.tsx
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
```

## 4. 검증 방법

1. 위젯 추가 버튼 → Dialog 열림 → 위젯 선택 → 대시보드에 추가됨
2. 위젯 드래그 → 그리드 스냅 배치 확인
3. 우측 하단 핸들 리사이즈 → 최소/최대 크기 제한 동작
4. 새로고침 → 동일 레이아웃 복원 (localStorage 확인)
5. X 버튼 → 위젯 제거 후 새로고침 → 해당 위젯 미복원
