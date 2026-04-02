import { Alert } from '@hub/ui'

function AlertActionButton() {
  return (
    <button
      type="button"
      className="rounded px-1.5 py-1 text-[13px] font-medium uppercase tracking-[0.46px] text-white"
    >
      LABEL
    </button>
  )
}

function StaticSelectStandard() {
  return (
    <div className="relative w-[220px]">
      {/* Label */}
      <span className="block text-xs font-normal tracking-[0.15px] text-[#1976d2]">
        Label
      </span>

      {/* Trigger */}
      <div className="relative mt-1.5 flex items-center border-b-2 border-[#1976d2] pb-0.5">
        <span className="flex-1 text-base tracking-[0.15px] text-[rgba(0,0,0,0.87)]">
          Value
        </span>
        {/* ArrowDropUp */}
        <svg
          className="size-6 shrink-0 text-[rgba(0,0,0,0.54)]"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M7 14l5-5 5 5z" />
        </svg>
      </div>

      {/* Dropdown (open 상태) */}
      <div className="absolute left-0 right-0 top-full z-10 rounded bg-white shadow-[0px_3px_14px_2px_rgba(0,0,0,0.12),0px_8px_10px_1px_rgba(0,0,0,0.14),0px_5px_5px_-3px_rgba(0,0,0,0.2)]">
        <ul className="py-2">
          {['Menu Item', 'Menu Item', 'Menu Item'].map((item, i) => (
            <li
              key={i}
              className="cursor-pointer px-4 py-1.5 text-base tracking-[0.15px] text-[rgba(0,0,0,0.87)] hover:bg-black/[0.04]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function FigmaPreviewPage() {
  return (
    <div className="relative min-h-screen bg-white" style={{ minWidth: 1280 }}>
      {/* Alert — info / filled */}
      <div className="absolute left-[74px] top-[122px] w-[320px]">
        <Alert
          severity="info"
          variant="filled"
          title="{Title}"
          description="{Description}"
          action={<AlertActionButton />}
        />
      </div>

      {/* Select — standard / focused / open */}
      <div className="absolute left-[489px] top-[138px]">
        <StaticSelectStandard />
      </div>
    </div>
  )
}
