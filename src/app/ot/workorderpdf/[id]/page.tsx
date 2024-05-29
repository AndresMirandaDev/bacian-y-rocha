import { notFound } from 'next/navigation';
import React from 'react';
import ExportPDFButton from '../ExportPDFButton';

interface Params {
  params: { id: string };
}

const ViewPDF = async ({ params }: Params) => {
  const workOrder = await prisma?.workOrder.findUnique({
    where: { id: params.id },
  });

  if (!workOrder) return notFound();

  return <ExportPDFButton workOrder={workOrder} />;
};

export default ViewPDF;
