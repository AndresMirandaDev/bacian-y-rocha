import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { workOrderValidationSchema } from "./validationSchema";

export async function GET(request:NextRequest){
    try {
        const workOrders =  await prisma.workOrder.findMany()
        return NextResponse.json({message:'success', body:workOrders})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:'An unexpected error occurred', error}, {status: 500})
    }
}

export async function POST(request:NextRequest){
    const body = await request.json()
    const isValid = await workOrderValidationSchema.safeParse(body)
    try {
        if(!isValid.success)
            return NextResponse.json({message:isValid.error.format()}, {status : 400})
        
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

        const newWorkOrder = await prisma.workOrder.create({
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

        return NextResponse.json({message:'success', body:newWorkOrder})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:'An unexpected error occurred', error}, {status:500})
    }
}