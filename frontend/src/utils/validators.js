// Strict Gmail format validation regex
export const GMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;

export function isValidGmail(email) {
  if (!email) return false;
  return GMAIL_REGEX.test(email.trim());
}
