
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TimelineUpdate } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

type StatusOption = {
  value: TimelineUpdate['status'];
  label: string;
};

const statusOptions: StatusOption[] = [
  { value: 'design', label: 'Design Complete' },
  { value: 'material', label: 'Materials Selected' },
  { value: 'production', label: 'Production Started' },
  { value: 'quality', label: 'Quality Check Complete' },
  { value: 'shipping', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' }
];

interface TimelineUpdateFormProps {
  onSubmit: (status: TimelineUpdate['status'], message: string) => void;
  existingStatuses: TimelineUpdate['status'][];
}

const TimelineUpdateForm = ({ onSubmit, existingStatuses }: TimelineUpdateFormProps) => {
  const [status, setStatus] = useState<TimelineUpdate['status'] | ''>('');
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!status) {
      toast({
        title: "Missing status",
        description: "Please select a status for this update.",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(status, message);
    setStatus('');
    setMessage('');
  };

  // Filter out statuses that have already been posted
  const availableStatusOptions = statusOptions.filter(
    option => !existingStatuses.includes(option.value)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-serif">Add Timeline Update</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status Update *</Label>
            <Select 
              value={status} 
              onValueChange={(value) => setStatus(value as TimelineUpdate['status'])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {availableStatusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea 
              id="message" 
              placeholder="Add details about this update..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          
          <Button type="submit" className="w-full bg-fashion-purple hover:bg-fashion-purple-dark">
            Post Update
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TimelineUpdateForm;
