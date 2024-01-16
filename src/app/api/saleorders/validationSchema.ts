import z from 'zod'
import { Material } from '@prisma/client'

export const saleOrderSchema = z.object({
    materials: z.object(
        {
            name:z.string(),
            unitPrice:z.number(),
            quantity:z.number()
        }
    ).array(),

    receptionGuide: z.string().min(1).max(255),

    status: z.string().optional()    
})
export const patchSaleOrderSchema = z.object({
    materials: z.object(
        {
            name:z.string(),
            unitPrice:z.number(),
            quantity:z.number()
        }
    ).array().optional(),

    receptionGuide: z.string().min(1).max(255).optional(),

    status: z.string().optional()    
})