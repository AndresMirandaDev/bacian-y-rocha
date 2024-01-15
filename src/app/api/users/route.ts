import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { userSchema } from "./validationSchema";


export async function POST(request:NextRequest) {
    const body = await request.json()
    
    try {
        const isValid = userSchema.safeParse(body)

        if(!isValid.success)
            return NextResponse.json({
                message:isValid.error.format()},
                { status:400 }
        ) 
        
        const userExists = await prisma.user.findFirst({where:{email:body.email}})       
        
        if (userExists)
            return NextResponse.json({
                message:'Email is already registered'
        })
    } catch (error) {
        
    }

}


export async function GET(request:NextRequest) {
    const users = await prisma.user.findMany({
        orderBy:{email:'asc'}
    })
    return NextResponse.json(users)
}
