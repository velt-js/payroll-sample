import { useNotificationUtils, useSetDocuments, useVeltClient, useVeltEventCallback } from '@veltdev/react';
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

  // const documentInitEvent = useVeltEventCallback('documentInit');
  // console.log('debug: documentInit', documentInitEvent);

  // const notificationElement = useNotificationUtils();
  // useEffect(() => {
  //   if (notificationElement && documentInitEvent) {
  //     notificationElement?.setSettingsInitialConfig([
  //       {
  //         name: 'Inbox',
  //         id: 'inbox',
  //         default: 'MINE',
  //         enable: true,
  //         values: [
  //           {
  //             name: 'All',
  //             id: 'ALL',
  //           },
  //           {
  //             name: 'Only Involved',
  //             id: 'MINE',
  //           },
  //           {
  //             name: 'None',
  //             id: 'NONE',
  //           }
  //         ]
  //       },
  //       {
  //         name: 'Slack',
  //         id: 'slack',
  //         default: 'MINE',
  //         enable: true,
  //         values: [
  //           {
  //             name: 'All',
  //             id: 'ALL',
  //           },
  //           {
  //             name: 'Only Involved',
  //             id: 'MINE',
  //           },
  //           {
  //             name: 'None',
  //             id: 'NONE',
  //           }
  //         ]
  //       },
  //       {
  //         name: 'Email',
  //         id: 'email',
  //         default: 'MINE',
  //         enable: true,
  //         values: [
  //           {
  //             name: 'All',
  //             id: 'ALL',
  //           },
  //           {
  //             name: 'Only Involved',
  //             id: 'MINE',
  //           },
  //           {
  //             name: 'None',
  //             id: 'NONE',
  //           }
  //         ]
  //       },
  //     ]);
  //   }
  // }, [notificationElement, documentInitEvent]);

  return null;
}
