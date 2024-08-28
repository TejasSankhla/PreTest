export function convertToLowerCase(originial_string) {
  // Transform string to lower case and trim for empty characters from both end
  return originial_string.toLowerCase().trim();
}
export function trimBlankSpace(originial_string) {
  // Transform string to lower case and trim for empty characters from both end
  return originial_string.trim();
}

export function camelCase(str) {
  // Using replace method with regEx
  const origString = convertToLowerCase(str);
  return origString
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}
export function formatString(str) {
  if (typeof str !== "string" || !str.trim()) {
    return ""; // Return an empty string for non-strings or empty inputs
  }

  return str
    .trim()
    .split(/\s+/) // Use regex to handle multiple spaces properly
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
