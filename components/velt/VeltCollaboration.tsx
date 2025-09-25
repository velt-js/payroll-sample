import { VeltComments, VeltCommentsSidebar } from '@veltdev/react';
import VeltInitializeUser from './VeltInitializeUser';
import VeltInitializeDocument from './VeltInitializeDocument';
import VeltCustomization from './ui-customization/VeltCustomization';
import './velt.css';
// [VELT] Installs Velt's root feature components with config, authenticates the user, initializes the document.

export const VeltCollaboration = () => {
  const groupConfig = {
    enable: false,
  };
  return (
    <>
      <VeltInitializeUser />
      <VeltInitializeDocument />
      <VeltComments
        allowedFileTypes={['svg']}
        recordings="audio"
        ghostCommentsIndicator={false}
        deleteOnBackspace={false}
        popoverMode={true}
        commentPinHighlighter={false}
        dialogOnHover={false}
        popoverTriangleComponent={true}
        textMode={false}
        enterKeyToSubmit={true}
        shadowDom={false}
        priority={true}
      />

<VeltCommentsSidebar groupConfig={groupConfig} />
      <VeltCustomization />
    </>
  );
};
