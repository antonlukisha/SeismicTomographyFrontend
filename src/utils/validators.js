// Функция для проверки силы пароля
export const isPasswordStrong = (password) => {
  return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);
};
