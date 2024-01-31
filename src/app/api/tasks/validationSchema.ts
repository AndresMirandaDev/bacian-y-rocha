import z from 'zod'


export const taskSchema = z.object({
    name:z.string().min(1).max(255).optional(),
    start: z.number().min(1).max(31),
    duration: z.number().min(1).max(365),
    month:z.number().min(0).max(11),
    asignee:z.string().min(1).max(255),
    otherFields:z.object({
        name:z.string().min(1).max(255),
        value:z.string().min(1).max(255)
    }).array().optional(),
    progress:z.number().min(0).max(100).optional()
})

export const updateTaskSchema = z.object({
    name:z.string().min(1).max(255).optional(),
    start: z.number().min(1).max(31).optional(),
    duration: z.number().min(1).max(365).optional(),
    month:z.number().min(0).max(11).optional(),
    asignee:z.string().min(1).max(255).optional(),
    otherFields:z.object({
        name:z.string().min(1).max(255).optional(),
        value:z.string().min(1).max(255)
    }).array().optional(),
    progress:z.number().min(0).max(100).optional()
})
