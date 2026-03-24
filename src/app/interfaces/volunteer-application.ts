export interface VolunteerApplication {
  fullName: string;
  email: string;
  availability: 'manana' | 'tarde' | 'fines_de_semana';
  message?: string;
}
