import z from 'zod'

export const quoteValidationSchema = z.object({
    number:z.string().min(1).max(255),
    file:z.string().min(1).max(255).optional(),
    customer:z.string().min(1).max(255),
    details:z.object({description:z.string().min(1).max(255), id:z.string()}).array(),
    quoteSent:z.string().optional(),
    requestedDate:z.string(),
    status:z.string().optional()

})
export const patchQuoteValidationSchema = z.object({
    number:z.string().min(1).max(255).optional(),
    file:z.string().min(1).max(255).optional(),
    customer:z.string().min(1).max(255).optional(),
    details:z.object({description:z.string().min(1).max(255)}).array().optional(),
    quoteSent:z.string().optional(),
    requestedDate:z.string().optional(),
    status:z.string().optional()
})