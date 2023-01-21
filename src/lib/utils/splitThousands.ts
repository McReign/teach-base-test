export function splitThousands(number: number, separator = ' ') {
  return number?.toString()?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, separator);
}
