
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Paperclip, Reply, Forward, Archive, Tag } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { toast } from "sonner";

interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  timestamp: string;
  category: 'support' | 'sales' | 'marketing' | 'other';
  read: boolean;
  attachments?: string[];
}

interface EmailViewerProps {
  email: Email | null;
}

export const EmailViewer: React.FC<EmailViewerProps> = ({ email }) => {
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'support': return 'bg-blue-100 text-blue-800';
      case 'sales': return 'bg-purple-100 text-purple-800';
      case 'marketing': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleReply = () => {
    if (!replyText.trim()) return;
    
    // Simulate sending reply
    toast.success("Reply sent successfully!");
    setReplyText('');
    setIsReplying(false);
  };

  const handleAction = (action: string) => {
    toast.success(`Email ${action} successfully!`);
  };

  if (!email) {
    return (
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg h-full">
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center text-gray-500">
            <Mail className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">No email selected</p>
            <p>Select an email from the inbox to view its contents</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between space-x-4">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
              {email.subject}
            </CardTitle>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span><strong>From:</strong> {email.from}</span>
              <span><strong>To:</strong> {email.to}</span>
              <Badge className={getCategoryColor(email.category)}>
                {email.category}
              </Badge>
            </div>
            <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
              <span>{format(new Date(email.timestamp), 'PPpp')}</span>
              <span>•</span>
              <span>{formatDistanceToNow(new Date(email.timestamp), { addSuffix: true })}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Email Body */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
            {email.body}
          </p>
        </div>

        {/* Attachments */}
        {email.attachments && email.attachments.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900 flex items-center space-x-2">
              <Paperclip className="h-4 w-4" />
              <span>Attachments ({email.attachments.length})</span>
            </h4>
            <div className="space-y-2">
              {email.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded border">
                  <Paperclip className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{attachment}</span>
                  <Button variant="outline" size="sm" className="ml-auto">
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-4 border-t">
          <Button 
            onClick={() => setIsReplying(!isReplying)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Reply className="h-4 w-4 mr-2" />
            Reply
          </Button>
          <Button variant="outline" onClick={() => handleAction('forwarded')}>
            <Forward className="h-4 w-4 mr-2" />
            Forward
          </Button>
          <Button variant="outline" onClick={() => handleAction('archived')}>
            <Archive className="h-4 w-4 mr-2" />
            Archive
          </Button>
          <Button variant="outline" onClick={() => handleAction('tagged')}>
            <Tag className="h-4 w-4 mr-2" />
            Tag
          </Button>
        </div>

        {/* Reply Form */}
        {isReplying && (
          <div className="space-y-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-medium text-gray-900">Reply to {email.from}</h4>
            <Textarea
              placeholder="Type your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="min-h-32"
            />
            <div className="flex space-x-2">
              <Button onClick={handleReply} className="bg-blue-600 hover:bg-blue-700">
                Send Reply
              </Button>
              <Button variant="outline" onClick={() => setIsReplying(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
