export interface Patient {
  id: number;
  full_name: string;
  full_name_mother: string;
  birth_date: string;
  cpf: number;
  cns: number;
  address: string;
}

export interface NewPatient {
  full_name: string;
  full_name_mother: string;
  birth_date: string;
  cpf: number;
  cns: number;
  address: string;
}
