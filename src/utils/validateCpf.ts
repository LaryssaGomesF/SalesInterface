export function validateCpf(cpf: string): boolean {
  const cleanCpf = cpf.replace(/\D/g, '');

  if (cleanCpf.length !== 11) return false;

  // Elimina CPFs invalidos conhecidos (ex: 111.111.111-11)
  if (/^(\d)\1{10}$/.test(cleanCpf)) return false;

  let sum = 0;
  let remainder: number;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCpf.substring(i - 1, i), 10) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCpf.substring(9, 10), 10)) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCpf.substring(i - 1, i), 10) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCpf.substring(10, 11), 10)) return false;

  return true;
}