
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, MailOpen, Paperclip, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

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

interface EmailListProps {
  emails: Email[];
  onEmailClick: (email: Email) => void;
  selectedEmailId?: string;
}

export const EmailList: React.FC<EmailListProps> = ({ emails, onEmailClick, selectedEmailId }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'support': return 'bg-blue-100 text-blue-800';
      case 'sales': return 'bg-purple-100 text-purple-800';
      case 'marketing': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Mail className="h-5 w-5" />
          <span>Inbox ({emails.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          {emails.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No emails yet. Connect to Postmark to start receiving emails!</p>
            </div>
          ) : (
            <div className="space-y-1">
              {emails.map((email) => (
                <div
                  key={email.id}
                  onClick={() => onEmailClick(email)}
                  className={`p-4 cursor-pointer transition-all duration-200 hover:bg-blue-50 border-l-4 ${
                    selectedEmailId === email.id 
                      ? 'bg-blue-50 border-l-blue-500' 
                      : email.read 
                        ? 'border-l-transparent hover:border-l-blue-300' 
                        : 'border-l-orange-400 bg-orange-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between space-x-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        {email.read ? (
                          <MailOpen className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Mail className="h-4 w-4 text-orange-500" />
                        )}
                        <p className={`text-sm truncate ${
                          email.read ? 'text-gray-600' : 'text-gray-900 font-medium'
                        }`}>
                          {email.from}
                        </p>
                      </div>
                      <p className={`text-sm truncate mb-1 ${
                        email.read ? 'text-gray-600' : 'text-gray-900 font-medium'
                      }`}>
                        {email.subject}
                      </p>
                      <p className="text-xs text-gray-500 truncate mb-2">
                        {email.body.substring(0, 60)}...
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge className={`text-xs ${getCategoryColor(email.category)}`}>
                          {email.category}
                        </Badge>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          {email.attachments && email.attachments.length > 0 && (
                            <Paperclip className="h-3 w-3" />
                          )}
                          <Clock className="h-3 w-3" />
                          <span>{formatDistanceToNow(new Date(email.timestamp), { addSuffix: true })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
