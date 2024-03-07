import { z } from 'zod'

export const positionValidationSchema = z.object({
    name: z.string().min(1).max(255),
    value: z.number()
})


export const updatePositionValidationSchema = z.object({
    name: z.string().min(1).max(255).optional(),
    value: z.number().optional()
})