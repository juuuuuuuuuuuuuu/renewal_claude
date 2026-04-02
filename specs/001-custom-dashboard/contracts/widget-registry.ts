/**
 * Widget Registry Contract
 *
 * 프론트엔드 개발자가 새 위젯 템플릿을 등록할 때 따라야 하는 인터페이스 명세.
 * 실제 구현 위치: apps/web/src/features/dashboard-layout/model/widget-registry.ts
 */

import type { ComponentType } from 'react'

// ──────────────────────────────────────────────
// 위젯 컴포넌트가 받는 Props
// ──────────────────────────────────────────────
export interface WidgetProps {
  /** 위젯 컨테이너의 현재 픽셀 너비 (recharts ResponsiveContainer에 전달) */
  width: number
  /** 위젯 컨테이너의 현재 픽셀 높이 */
  height: number
}

// ──────────────────────────────────────────────
// 위젯 정의 (개발자가 registry에 등록)
// ──────────────────────────────────────────────
export interface WidgetDefinition {
  /** 고유 식별자. 영문 소문자 + 하이픈만 허용 (e.g., 'bar-chart') */
  id: string

  /** Dialog에 표시할 이름 (e.g., '막대 차트') */
  name: string

  /** Dialog에 표시할 설명 (1~2문장) */
  description: string

  /** 썸네일 이미지 경로 또는 아이콘 컴포넌트 (Dialog 미리보기용) */
  thumbnail?: string | ComponentType

  /** 실제 렌더링할 React 컴포넌트 */
  component: ComponentType<WidgetProps>

  /** 대시보드 추가 시 초기 크기 (그리드 단위) */
  defaultSize: {
    w: number  // 그리드 컬럼 수 (1~12)
    h: number  // 그리드 행 수
  }

  /** 리사이즈 최소 크기 */
  minSize: {
    w: number
    h: number
  }

  /** 리사이즈 최대 크기 (미설정 시 제한 없음) */
  maxSize?: {
    w: number
    h: number
  }
}

// ──────────────────────────────────────────────
// 대시보드에 배치된 위젯 인스턴스
// ──────────────────────────────────────────────
export interface WidgetInstance {
  /** nanoid로 생성된 고유 인스턴스 ID */
  instanceId: string

  /** WidgetDefinition.id 참조 */
  definitionId: string
}

// ──────────────────────────────────────────────
// react-grid-layout 레이아웃 아이템
// ──────────────────────────────────────────────
export interface GridLayoutItem {
  i: string      // WidgetInstance.instanceId
  x: number
  y: number
  w: number
  h: number
  minW?: number
  minH?: number
  maxW?: number
  maxH?: number
  static?: boolean
}

// ──────────────────────────────────────────────
// breakpoint별 레이아웃 (localStorage 저장 단위)
// ──────────────────────────────────────────────
export interface DashboardLayouts {
  lg: GridLayoutItem[]  // ≥1200px
  md: GridLayoutItem[]  // ≥768px
  sm: GridLayoutItem[]  // ≥480px
}

// ──────────────────────────────────────────────
// 위젯 레지스트리 인터페이스
// ──────────────────────────────────────────────
export interface WidgetRegistry {
  /** 등록된 모든 위젯 정의 목록 반환 */
  getAll(): WidgetDefinition[]

  /** ID로 특정 위젯 정의 조회 */
  getById(id: string): WidgetDefinition | undefined

  /** 새 위젯 정의 등록 */
  register(definition: WidgetDefinition): void
}
