import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { receivedSaleOrderSchema } from "./validationSchema";

export async function GET(request:NextRequest){
    try {
        const data = await prisma.receivedSaleOrder.findMany()
        return NextResponse.json({ message:'success', body:data })
    } catch (error) {
        return NextResponse.json({message: 'An unexpected error occurred', error })
    }
}

export async function POST (request:NextRequest){
    const body = await request.json()
    const isValid = await receivedSaleOrderSchema.safeParse(body)
    try {
        if(!isValid.success)
            return NextResponse.json({ message: isValid.error.format() }, { status: 400 })
        const { number, files, receivedDate } = body

        const newReceivedSaleOrder = await prisma.receivedSaleOrder.create({
            data:{
                number,
                files,
                receivedDate
            }
        })
        return NextResponse.json({ message:'success', body:newReceivedSaleOrder })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'An unexpected error occurred', error})
    }
}