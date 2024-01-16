import z from 'zod'

export const quoteValidationSchema = z.object({
    number:z.string().min(1).max(255),
    file:z.string().min(1).max(255)
})
export const patchQuoteValidationSchema = z.object({
    number:z.string().min(1).max(255).optional(),
    file:z.string().min(1).max(255).optional()
})