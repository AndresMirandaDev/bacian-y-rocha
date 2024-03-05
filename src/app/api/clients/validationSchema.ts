import z from 'zod'

export const stakeholderValidationSchema = z.object({
    name: z.string().min(1).max(255),
    email: z.string().min(1).max(255).email(),
    phone: z.string().min(1).max(255),
    city: z.string().min(1).max(255),
    rut: z.string().min(1).max(255),
    sector :z.string().min(1).max(255)
})
export const updateStakeholderValidationSchema = z.object({
    name: z.string().min(1).max(255).optional(),
    email: z.string().min(1).max(255).email().optional(),
    phone: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(255).optional(),
    rut: z.string().min(1).max(255).optional(),
    sector :z.string().min(1).max(255).optional()
})