import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const DUMMY_DATA = [
  { name: '완료', value: 42 },
  { name: '진행중', value: 28 },
  { name: '대기', value: 18 },
  { name: '취소', value: 12 },
]

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd']

export function PieChartWidget() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={DUMMY_DATA}
          cx="50%"
          cy="50%"
          innerRadius="40%"
          outerRadius="65%"
          paddingAngle={3}
          dataKey="value"
        >
          {DUMMY_DATA.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [value, name]} />
      </PieChart>
    </ResponsiveContainer>
  )
}
