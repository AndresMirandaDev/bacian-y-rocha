import z from 'zod'
import { Material } from '@prisma/client'



 export const saleOrderSchema = z.object({
  materials: z.array(
    z.object({
      name: z.string().min(1).max(255),
      unitPrice: z.number(),
      quantity: z.number(),
    })
  ),

  receptionGuide: z.string().min(1).max(255),

  number: z.string().min(1).max(255),

  date: z.string(),

  customerName: z.string().min(1).max(255),

  customerAddress: z.string().min(1).max(255),

  customerLine: z.string().min(1).max(255),

  customerEmail: z.string().min(1).max(255),

  customerRut: z.string().min(1).max(255),

  customerCity: z.string().min(1).max(255),

  customerPhone: z.string().min(1).max(255),

  customerContact: z.string().min(1).max(255),

  accordingToQuote: z.string().min(1).max(255),

  requestedBy: z.string().min(1).max(255),

  emittedBy: z.string().min(1).max(255),

  approvedBy: z.string().min(1).max(255),
});


export const updateSaleOrderSchema = z.object({
  materials: z.array(
    z.object({
      name: z.string().min(1).max(255),
      unitPrice: z.number(),
      quantity: z.number(),
    })
  ).optional(),

  receptionGuide: z.string().min(1).max(255).optional(),

  number: z.string().min(1).max(255).optional(),

  date: z.string().optional(),

  customerName: z.string().min(1).max(255).optional(),

  customerAddress: z.string().min(1).max(255).optional(),

  customerLine: z.string().min(1).max(255).optional(),

  customerEmail: z.string().min(1).max(255).optional(),

  customerRut: z.string().min(1).max(255).optional(),

  customerCity: z.string().min(1).max(255).optional(),

  customerPhone: z.string().min(1).max(255).optional(),

  customerContact: z.string().min(1).max(255).optional(),

  accordingToQuote: z.string().min(1).max(255).optional(),

  requestedBy: z.string().min(1).max(255).optional(),

  emittedBy: z.string().min(1).max(255).optional(),

  approvedBy: z.string().min(1).max(255).optional(),

  status: z.string().min(1).max(255).optional()
});


