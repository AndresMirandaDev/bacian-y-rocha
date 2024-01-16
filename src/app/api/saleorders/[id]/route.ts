import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { patchSaleOrderSchema } from "../validationSchema";

interface Params {
    params : { id : string}
}

export async function GET (request:NextRequest, { params }: Params){
    try {
        const saleOrder = await prisma.saleOrder.findUnique({
            where: { id: params.id }
        })

        if(!saleOrder)
            return NextResponse.json({ message: 'Invalid id' }, { status:404 })

        return NextResponse.json({
            message:'success',
            body: saleOrder
        })

    } 
    
    catch (error) {
        return NextResponse.json({
            message: 'An unexpected error occurred',
            error
        }, { status : 500 })
    }
}

export async function PATCH (request:NextRequest, { params }: Params){
    const body = await request.json()
    const isValid = await patchSaleOrderSchema.safeParse(body)
    
    try {
       
        if(!isValid.success)
            return NextResponse.json({message:isValid.error.format()}, { status : 400})
        
        const saleOrder = await prisma.saleOrder.findUnique({ where: {id: params.id} })
        if(!saleOrder)
            return NextResponse.json({ message:'Invalid id' } , { status: 404 })

        const {materials, receptionGuide, status} = body

        const updatedSaleOrder = await prisma.saleOrder.update({
            where: { id: params.id},
            data:{
                materials,
                receptionGuide,
                status
            }
        })    
        return NextResponse.json({
            message:'success',
            body: updatedSaleOrder
        })

    } 
    
    catch (error) {
        return NextResponse.json({ message:'An unexpected error occurred', error} , { status: 500} )
    }
}

export async function DELETE(request: NextRequest, { params }: Params){
    try {
        const saleOrder = await prisma.saleOrder.findUnique({
            where: { id: params.id }
        })

        if(!saleOrder)
            return NextResponse.json({ message:'Invalid id' }, { status: 404 })

        await prisma.saleOrder.delete({
            where: { id: saleOrder.id}
        })
        
        return NextResponse.json({
            message: 'success'
        })
    } 
    
    catch (error) {
        return NextResponse.json({ message:'An unexpected error occurred', error} , { status: 500} )
    }
}