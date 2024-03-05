import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { updateStakeholderValidationSchema } from "../../clients/validationSchema";



interface params {
    params : {id : string}
}

export async function GET(request:NextRequest, { params } : Params){
    try {
        const client = await prisma.stakeholders.findUnique({
            where: { id : params.id }
        })
        if(!client)
            return NextResponse.json({ message: 'Invalid id'}, { status: 404 })
        
        return NextResponse.json({
            message: 'success',
            body: client
        })

    } 
    
    catch (error) {
        return NextResponse.json({
            message:'An unexpected error occurred',
            error
        }, { status: 500 })    
    }
}

export async function PATCH (request:NextRequest, { params } : Params) {
    const body = await request.json()
    const isValid = await updateStakeholderValidationSchema.safeParse(body)
    try {
        const client = await prisma.stakeholders.findUnique({
            where: {id : params.id}
        })

        if(!client) 
            return NextResponse.json({message:'Invalid id'}, {status:400})

        if(!isValid.success)
            return NextResponse.json({message:isValid.error.format()}, {status:400})
        const { 
            name,
            email,
            city,
            phone,
            rut,
            sector 
        } = body
        
        const updatedClient = await prisma.stakeholders.update({
            where: { id : params.id},
            data:{
                name,
                email,
                city,
                phone,
                rut,
                sector
            }
        })

        return NextResponse.json({message:'success', body:updatedClient})

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message:'An unexpected error occurred',error }, { status:500 })

    }
}

export async function DELETE(request:NextRequest, { params }: Params) {
    try {
        const client = await prisma.stakeholders.findUnique({
            where: { id : params.id }
        })
        if(!client)
            return NextResponse.json({ message:'Invalid id' }, { status: 404 })

        await prisma.stakeholders.delete({
            where: { id: client.id }
        })
        
        return NextResponse.json({ message:'success' })

    } 
    
    catch (error) {
        return NextResponse.json({ message:'An unexpected error occurred', error } , { status: 500 })
    }
}