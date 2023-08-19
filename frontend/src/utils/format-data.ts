export function formatData(data?: Date) {
  if (!data) return new Date();

  const yyyy = data.getFullYear();
  const mm = data.getMonth() + 1;
  const dd = data.getDate();

  return new Date(yyyy, mm, dd);
}