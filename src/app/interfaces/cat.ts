export interface Cat {
  _id?: string;
  id?: string;
  name: string;
  age: string;
  ageCategory: 'cachorro' | 'adulto' | 'senior';
  gender: 'macho' | 'hembra';
  behavior: ('tranquilo' | 'activo' | 'cariñoso' | 'independiente' | 'sociable')[];
  breed: string;
  size: 'pequeño' | 'mediano' | 'grande';
  photo: string; 
  story: string;
  isVaccinated: boolean;
  isSterilized: boolean;
  status: 'disponible' | 'en_proceso' | 'adoptado';
  createdAt: Date;
}

