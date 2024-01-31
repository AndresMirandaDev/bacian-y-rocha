import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { taskSchema } from "./validationSchema";

export async function GET(request: NextRequest){
    try {
        const tasks = await prisma.task.findMany()
        return NextResponse.json({message:'success', body:tasks})
    } catch (error) {
        NextResponse.json({message:'An unexpected error occurred', error})
    }
}

export async function POST(request:NextRequest){
    const body = await request.json()
    const isValid = await taskSchema.safeParse(body)
    try { 
        if(!isValid.success)
            return NextResponse.json({message:isValid.error.format()},{status:400})

        const {name, start, duration, month, asignee, otherFields, progress} = body 
        
        const newTask = await prisma.task.create({
            data:{
                name,
                start,
                duration,
                month,
                asignee,
                otherFields,
                progress
            }
        })

        return NextResponse.json({message:'success', body:newTask})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:'An unexpected error occurred', error})
    }
}