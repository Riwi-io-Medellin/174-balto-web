export type VerificationStatus = "pending" | "approved" | "rejected";

export type VerificationDocument = {
  id: string;
  documentType: string;
  fileUrl: string;
  createdAt: string;
};

export type BusinessVerification = {
  id: string;
  ownerUserId: string;
  name: string;
  nit: string;
  email: string;
  phone: number;
  type?: string | null;
  location?: string | null;
  address?: string | null;
  verificationStatus: VerificationStatus;
  createdAt: string;
  documents: VerificationDocument[];
};

export type WalkerVerification = {
  id: string;
  userId: string;
  fullName: string;
  profilePhoto?: string | null;
  available: boolean;
  workLocation?: string | null;
  experience?: string | null;
  description?: string | null;
  verificationStatus: VerificationStatus;
  documentName?: string | null;
  documentNumber?: string | null;
  isAcceptingBookings: boolean;
  createdAt: string;
  updatedAt: string;
  documents: VerificationDocument[];
};
