import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { positionValidationSchema } from "./validationSchema";

export async function GET( request : NextRequest ) {
    try {
        const positions = await prisma.position.findMany()
        return NextResponse.json({ message: 'success', body: positions})    
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message:'An unexpected error occurred' }, { status :500 })
    }
}


export async function POST (request : NextRequest) {
    const body = await request.json()
    const isValid = await positionValidationSchema.safeParse(body)
    try {
        if(!isValid.success)
            return NextResponse.json({ message: isValid.error.format()}, { status: 400 })

        const {name , value} = body

        const newPosition = await prisma.position.create({
            data:{
                name,
                value
            }
        })

       return NextResponse.json({message:'success', body:newPosition}) 

    } catch (error) {
       console.log(error)
       return NextResponse.json({ message:'An unexpected error occurred' }, { status :500 })
        
    }
}