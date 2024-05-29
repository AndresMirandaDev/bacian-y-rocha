import Spinner from '@/app/components/Spinner';

import { DownloadIcon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import React from 'react';
import WorkOrderPDF from './WorkOrderPDF';
import { WorkOrder } from '@prisma/client';

interface Props {
  workOrder: WorkOrder;
}

const ExportPDFButton = ({ workOrder }: Props) => {
  return (
    <PDFDownloadLink
      document={
        <WorkOrderPDF workOrder={workOrder} tasks={workOrder.activities} />
      }
      fileName="pdf.pdf"
    >
      {({ blob, url, loading, error }) => (
        <Button disabled={loading} style={{ width: '100%' }}>
          {loading && <Spinner />}
          <DownloadIcon />
          Exportar PDF
        </Button>
      )}
    </PDFDownloadLink>

    // <PDFViewer>
    //   <WorkOrderPDF workOrder={workOrder} tasks={workOrder.activities} />
    // </PDFViewer>
  );
};

export default ExportPDFButton;
