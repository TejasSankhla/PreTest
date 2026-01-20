export function convertToLowerCase(str: string): string {
  return str?.toLowerCase().trim() || '';
}

export function trimBlankSpace(str: string): string {
  return str?.trim() || '';
}

export function camelCase(str: string): string {
  return (
    str
      ?.toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_: string, chr: string) =>
        chr.toUpperCase(),
      ) || ''
  );
}

export function formatString(str: string): string {
  if (!str) return '';
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
