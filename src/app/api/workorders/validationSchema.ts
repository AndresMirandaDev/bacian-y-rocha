import { z } from 'zod'

export const workOrderValidationSchema = z.object({
    revision:z.string().min(1).max(255),
    code:z.string().min(1).max(255),
    number:z.string().min(1).max(255),
    description:z.string().min(1),
    client:z.string().min(1).max(255),
    startDate:z.string(),
    endDate:z.string().optional(),
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
        id:z.string().min(1).max(255),
        discount:z.number(),
        saleOrderId: z.string().min(1).max(255)
    }).array(),
    activities:z.object({
        id: z.string(),
        description: z.string(),
        assignedTo: z.string(),
        progress: z.number(),
        startDate: z.string(),
        durationInDays: z.number(),

        subTasks: z.object({
                id: z.string(),
                description: z.string().min(1),
                assignedTo: z.string().min(1),
                progress: z.number(),
                startDate: z.string().min(1),
                durationInDays: z.number(),
        }).array().optional()
    }).array()
})  


export const updateWorkOrderValidationSchema = z.object({
    revision:z.string().min(1).max(255).optional(),
    code:z.string().min(1).max(255).optional(),
    number:z.string().min(1).max(255).optional(),
    description:z.string().min(1).optional(),
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
        id:z.string().min(1).max(255),
        discount:z.number(),
        saleOrderId: z.string().min(1).max(255)
    }).array().optional(),
    activities:z.object({
        id: z.string().optional(),
        description: z.string().optional(),
        assignedTo: z.string().optional(),
        progress: z.number().optional(),
        startDate: z.string().optional(),
        durationInDays: z.number().optional(),
        
        subTasks: z.object({
                id: z.string(),
                description: z.string().min(1).optional(),
                assignedTo: z.string().min(1).optional(),
                progress: z.number().optional(),
                startDate: z.string().min(1).optional(),
                durationInDays: z.number().optional(),
        }).array().optional()
    }).array().optional()
})