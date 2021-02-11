export function twoDateDurationDay(startDate, endDate) {
  let duration_time = Math.abs(endDate.getTime() - startDate.getTime()); 
  let duration_days = duration_time / (1000 * 3600 * 24);
  return Math.round(duration_days)
}