export function checkIfTheFirstLetterIsUppercase(word: string): boolean {
  const firstChar = word.trimStart()[0]
  return firstChar ? /^[A-ZÀ-ÖØ-Þ]/.test(firstChar) : false
}
