import z from 'zod'

export const userSchema = z.object({
    name:z.string().min(1, 'Name is Required').max(255),
    email:z.string().email().min(1,"Email is required").max(255),
    phone:z.string().optional(),
    password:z.string().min(8,"Password must be at least 8 characters").max(255),
    image:z.string().optional()
})

export const patchUserSchema = z.object({
    name:z.string().min(1, 'Name is Required').max(255).optional(),
    email:z.string().email().min(1,"Email is required").max(255).optional(),
    phone:z.string().optional(),
    password:z.string().min(8,"Password must be at least 8 characters").max(255).optional(),
    image:z.string().optional()
})