import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { saleOrderSchema } from "./validationSchema";

export async function POST(request:NextRequest) {
    const body = await request.json()
    const isValid = await saleOrderSchema.safeParse(body)

    try {
        if(!isValid.success)
            return NextResponse.json({message: isValid.error.format()}, { status:400 })
        
        const { number, date, providerName, providerAddress, providerLine, providerEmail,providerRut,providerCity,providerPhone,providerContact, accordingToQuote, requestedBy, emittedBy, approvedBy, materials, receptionGuide, status,discount } = body    
        const newSaleOrder =  await prisma.saleOrder.create({
            data:{
                number,
                date,
                providerName,
                providerAddress,
                providerLine,
                providerEmail,
                providerRut,
                providerCity,
                providerPhone,
                providerContact,
                accordingToQuote,
                requestedBy,
                emittedBy,
                approvedBy,
                materials,
                receptionGuide,
                discount
            }
        })
        
        return NextResponse.json({ message:'success', body: newSaleOrder})
    } 
    
    catch (error) {
        console.log(error)
        return NextResponse.json({message:"An unexpected error occurred", error},{ status: 500 })
    }

}


export async function GET(request:NextRequest) {
    try {
        const saleOrders = await prisma.saleOrder.findMany()
        return NextResponse.json({ message:'success' , body: saleOrders })
    } catch (error) {
        return NextResponse.json({message:'An unexpected error occurred', error },{ status: 500 })
    }
}