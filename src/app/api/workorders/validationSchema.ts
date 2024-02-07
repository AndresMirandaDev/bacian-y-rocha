import { z } from 'zod'

export const workOrderValidationSchema = z.object({
    revision:z.string().min(1).max(255),
    code:z.string().min(1).max(255),
    number:z.string().min(1).max(255),
    description:z.string().min(1).max(255),
    client:z.string().min(1).max(255),
    startDate:z.string(),
    endDate:z.string(),
    estimatedDate:z.string(),
    quoteNumber:z.string().min(1).max(255),
    requiresPlaque:z.string().min(1).max(255),
    componentName:z.string().min(1).max(255),
    componentDevice:z.string().min(1).max(255),
    model:z.string().min(1).max(255),
    deviceNumber:z.string().min(1).max(255),
    materials:z.object({
        name:z.string().min(1).max(255),
        unitPrice:z.number(),
        quantity:z.number(),
        code:z.string().min(1).max(255),
        id:z.string().min(1).max(255)
    }).array()
})


export const updateWorkOrderValidationSchema = z.object({
    revision:z.string().min(1).max(255).optional(),
    code:z.string().min(1).max(255).optional(),
    number:z.string().min(1).max(255).optional(),
    description:z.string().min(1).max(255).optional(),
    client:z.string().min(1).max(255).optional(),
    startDate:z.string().optional(),
    endDate:z.string().optional(),
    estimatedDate:z.string().optional(),
    quoteNumber:z.string().min(1).max(255).optional(),
    requiresPlaque:z.string().min(1).max(255).optional(),
    componentName:z.string().min(1).max(255).optional(),
    componentDevice:z.string().min(1).max(255).optional(),
    model:z.string().min(1).max(255).optional(),
    deviceNumber:z.string().min(1).max(255).optional(),
    materials:z.object({
        name:z.string().min(1).max(255),
        unitPrice:z.number(),
        quantity:z.number(),
        code:z.string().min(1).max(255),
        id:z.string().min(1).max(255)
    }).array().optional()
})