import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const DUMMY_DATA = [
  { name: '1월', value: 40 },
  { name: '2월', value: 55 },
  { name: '3월', value: 47 },
  { name: '4월', value: 62 },
  { name: '5월', value: 58 },
  { name: '6월', value: 71 },
]

export function BarChartWidget() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={DUMMY_DATA} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip />
        <Bar dataKey="value" fill="#6366f1" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
