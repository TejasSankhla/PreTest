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
  return str
    .trim() // Remove leading and trailing whitespace
    .split(" ") // Split the string into an array of words
    .filter((word) => word !== "") // Remove any empty elements caused by multiple spaces
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter, lowercase the rest
    .join(" "); // Join the array back into a string
}
