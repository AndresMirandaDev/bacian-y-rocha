import z from 'zod'

export const userSchema = z.object({
    name:z.string().min(1, 'Name is Required').max(255),
    email:z.string().email().min(1,"Email is required").max(255),
    phone:z.number().optional(),
    password:z.string().min(8,"Password is required").max(255),
    image:z.string().optional()
})