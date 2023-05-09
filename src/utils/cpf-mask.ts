export const maskCPF = (cpf: string | number) => {
  cpf = cpf.toString().replace(/\D/g, "");
  cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

  return cpf;
};
