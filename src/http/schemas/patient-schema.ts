import { z } from "zod";

export const registerPatientBodySchema = z.object({
  name: z.string().min(1, "Name is required"),
  city: z.string().min(1, "City is required"),
  age: z.string().min(1, "Age is required"),
  description: z.string().optional().default(""),
  isHomeless: z.boolean().default(true),
  substances: z.string().min(1, "Substances is required"),
  usageDuration: z.string().min(1, "Usage duration is required"),
  referredBy: z.string().optional(),
});
