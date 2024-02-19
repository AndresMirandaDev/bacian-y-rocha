'use client';
import React, { useEffect, useState } from 'react';
import {
  Document,
  PDFDownloadLink,
  PDFViewer,
  Page,
  Text,
  View,
} from '@react-pdf/renderer';
import SaleOrderPDF from './[id]/SaleOrderPdfViewer';
import { SaleOrder } from '@prisma/client';
import { Button } from '@radix-ui/themes';
import Spinner from '@/app/components/Spinner';
import { DownloadIcon } from '@radix-ui/react-icons';

interface Props {
  saleOrder: SaleOrder;
}

const PdfView = ({ saleOrder }: Props) => {
  const [client, setClient] = useState(false);
  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <PDFDownloadLink
      document={<SaleOrderPDF saleOrder={saleOrder} />}
      fileName="pdf.pdf"
    >
      {({ blob, url, loading, error }) => (
        <Button disabled={loading} style={{ width: '100%' }}>
          {loading && <Spinner />}
          <DownloadIcon />
          Descargar PDF
        </Button>
      )}
    </PDFDownloadLink>

    // <PDFViewer>
    //   <SaleOrderPDF saleOrder={saleOrder} />
    // </PDFViewer>
  );
};

export default PdfView;
