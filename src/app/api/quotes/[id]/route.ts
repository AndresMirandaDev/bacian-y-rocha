import { NextRequest, NextResponse } from "next/server";
import { patchQuoteValidationSchema } from "../validationSchema";
import prisma from "../../../../../prisma/client";

interface Params {
    params : { id : string }
}

export async function GET(request:NextRequest, { params } : Params){
    try {
        const quote = await prisma.quote.findUnique({
            where: { id : params.id }
        })
        if(!quote)
            return NextResponse.json({ message: 'Invalid id'}, { status: 404 })
        
        return NextResponse.json({
            message: 'success',
            body: quote    
        })

    } 
    
    catch (error) {
        return NextResponse.json({
            message:'An unexpected error occurred',
            error
        }, { status: 500 })    
    }
}


export async function PATCH(request:NextRequest, { params } : Params){
    const body =  await request.json()
    const isValid = await patchQuoteValidationSchema.safeParse(body)
    
    try {
        
        if(!isValid.success)
            return NextResponse.json({message: isValid.error.format() } , { status :400 })
        
        
        const quote = await prisma.quote.findUnique({
            where: { id: params.id }
        })
        if(!quote)
            return NextResponse.json({ message:'Invalid id'}, { status: 404 })

        const { number, file } = body
        
        const updatedQuote = await prisma.quote.update({
            where: { id: quote.id },
            data:{
                number,
                file
            }
        })

        return NextResponse.json({ message: 'success', body: updatedQuote })
    } 
    
    catch (error) {
        return NextResponse.json({ message:'An unexpected error occurred', error } , { status: 500 })
    }
}

export async function DELETE(request:NextRequest, { params }: Params) {
    try {
        const quote = await prisma.saleOrder.findUnique({
            where: { id : params.id }
        })
        if(!quote)
            return NextResponse.json({ message:'Invalid id' }, { status: 404 })

        await prisma.quote.delete({
            where: { id: quote.id }
        })
        
        return NextResponse.json({ message:'success' })

    } 
    
    catch (error) {
        return NextResponse.json({ message:'An unexpected error occurred', error } , { status: 500 })
    }
}