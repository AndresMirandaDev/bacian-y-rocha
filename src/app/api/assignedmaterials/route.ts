import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(request:NextRequest) {
    try {
        return NextResponse.json('No en uso por ahora')
        // const assignedMaterials = await prisma.assignedMaterials.findMany({
        //     include:{
        //         saleOrder:true,
        //         workOrder:true
        //     }
        // })
        // return NextResponse.json({ message: 'success', body: assignedMaterials })
    } catch (error) {
        return NextResponse.json({ message:'An unexpected error occurred' }, { status: 500 })
    }
}
