export function dateObjToHtmlString(date: Date): string {
  if (!date) return "";
  const tzoffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
  const nDate = new Date(date.getTime() - tzoffset).toISOString();
  return nDate.slice(0, 16);
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return date1.getDate() === date2.getDate()
    && date1.getMonth() === date2.getMonth()
    && date1.getFullYear() === date2.getFullYear();
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return date.getDate() === today.getDate()
    && date.getMonth() === today.getMonth()
    && date.getFullYear() === today.getFullYear();
}
