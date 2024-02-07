import { notFound } from 'next/navigation';

import prisma from '../../../../../prisma/client';
import dynamic from 'next/dynamic';

const SaleOrderPDF = dynamic(() => import('../testpdf'), { ssr: false });

interface Props {
  params: { id: string };
}

const SaleOrderPdfPage = async ({ params }: Props) => {
  const saleOrder = await prisma.saleOrder.findUnique({
    where: { id: params.id },
  });

  if (!saleOrder) return notFound();
  return <SaleOrderPDF saleOrder={saleOrder} />;
};

export default SaleOrderPdfPage;
