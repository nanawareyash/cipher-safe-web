export function validatePersonName(name: string): boolean {
  const pattern: RegExp =
    /^[a-zA-Z][a-zA-Z][a-zA-Z ]+(([\'\,\.\-][a-zA-Z])?[a-zA-Z]*)*$/;
  return pattern.test(name);
}

export function validateEmail(email: string): boolean {
  const pattern: RegExp =
    /^[a-zA-Z][a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}

export function validateCountryCode(code: string): boolean {
  const pattern: RegExp = /^\+\d{1,4}$/;
  return pattern.test(code);
}

export function validateContactNumber(contactNumber: string): boolean {
  const pattern: RegExp = /^[6-9]\d{9}$/;
  return pattern.test(contactNumber);
}

export function validatePassword(password: string): boolean {
  const pattern: RegExp =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return pattern.test(password);
}
