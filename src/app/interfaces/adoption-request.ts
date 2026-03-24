export interface AdoptionRequest {
  id: string;
  catId: string;
  catName: string;
  catPhoto?: string;       
  applicantId: string;   
  applicantName: string;
  applicantEmail: string;
  status: 'pendiente' | 'aceptada' | 'rechazada';
  createdAt: Date;
}