import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../prisma/client';
import { updatePositionValidationSchema } from '../validationSchema';

interface Params {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const body = await request.json();
  const isValid = await updatePositionValidationSchema.safeParse(body);
  try {
    const position = await prisma.position.findUnique({
      where: { id: params.id },
    });
    if (!position)
      return NextResponse.json({ message: 'Invalid id' }, { status: 404 });
    if (!isValid.success)
      return NextResponse.json(
        { message: isValid.error.format() },
        { status: 400 }
      );

    const { name, value } = body;

    const updatedPosition = await prisma.position.update({
      where: { id: position.id },
      data: {
        name,
        value,
      },
    });
    return NextResponse.json({ message: 'success', body: updatedPosition });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const position = await prisma.position.findUnique({
      where: { id: params.id },
    });
    if (!position)
      return NextResponse.json({ message: 'Invalid id' }, { status: 404 });

    await prisma.position.delete({
      where: { id: position.id },
    });

    return NextResponse.json({ message: 'success' });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
