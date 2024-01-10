export function normilizeString(input: string): string {
   return input.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g, '')
}