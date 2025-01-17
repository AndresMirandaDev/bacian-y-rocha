import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { StakeholderType } from "@prisma/client";
import { stakeholderValidationSchema } from "../clients/validationSchema";

export async function GET(request:NextRequest) {
    try {
        const clients = await prisma.stakeholders.findMany({
            where: {type : StakeholderType.PROVIDER}
        })
        return NextResponse.json({message:'success', body: clients})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message:'An unexpected error occurred',error }, { status:500 })
    }
}

export async function POST (request:NextRequest) {
    const body = await request.json()
    const isValid = await stakeholderValidationSchema.safeParse(body)
    try {
        if(!isValid.success){
            return NextResponse.json({message:isValid.error.format()}, {status:400})
        }
        const { name,
                email,
                city,
                phone,
                rut,
                sector,
                address
            } = body

        const newClient = await prisma.stakeholders.create({
            data:{
                name,
                email,
                city,
                phone,
                rut,
                sector,
                address,
                type:StakeholderType.PROVIDER
            }
        })

        return NextResponse.json({message:'success', body: newClient})

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message:'An unexpected error occurred',error }, { status:500 })
    }
}