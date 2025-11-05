export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

const DISPOSABLE_EMAIL_DOMAINS = [
  "yopmail.com",
  "yopmail.fr",
  "guerrillamail.com",
  "mailinator.com",
  "temp-mail.org",
  "10minutemail.com",
  "throwaway.email",
  "tempmail.com",
  "maildrop.cc",
  "trashmail.com",
];

export const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return "L'email est requis";
  }

  if (!EMAIL_REGEX.test(email)) {
    return "Veuillez entrer une adresse email valide";
  }

  const domain = email.split("@")[1]?.toLowerCase();
  if (domain && DISPOSABLE_EMAIL_DOMAINS.includes(domain)) {
    return "Les adresses email jetables ne sont pas autorisées";
  }

  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) {
    return "Le mot de passe est requis";
  }

  if (!PASSWORD_REGEX.test(password)) {
    return "Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre";
  }

  return null;
};
