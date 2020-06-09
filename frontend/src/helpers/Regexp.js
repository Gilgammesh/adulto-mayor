// Función para validar sólo números sin espacios
export const onlyNumber = (value) => {
  const regexp = /^[0-9\b]+$/;
  if (value === "" || regexp.test(value)) {
    return false;
  }
  return true;
};

// Función para validar sólo números con espacios
export const onlyNumberAndSpace = (value) => {
  const regexp = /^[0-9\s]+$/;
  if (value === "" || regexp.test(value)) {
    return false;
  }
  return true;
};

// Función para validar sólo letras sin espacios
export const onlyLetter = (value) => {
  const regexp = /^[A-Za-z\b]+$/;
  if (value === "" || regexp.test(value)) {
    return false;
  }
  return true;
};

// Función para validar sólo letras con espacios
export const onlyLetterAndSpace = (value) => {
  const regexp = /^[A-Za-z\s]+$/;
  if (value === "" || regexp.test(value)) {
    return false;
  }
  return true;
};
