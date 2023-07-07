export function formatAugmentedString(aug: string): string {
  let formattedString = aug.slice(13).replace(/_/g, " ");

  const romanNumeralRegex = /\b(IV|V?I{0,3})\b$/g;
  const lastWord = formattedString.match(romanNumeralRegex);

  if (lastWord) {
    const lastWordFormatted = lastWord[0].replace(" ", "");
    formattedString = formattedString.replace(
      romanNumeralRegex,
      ` ${lastWordFormatted}`
    );
  }

  formattedString = formattedString.replace(/([IVX]+)$/, " $1");

  // Separate "I" when it is not part of a roman numeral
  formattedString = formattedString.replace(
    /([A-Z])(?!\b(IV|V?I{0,3})\b)/g,
    " $1"
  );

  formattedString = formattedString.replace(/(\d+)/g, " $1");

  // Cut the formatted string to a maximum length of 22 characters
  if (formattedString.length > 22) {
    formattedString = formattedString.slice(0, 22);
  }

  return formattedString.trim();
}
