import * as bcrypt from 'bcrypt';
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
        },{ status:400 })

        const salt = await bcrypt.genSalt(10)
        const encryptedPassword =await bcrypt.hash(body.password, salt)

        const newUser =  await prisma.user.create({
            data:{
                name:body.name,
                email:body.email,
                password:encryptedPassword,
                phone:body.phone,
                image:body.image,
            }
        })

        return NextResponse.json({ message:'success', body:newUser }, { status:201 })

    } catch (error) {

        return NextResponse.json({ message:'an unexpected error ocurred', body:error}, { status: 500 })
    }

}


export async function GET(request:NextRequest) {
 console.log('get users handler')
    try{
    const users = await prisma.user.findMany({
        select:{name:true, email:true, phone:true,id:true,image:true }
    })
    return NextResponse.json({message:'success', body:users})
} catch(error){
    console.log(error)
    return NextResponse.json({message:'An unexpected error occurred', error },{ status: 500 })
}
}


