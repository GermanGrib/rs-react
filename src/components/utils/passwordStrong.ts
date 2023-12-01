export const getPasswordStrength = (password: string) => {
  if (!password || password.length === 0) {
    return 0;
  }
  let strength = 0;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/\d/.test(password)) strength += 1;
  if (/[\^$*.\[\]{}()?\-"!@#%&/,><':;|_~`]/.test(password)) strength += 1;
  if (password.length > 8) strength += 1;
  return strength;
}

