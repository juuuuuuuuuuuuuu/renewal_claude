# Research: 커스텀 대시보드

## 1. react-grid-layout 라이브러리 선택

**Decision**: `react-grid-layout` (ResponsiveGridLayout) 사용

**Rationale**:
- 그리드 스냅, D&D, 리사이즈를 단일 라이브러리로 처리
- `isResizable`, `isDraggable` 등 세밀한 제어 가능
- `minW/maxW/minH/maxH` per-item 크기 제한 지원
- breakpoints별 독립 레이아웃(`layouts`) 내장 → 반응형 지원
- React 18 호환 확인됨

**Alternatives considered**:
- `dnd-kit` + 커스텀 그리드: 유연하지만 그리드 스냅/리사이즈 직접 구현 필요 → 복잡도 과다
- `react-beautiful-dnd`: 리사이즈 미지원 → 제외

**Usage pattern**:
```tsx
import { Responsive, WidthProvider } from 'react-grid-layout'
const ResponsiveGridLayout = WidthProvider(Responsive)

<ResponsiveGridLayout
  layouts={layouts}          // { lg: [...], md: [...], sm: [...] }
  breakpoints={{ lg: 1200, md: 768, sm: 480 }}
  cols={{ lg: 12, md: 8, sm: 4 }}
  rowHeight={80}
  onLayoutChange={handleLayoutChange}
>
  {items.map(item => <div key={item.i}>...</div>)}
</ResponsiveGridLayout>
```

---

## 2. recharts 위젯 템플릿 선택

**Decision**: 아래 5종 템플릿 제공

| 위젯 ID | 컴포넌트 | 설명 | 기본 크기 (w×h) | 최소 |
|---------|---------|------|----------------|------|
| `bar-chart` | BarChart | 막대 차트 | 4×3 | 2×2 |
| `line-chart` | LineChart | 꺾은선 차트 | 4×3 | 2×2 |
| `area-chart` | AreaChart | 영역 차트 | 4×3 | 2×2 |
| `pie-chart` | PieChart | 원형 차트 | 3×3 | 2×2 |
| `stat-card` | (숫자 카드) | KPI 수치 표시 | 2×1 | 2×1 |

**Rationale**: recharts는 SVG 기반이며 컨테이너 크기에 따른 반응형 렌더링(`ResponsiveContainer`)을 내장 지원하여 위젯 리사이즈 시 자동 재렌더링됨.

---

## 3. 레이아웃 저장 전략

**Decision**: Zustand + localStorage persist middleware

**Rationale**:
- 기존 프로젝트가 Zustand 사용 중 (`shared/model/ui-store.ts`)
- `zustand/middleware`의 `persist`로 localStorage 자동 동기화
- 저장 키: `dashboard-layout-v1` (버전 키로 스키마 변경 시 마이그레이션 가능)
- 유효성 검증: 로드 시 스키마 검증 후 실패하면 기본 레이아웃으로 폴백

---

## 4. Dialog 위젯 추가 UX

**Decision**: shadcn `Dialog` + 그리드 형태 위젯 카드 선택 UI

**Rationale**:
- `packages/ui`에 Dialog 컴포넌트 이미 존재 (`packages/ui/src/components/dialog.tsx`)
- 위젯 썸네일 + 이름 + 설명을 그리드로 나열
- 클릭 시 즉시 대시보드에 추가 후 Dialog 닫힘

---

## 5. 더미 데이터 전략 (PoC)

**Decision**: 각 위젯 컴포넌트 내부에 정적 더미 데이터 하드코딩

**Rationale**: PoC 단계에서 API 연동 불필요. 추후 위젯 정의에 `dataFetcher` 필드 추가로 실데이터 연동 확장 가능.
