export enum Status {
  DENIED = "DENIED",
  UNDER_REVIEW = "UNDER_REVIEW",
  APPROVED = "APPROVED",
}

export interface Patient {
  id?: string;
  name: string;
  city: string;
  age: string;
  description: string;
  isHomeless: boolean;
  substances: string;
  usageDuration: string;
  referredBy?: string;
  status?: string;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
