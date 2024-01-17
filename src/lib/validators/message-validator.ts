import { z } from 'zod';

export const messageValidator = z.object({
  fileId: z.string(),
  message: z.string(),
});
