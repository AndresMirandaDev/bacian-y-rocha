import { z } from 'zod'

export const receivedSaleOrderSchema = z.object({
    file:z.string().min(1).max(255),
    number:z.string().min(1).max(255),
    receivedDate: z.string()
})

export const updateReceivedSaleOrderSchema = z.object({
    file:z.string().min(1).max(255).optional(),
    number:z.string().min(1).max(255).optional(),
    receivedDate: z.string().optional()
})