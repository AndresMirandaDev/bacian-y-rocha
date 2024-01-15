import { NextRequest, NextResponse } from "next/server";
import { patchUserSchema } from "../validationSchema";
import prisma from "../../../../../prisma/client";
import * as bcrypt from 'bcrypt'

interface Params {
    params:{ id: string }
}

export async function PATCH(request:NextRequest, { params } : Params) {
    const body = await request.json()
    console.log(body)
    const isValid = await patchUserSchema.safeParse(body)
    try {
        if (!isValid.success)
            return NextResponse.json({message:isValid.error.format()}, { status:400 })
        
        const user = await prisma.user.findUnique({where: { id:params.id } })    

        if(!user) 
            return NextResponse.json({message:'User does not exist '}, { status:404 })  
        
        if(body.password){
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(body.password, salt)
        }

        const {name, email, image } = body    

        const updatedUser = await prisma.user.update({
            where:{id : params.id},
            data:{
                name,
                password:user.password,
                email,
                image
            }
        })

        return NextResponse.json({message:'success', body:updatedUser})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:'an unexpected error ocurred', body:error})
    }
}

export async function DELETE(request:NextRequest, { params }: Params) {
    const user = await prisma.user.findUnique({ where: { id: params.id } })

    if(!user)
        return NextResponse.json({ message: 'Invalid user' } , { status:404 })

    await prisma.user.delete({
        where:{ id: params.id }
    })

    return NextResponse.json({})
}