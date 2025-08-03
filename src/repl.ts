export function cleanInput(input: string): string[] {
  const arr = input
    .toLowerCase()
    .split(/[ \n\t]+/)
    .map((e) => e.trim())
    .filter((e) => {
      return e != "";
    });
  return arr;
}
