export interface Event {
  _id?: string;
  title: string;
  description: string;
  date: Date | string;
  location: string;
  imageUrl?: string;
  createdAt?: Date;
}
