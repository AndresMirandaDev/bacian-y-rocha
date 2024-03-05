import { z } from 'zod'

export const receivedSaleOrderSchema = z.object({
    files:z.string().min(1).max(255).array(),
    number:z.string().min(1).max(255),
    receivedDate: z.string()
})

export const updateReceivedSaleOrderSchema = z.object({
    files:z.string().min(1).max(255).array().optional(),
    number:z.string().min(1).max(255).optional(),
    receivedDate: z.string().optional()
})