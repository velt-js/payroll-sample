import { VeltCommentToolWireframe } from '@veltdev/react';
import { MessageSquare } from 'lucide-react';

const VeltCommentToolWf = () => {
  return (
    <VeltCommentToolWireframe>
      <div className="w-full h-full flex justify-end items-end p-2">
        <button 
          className="flex items-center justify-center bg-black/70 hover:bg-black/90 rounded-full text-white shadow-md transition-colors min-w-8 h-8 px-2"
          aria-label="Add comment"
        >
          <MessageSquare className="w-4 h-4 flex-shrink-0" />
        </button>
      </div>
    </VeltCommentToolWireframe>
  );
};

export default VeltCommentToolWf;