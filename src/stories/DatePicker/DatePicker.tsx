import { useState } from 'react'
import { cn } from '../../lib/cn'

const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function toDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

export type DatePickerMode = 'single' | 'range'

export interface DatePickerProps {
  mode?: DatePickerMode
  value?: Date | null
  rangeStart?: Date | null
  rangeEnd?: Date | null
  onChange?: (date: Date) => void
  onRangeChange?: (range: { start: Date | null; end: Date | null }) => void
  className?: string
}

export const DatePicker = ({
  mode = 'single',
  value: controlledValue,
  rangeStart: controlledStart,
  rangeEnd: controlledEnd,
  onChange,
  onRangeChange,
  className,
}: DatePickerProps) => {
  const today = toDay(new Date())

  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [screen, setScreen] = useState<'calendar' | 'year'>('calendar')
  const [yearBase, setYearBase] = useState(today.getFullYear() - 4)

  const [internalValue, setInternalValue] = useState<Date | null>(null)
  const [internalStart, setInternalStart] = useState<Date | null>(null)
  const [internalEnd, setInternalEnd] = useState<Date | null>(null)
  const [hover, setHover] = useState<Date | null>(null)

  const selected = controlledValue !== undefined ? controlledValue : internalValue
  const rStart = controlledStart !== undefined ? controlledStart : internalStart
  const rEnd = controlledEnd !== undefined ? controlledEnd : internalEnd
  const effectiveEnd = rEnd ?? (rStart && !rEnd && hover ? hover : null)

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  const handleDayClick = (date: Date) => {
    if (mode === 'single') {
      setInternalValue(date)
      onChange?.(date)
      return
    }
    if (!rStart || (rStart && rEnd)) {
      setInternalStart(date)
      setInternalEnd(null)
      onRangeChange?.({ start: date, end: null })
    } else {
      const [lo, hi] = date < rStart ? [date, rStart] : [rStart, date]
      setInternalStart(lo)
      setInternalEnd(hi)
      onRangeChange?.({ start: lo, end: hi })
    }
  }

  // Calendar grid — pad to full weeks
  const firstDow = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const cells: (Date | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewYear, viewMonth, i + 1)),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  // ── Year picker screen ────────────────────────────────────────────────────
  if (screen === 'year') {
    const years = Array.from({ length: 12 }, (_, i) => yearBase + i)
    return (
      <div className={cn('inline-flex flex-col gap-4 bg-white border border-neutral-200 rounded-2xl p-4 shadow-md w-72 select-none', className)}>
        <div className="flex items-center justify-between">
          <button
            aria-label="Previous years"
            onClick={() => setYearBase(b => b - 12)}
            className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-600 transition-colors"
          >
            <ChevronLeft />
          </button>
          <span className="text-sm font-semibold text-neutral-700">
            {yearBase} – {yearBase + 11}
          </span>
          <button
            aria-label="Next years"
            onClick={() => setYearBase(b => b + 12)}
            className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-600 transition-colors"
          >
            <ChevronRight />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {years.map(y => (
            <button
              key={y}
              onClick={() => { setViewYear(y); setScreen('calendar') }}
              className={cn(
                'py-2 rounded-xl text-sm font-medium transition-colors',
                y === viewYear
                  ? 'bg-primary-900 text-white'
                  : y === today.getFullYear()
                    ? 'bg-primary-100 text-primary-900'
                    : 'hover:bg-neutral-100 text-neutral-700',
              )}
            >
              {y}
            </button>
          ))}
        </div>

        <button
          onClick={() => setScreen('calendar')}
          className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors text-center"
        >
          ← Back to calendar
        </button>
      </div>
    )
  }

  // ── Calendar screen ───────────────────────────────────────────────────────
  return (
    <div className={cn('inline-flex flex-col gap-3 bg-white border border-neutral-200 rounded-2xl p-4 shadow-md w-72 select-none', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          aria-label="Previous month"
          onClick={prevMonth}
          className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-600 transition-colors"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() => { setYearBase(viewYear - 4); setScreen('year') }}
          className="text-sm font-semibold text-neutral-800 hover:text-primary-900 hover:bg-primary-50 px-3 py-1 rounded-lg transition-colors"
        >
          {MONTH_NAMES[viewMonth]} {viewYear}
        </button>

        <button
          aria-label="Next month"
          onClick={nextMonth}
          className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-600 transition-colors"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Day-of-week labels */}
      <div className="grid grid-cols-7">
        {DAY_LABELS.map(d => (
          <div key={d} className="flex items-center justify-center text-xs font-medium text-neutral-600 h-8">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7">
        {cells.map((date, i) => {
          if (!date) return <div key={i} className="h-9" />

          const isToday = isSameDay(date, today)
          const isSel = mode === 'single' && !!selected && isSameDay(date, selected)

          const lo = effectiveEnd && rStart
            ? (rStart <= effectiveEnd ? rStart : effectiveEnd)
            : rStart
          const hi = effectiveEnd && rStart
            ? (rStart <= effectiveEnd ? effectiveEnd : rStart)
            : null

          const isStart = mode === 'range' && !!lo && isSameDay(date, lo)
          const isEnd = mode === 'range' && !!hi && isSameDay(date, hi)
          const inRange = mode === 'range' && !!lo && !!hi && date > lo && date < hi
          return (
            <div
              key={i}
              className="relative h-9 flex items-center justify-center cursor-pointer"
              onClick={() => handleDayClick(date)}
              onMouseEnter={() => setHover(date)}
              onMouseLeave={() => setHover(null)}
            >
              {/* Day circle */}
              <div
                className={cn(
                  'flex items-center justify-center h-8 w-8 rounded-lg text-sm font-medium transition-colors',
                  (isSel || isStart || isEnd) && 'bg-primary-900 text-white rounded-lg',
                  isToday && !isSel && !isStart && !isEnd && 'bg-primary-300 text-primary-950 font-semibold rounded-lg',
                  inRange && !isToday && !isStart && !isEnd && 'bg-primary-100 text-primary-900',
                  isToday && inRange && 'bg-primary-300 text-primary-950 rounded-lg',
                  !isSel && !isStart && !isEnd && !isToday && !inRange && 'hover:bg-primary-50 text-neutral-700',
                  inRange && !isStart && !isEnd && 'hover:bg-primary-200',
                )}
              >
                {date.getDate()}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ChevronLeft = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
)

const ChevronRight = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
)
