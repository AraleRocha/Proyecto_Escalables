export interface VolunteerApplication {
  _id?: string;
  fullName: string;
  email: string;
  availability: 'manana' | 'tarde' | 'fines_de_semana';
  message?: string;
  status?: 'pendiente' | 'aceptado' | 'rechazado';
  createdAt?: Date;
}
