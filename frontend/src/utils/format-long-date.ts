const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
];
const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export function formatLongDate(data: string) {
  const formatData = data.replace(/(\d{2})(\/)(\d{2})/, "$3$2$1");
  const newData = new Date(formatData);

  return `${days[newData.getDay()]}, ${newData.getDate()} de ${months[newData.getMonth()]}`;
}