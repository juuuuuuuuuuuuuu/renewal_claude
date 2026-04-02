import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const DUMMY_DATA = [
  { name: '1월', value: 30 },
  { name: '2월', value: 45 },
  { name: '3월', value: 38 },
  { name: '4월', value: 52 },
  { name: '5월', value: 61 },
  { name: '6월', value: 55 },
]

export function LineChartWidget() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={DUMMY_DATA} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#6366f1"
          strokeWidth={2}
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
