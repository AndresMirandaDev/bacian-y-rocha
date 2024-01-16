import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { quoteValidationSchema } from "./validationSchema";

export async function GET(request: NextRequest) {
    try {
        const quotes = await prisma.quote.findMany()
        return NextResponse.json({
            message:'success',
            body:quotes
        })
    } 
    
    catch (error) {
        return NextResponse.json({ message:'An unexpected error occurred',error }, { status:500 })
    }
}

export async function POST(request:NextRequest) {
    const body = await request.json()
    const isValid = await quoteValidationSchema.safeParse(body)

    try {
      if(!isValid.success)
        return NextResponse.json({ message:isValid.error.format() }, { status: 400 })  

      const { number , file } = body
      
      const newQuote =  await prisma.quote.create({
        data:{
            number,
            file
        }
      })

      return NextResponse.json({ message:'success' , body: newQuote} )
    } 
    
    catch (error) {
        return NextResponse.json({ message:'An unexpected error occurred',error }, { status:500 })     
    }
}