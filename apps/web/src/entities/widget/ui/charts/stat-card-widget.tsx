import { TrendingDown, TrendingUp } from 'lucide-react'

const DUMMY_DATA = {
  label: '이번 달 완료',
  value: '127',
  unit: '건',
  trend: 12,
}

export function StatCardWidget() {
  const isPositive = DUMMY_DATA.trend >= 0

  return (
    <div className="flex flex-col justify-center h-full px-2">
      <p className="text-xs text-muted-foreground truncate">{DUMMY_DATA.label}</p>
      <p className="text-3xl font-bold mt-1">
        {DUMMY_DATA.value}
        <span className="text-sm font-normal text-muted-foreground ml-1">{DUMMY_DATA.unit}</span>
      </p>
      <div className={`flex items-center gap-1 mt-1 text-xs ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        <span>{isPositive ? '+' : ''}{DUMMY_DATA.trend}% 전월 대비</span>
      </div>
    </div>
  )
}
