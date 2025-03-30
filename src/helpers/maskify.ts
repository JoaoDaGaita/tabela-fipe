export function maskify(input: string): string {
  if (input === "") return '""'
  if (input.length <= 4) {
    return input // Retorna a string original se tiver 4 ou menos caracteres
  }

  const maskedPart = "#".repeat(input.length - 4)
  const lastFourChars = input.slice(-4)

  return maskedPart + lastFourChars
}
