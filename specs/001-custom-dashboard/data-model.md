# Data Model: 커스텀 대시보드

## 핵심 타입

### WidgetDefinition
위젯 템플릿의 정적 명세. 개발자가 `widget-registry.ts`에 등록한다.

```ts
interface WidgetDefinition {
  id: string                    // 고유 식별자 (e.g., 'bar-chart')
  name: string                  // 표시 이름 (e.g., '막대 차트')
  description: string           // Dialog 내 설명 텍스트
  component: React.ComponentType<WidgetProps>  // 렌더링 컴포넌트
  defaultSize: { w: number; h: number }
  minSize: { w: number; h: number }
  maxSize?: { w: number; h: number }  // 미설정 시 제한 없음
}
```

### WidgetInstance
대시보드에 실제 배치된 위젯의 인스턴스.

```ts
interface WidgetInstance {
  instanceId: string            // 고유 인스턴스 ID (nanoid 생성)
  definitionId: string          // WidgetDefinition.id 참조
}
```

### GridLayoutItem
react-grid-layout이 요구하는 레이아웃 아이템 형태.

```ts
interface GridLayoutItem {
  i: string       // WidgetInstance.instanceId와 동일
  x: number       // 그리드 열 위치 (0-based)
  y: number       // 그리드 행 위치 (0-based)
  w: number       // 너비 (그리드 컬럼 단위)
  h: number       // 높이 (그리드 행 단위)
  minW?: number
  minH?: number
  maxW?: number
  maxH?: number
}
```

### DashboardLayouts
breakpoint별 레이아웃 상태. localStorage에 이 형태로 저장된다.

```ts
interface DashboardLayouts {
  lg: GridLayoutItem[]
  md: GridLayoutItem[]
  sm: GridLayoutItem[]
}
```

### DashboardState (Zustand Store)
```ts
interface DashboardState {
  // 상태
  widgets: WidgetInstance[]         // 현재 배치된 위젯 인스턴스 목록
  layouts: DashboardLayouts         // breakpoint별 레이아웃

  // 액션
  addWidget: (definitionId: string) => void
  removeWidget: (instanceId: string) => void
  updateLayouts: (layouts: DashboardLayouts) => void
  resetToDefault: () => void
}
```

## 상태 전이

```
[빈 대시보드 or 기본 레이아웃]
        ↓ addWidget(definitionId)
[위젯 인스턴스 생성 + 레이아웃 말단에 추가]
        ↓ 드래그 / 리사이즈
[onLayoutChange → updateLayouts 호출 → localStorage 자동 저장]
        ↓ removeWidget(instanceId)
[위젯 제거 + 해당 레이아웃 아이템 제거]
```

## localStorage 스키마

저장 키: `dashboard-layout-v1`

```json
{
  "state": {
    "widgets": [
      { "instanceId": "abc123", "definitionId": "bar-chart" }
    ],
    "layouts": {
      "lg": [{ "i": "abc123", "x": 0, "y": 0, "w": 4, "h": 3 }],
      "md": [{ "i": "abc123", "x": 0, "y": 0, "w": 4, "h": 3 }],
      "sm": [{ "i": "abc123", "x": 0, "y": 0, "w": 4, "h": 3 }]
    }
  },
  "version": 0
}
```

## 기본 레이아웃 (신규 사용자)

```ts
const DEFAULT_WIDGETS: WidgetInstance[] = [
  { instanceId: 'default-1', definitionId: 'bar-chart' },
  { instanceId: 'default-2', definitionId: 'stat-card' },
  { instanceId: 'default-3', definitionId: 'line-chart' },
]

const DEFAULT_LAYOUTS: DashboardLayouts = {
  lg: [
    { i: 'default-1', x: 0, y: 0, w: 6, h: 3, minW: 2, minH: 2 },
    { i: 'default-2', x: 6, y: 0, w: 2, h: 1, minW: 2, minH: 1 },
    { i: 'default-3', x: 6, y: 1, w: 6, h: 3, minW: 2, minH: 2 },
  ],
  md: [...],
  sm: [...],
}
```
