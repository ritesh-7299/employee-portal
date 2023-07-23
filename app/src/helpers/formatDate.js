export function formatDate(date) {
  const newDate = new Date(date);
  return newDate.toLocaleDateString();
}
