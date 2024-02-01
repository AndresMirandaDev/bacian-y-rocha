import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { bold } from "@cloudinary/url-gen/qualifiers/fontWeight";
import { updateReceivedSaleOrderSchema } from "../validationSchema";

interface Params {
    params:{ id: string}
}

export async function GET( request:NextRequest, { params } : Params){
    try {
        const data = await prisma.receivedSaleOrder.findUnique({
            where:{ id: params.id }
        })
        return NextResponse.json( {message:'success', body: data } )
    } catch (error) {
        console.log(error)
        return NextResponse.json( { message:'An unexpected error occurred', error } )
    }
}

export async function PATCH( request:NextRequest, { params }: Params){
    const body = await request.json()
    const isValid = await updateReceivedSaleOrderSchema.safeParse(body)
    try {
        if(!isValid.success)
            return NextResponse.json({ message:isValid.error.format() } , { status:400 })
            
        const receivedSaleOrder = await prisma.receivedSaleOrder.findUnique( { where: {id: params.id} })
        if(!receivedSaleOrder)
            return NextResponse.json({message:'Invalid id'}, { status: 404 })

        const { number, file , receivedDate } = body    

        const updatedReceivedSaleOrder = await prisma.receivedSaleOrder.update({
            where: {id:receivedSaleOrder.id},
            data:{
                number,
                file,
                receivedDate
            }
        })
        return NextResponse.json({ message:'success', body:updatedReceivedSaleOrder })
    } catch (error) { 
        console.log(error)
        return NextResponse.json({message:'An unexpected error occurred', error})
        
    }
}

export async function DELETE(request:NextRequest, { params }: Params){
    try {
        const data = await prisma.receivedSaleOrder.findUnique({ where :{ id: params.id}})
        if(!data)
            return NextResponse.json({message:'Invalid id'}, { status : 404 })

        await prisma.receivedSaleOrder.delete({
            where:{ id : data.id}
        })
        return NextResponse.json({message:'success'})    
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message:'An unexpected error occurred', error})
    }
}