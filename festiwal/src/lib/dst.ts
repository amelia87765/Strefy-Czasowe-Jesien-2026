function lastSunday(year: number, monthIndex: number): Date {
  const end = new Date(year, monthIndex + 1, 0)
  end.setDate(end.getDate() - end.getDay())
  end.setHours(2, 0, 0, 0)
  return end
}

export function nextClockChange(now = new Date()): { to: 'winter' | 'summer'; at: Date } {
  const year = now.getFullYear()
  const spring = lastSunday(year, 2)
  const autumn = lastSunday(year, 9)
  if (now < spring) return { to: 'summer', at: spring }
  if (now < autumn) return { to: 'winter', at: autumn }
  return { to: 'summer', at: lastSunday(year + 1, 2) }
}

export function remainingParts(at: Date, now = new Date()) {
  const ms = Math.max(0, at.getTime() - now.getTime())
  const totalSeconds = Math.floor(ms / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const seconds = totalSeconds % 60
  return { days, hours, seconds }
}

export function rotatedMonthIndex(now = new Date()) {
  const month = now.getMonth()
  const map = [4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3]
  return map[month] ?? 0
}
