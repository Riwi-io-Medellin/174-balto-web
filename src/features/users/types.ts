export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  idNumber: string;
  idType: string;
  phone: string;
  phoneExtra?: string | null;
  location?: string | null;
  address?: string | null;
  photoUrl?: string | null;
  createdAt: string;
};
