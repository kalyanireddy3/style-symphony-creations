
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { TimelineUpdate } from "@/types";

interface TimelineProps {
  updates: TimelineUpdate[];
  isDesigner?: boolean;
  onAddUpdate?: (status: TimelineUpdate['status'], message: string) => void;
}

const Timeline = ({ updates, isDesigner = false }: TimelineProps) => {
  const sortedUpdates = [...updates].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const getStatusDetails = (status: TimelineUpdate['status']) => {
    switch(status) {
      case 'design':
        return { 
          label: 'Design Complete', 
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          description: 'The design phase is complete.'
        };
      case 'material':
        return { 
          label: 'Materials Selected', 
          color: 'bg-indigo-100 text-indigo-800 border-indigo-200',
          description: 'All materials have been selected and procured.'
        };
      case 'production':
        return { 
          label: 'Production Started', 
          color: 'bg-purple-100 text-purple-800 border-purple-200',
          description: 'Your item is now in production.'
        };
      case 'quality':
        return { 
          label: 'Quality Check', 
          color: 'bg-amber-100 text-amber-800 border-amber-200',
          description: 'Quality inspection is complete.'
        };
      case 'shipping':
        return { 
          label: 'Shipped', 
          color: 'bg-green-100 text-green-800 border-green-200',
          description: 'Your item has been shipped.'
        };
      case 'delivered':
        return { 
          label: 'Delivered', 
          color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          description: 'Your item has been delivered.'
        };
      default:
        return { 
          label: 'Update', 
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          description: 'Status update.'
        };
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-serif font-medium">Project Timeline</h3>
      
      {sortedUpdates.length > 0 ? (
        <ol className="relative border-l border-gray-200">
          {sortedUpdates.map((update, index) => {
            const { label, color, description } = getStatusDetails(update.status);
            
            return (
              <li key={update.id} className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-fashion-purple-light rounded-full -left-3 ring-8 ring-white">
                  <span className="text-xs text-fashion-purple-dark">{index + 1}</span>
                </span>
                <div className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={color}>{label}</Badge>
                    <time className="text-xs text-gray-500">{formatDate(update.timestamp)}</time>
                  </div>
                  <p className="text-sm text-gray-700">{update.message || description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      ) : (
        <div className="p-6 text-center border border-dashed rounded-lg">
          <p className="text-gray-500">No updates yet. The timeline will be updated as the project progresses.</p>
        </div>
      )}
    </div>
  );
};

export default Timeline;
