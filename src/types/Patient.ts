export interface Patient {
  id: number;
  full_name: string;
  full_name_mother: string;
  birth_date: string;
  cpf: string;
  cns: string;
  address: string;
  photo: string;
}

export interface NewPatient {
  full_name: string;
  full_name_mother: string;
  birth_date: string;
  cpf: string;
  cns: string;
  address: string;
  photo: string;
}
