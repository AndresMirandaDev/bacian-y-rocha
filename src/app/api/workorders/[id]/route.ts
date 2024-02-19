import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { updateWorkOrderValidationSchema } from "../validationSchema";

interface Params {
    params : { id: string}
}

export async function PATCH(request:NextRequest, { params } : Params){
    const body = await request.json()
    const isValid = await updateWorkOrderValidationSchema.safeParse(body)
    const workOrder = await prisma.workOrder.findUnique({
        where : { id: params.id }
    })
    try {
        if(!workOrder)
            return NextResponse.json({ message: 'Invalid id'}, { status : 404 })
        if(!isValid.success)
            return NextResponse.json({ message:isValid.error.format() },{ status:400 })

            const {
                revision,
                code,
                number,
                description,
                client,
                startDate,
                endDate,
                estimatedDate,
                quoteNumber,
                requiresPlaque,
                componentName,
                componentDevice,
                model,
                deviceNumber,
                materials,
                activities
            } = body

            const updatedWorkOrder = await prisma.workOrder.update({
                where:{ id : workOrder.id},
                data:{
                    revision,
                    code,
                    number,
                    description,
                    client,
                    startDate,
                    endDate,
                    estimatedDate,
                    quoteNumber,
                    requiresPlaque,
                    componentName,
                    componentDevice,
                    model,
                    deviceNumber,
                    materials,
                    activities
                }
            })
            return NextResponse.json({message:'success', body:updatedWorkOrder})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:'An unexpected error occurred', error}, { status: 500} )
    }
}


export async function DELETE(request:NextRequest, { params } : Params) {
    const workOrder = await prisma.workOrder.findUnique({ where : { id: params.id }})
    try {
        if(!workOrder)
            return NextResponse.json({ message: 'Invalid id '}, { status: 404 })

        await prisma.workOrder.delete({ where : { id: workOrder.id }}) 
        
        return NextResponse.json({message:'success'})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:'An unexpected error occurred', error}, { status: 500} )
    }
}