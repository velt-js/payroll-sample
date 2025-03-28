import { VeltCommentBubbleWireframe, VeltIf } from '@veltdev/react';
import { MessageSquare } from 'lucide-react';

const VeltCommentBubbleWf = () => {
  return (
    <VeltCommentBubbleWireframe>
      <div className="w-full h-full flex justify-end items-end p-2">
        <button 
          className="flex items-center justify-center bg-black/70 hover:bg-black/90 rounded-full text-white shadow-md transition-colors min-w-8 h-8 px-2"
          aria-label="View comments"
        >
          <VeltIf condition="{commentAnnotation.comments.length} > 0">
            <div className="flex items-center gap-1 text-xs">
              <VeltCommentBubbleWireframe.CommentsCount />
              <MessageSquare className="w-4 h-4 flex-shrink-0" />
            </div>
          </VeltIf>

          <VeltIf condition="{commentAnnotation.comments.length} === 0">
            <MessageSquare className="w-5 h-5" />
          </VeltIf>
        </button>
      </div>
    </VeltCommentBubbleWireframe>
  );
};

export default VeltCommentBubbleWf;