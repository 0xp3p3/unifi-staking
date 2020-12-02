export function formatTime(timeMs: number) {
  const dt = new Date(timeMs);
  return `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()} ${addZero(
    dt.getHours()
  )}:${addZero(dt.getMinutes())}`;
}

function addZero(i: number) {
  let res: string | number = i;
  if (i < 10) {
    res = "0" + i;
  }
  return res;
}
