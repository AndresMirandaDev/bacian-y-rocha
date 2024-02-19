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

  providerName: z.string().min(1).max(255),

  providerAddress: z.string().min(1).max(255),

  providerLine: z.string().min(1).max(255),

  providerEmail: z.string().min(1).max(255),

  providerRut: z.string().min(1).max(255),

  providerCity: z.string().min(1).max(255),

  providerPhone: z.string().min(1).max(255),

  providerContact: z.string().min(1).max(255),

  accordingToQuote: z.string().min(1).max(255),

  requestedBy: z.string().min(1).max(255),

  emittedBy: z.string().min(1).max(255),

  approvedBy: z.string().min(1).max(255),
  discount:z.number()
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

  providerName: z.string().min(1).max(255).optional(),

  providerAddress: z.string().min(1).max(255).optional(),

  providerLine: z.string().min(1).max(255).optional(),

  providerEmail: z.string().min(1).max(255).optional(),

  providerRut: z.string().min(1).max(255).optional(),

  providerCity: z.string().min(1).max(255).optional(),

  providerPhone: z.string().min(1).max(255).optional(),

  providerContact: z.string().min(1).max(255).optional(),

  accordingToQuote: z.string().min(1).max(255).optional(),

  requestedBy: z.string().min(1).max(255).optional(),

  emittedBy: z.string().min(1).max(255).optional(),

  approvedBy: z.string().min(1).max(255).optional(),

  status: z.string().min(1).max(255).optional(),
  discount:z.number().optional()
});


