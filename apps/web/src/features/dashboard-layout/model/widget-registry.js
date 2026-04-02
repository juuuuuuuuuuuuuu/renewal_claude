import { BarChartWidget } from '@entities/widget';
import { LineChartWidget } from '@entities/widget';
import { AreaChartWidget } from '@entities/widget';
import { PieChartWidget } from '@entities/widget';
import { StatCardWidget } from '@entities/widget';
export const widgetDefinitions = [
    {
        id: 'bar-chart',
        name: '막대 차트',
        description: '항목별 수치를 막대로 비교합니다.',
        component: BarChartWidget,
        defaultSize: { w: 4, h: 3 },
        minSize: { w: 2, h: 2 },
    },
    {
        id: 'line-chart',
        name: '꺾은선 차트',
        description: '시간에 따른 추세를 선으로 표시합니다.',
        component: LineChartWidget,
        defaultSize: { w: 4, h: 3 },
        minSize: { w: 2, h: 2 },
    },
    {
        id: 'area-chart',
        name: '영역 차트',
        description: '누적 영역으로 변화 추이를 시각화합니다.',
        component: AreaChartWidget,
        defaultSize: { w: 4, h: 3 },
        minSize: { w: 2, h: 2 },
    },
    {
        id: 'pie-chart',
        name: '원형 차트',
        description: '전체 대비 각 항목의 비율을 표시합니다.',
        component: PieChartWidget,
        defaultSize: { w: 3, h: 3 },
        minSize: { w: 2, h: 2 },
    },
    {
        id: 'stat-card',
        name: 'KPI 카드',
        description: '핵심 지표 수치를 한눈에 표시합니다.',
        component: StatCardWidget,
        defaultSize: { w: 2, h: 2 },
        minSize: { w: 2, h: 1 },
        maxSize: { w: 4, h: 2 },
    },
];
export function getWidgetDefinition(id) {
    return widgetDefinitions.find((def) => def.id === id);
}
//# sourceMappingURL=widget-registry.js.map