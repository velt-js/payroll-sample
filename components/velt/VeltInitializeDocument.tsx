import { useSetDocuments, useVeltClient } from '@veltdev/react';
import { useEffect, useMemo } from 'react';

// [VELT] Initializes the Velt document when the photo details page is loaded.
export default function VeltInitializeDocument() {
  const { setDocuments } = useSetDocuments();
  const document = useMemo(() => [
    {
      id: 'payroll-review',
      metadata: {
        documentName: 'Payroll: Jan 1-15, 2022'
      }
    },
  ], []);

  // Initialize the document. Document == payroll instance.
  useEffect(() => {
    if (setDocuments && document) {
      console.log('setting documents', document);
      setDocuments(document);
    }
  }, [setDocuments, document]);

  return null;
}
