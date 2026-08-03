export function daysUntil(date: Date | string): number {
  const d = typeof date === "string" ? new Date(date) : date;
  return Math.ceil((d.getTime() - Date.now()) / 86400000);
}

/**
 * Turns "solve 50 more by August 1" into "solve 4 more this week" — the
 * back-calculated weekly pace needed to hit a goal by its deadline.
 */
export function computeWeeklyPace(goal: { current: number; target: number; deadline: string | Date }) {
  const remaining = Math.max(0, goal.target - goal.current);
  const daysLeft = Math.max(1, daysUntil(goal.deadline));
  const weeksLeft = Math.max(1, Math.ceil(daysLeft / 7));
  const weeklyTarget = remaining > 0 ? Math.ceil(remaining / weeksLeft) : 0;
  return { remaining, daysLeft, weeksLeft, weeklyTarget };
}
