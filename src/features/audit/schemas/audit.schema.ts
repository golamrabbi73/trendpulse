import { z } from 'zod';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = ['application/pdf', 'text/csv', 'application/vnd.ms-excel'];

export const generateAuditSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(100, 'Title is too long'),
  file: z
    .custom<File>((val) => val instanceof File, 'Please upload a file')
    .refine((file) => file?.size <= MAX_FILE_SIZE, 'File size must be less than 10MB')
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      'Only PDF and CSV files are allowed'
    ),
});

export type GenerateAuditInput = z.infer<typeof generateAuditSchema>;
