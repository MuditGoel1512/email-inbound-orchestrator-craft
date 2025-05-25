
import React, { useState, useEffect } from 'react';
import { EmailDashboard } from '@/components/EmailDashboard';
import { EmailList } from '@/components/EmailList';
import { EmailViewer } from '@/components/EmailViewer';
import { StatsCards } from '@/components/StatsCards';
import { Mail, Inbox, Send, Archive } from 'lucide-react';
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

const Index = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Simulate receiving emails through Postmark webhook
  useEffect(() => {
    const simulateIncomingEmail = () => {
      const sampleEmails: Omit<Email, 'id' | 'timestamp'>[] = [
        {
          from: "customer@example.com",
          to: "support@yourapp.com",
          subject: "Help with order #12345",
          body: "I need assistance with my recent order. The tracking shows it's delayed.",
          category: 'support',
          read: false,
          attachments: ["receipt.pdf"]
        },
        {
          from: "lead@company.com",
          to: "sales@yourapp.com",
          subject: "Interested in enterprise plan",
          body: "We're looking for a solution for our 500+ employee company. Can we schedule a demo?",
          category: 'sales',
          read: false
        },
        {
          from: "newsletter@partner.com",
          to: "marketing@yourapp.com",
          subject: "Partnership opportunity",
          body: "We'd love to explore a marketing partnership with your team.",
          category: 'marketing',
          read: false
        }
      ];

      const newEmail: Email = {
        ...sampleEmails[Math.floor(Math.random() * sampleEmails.length)],
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString()
      };

      setEmails(prev => [newEmail, ...prev]);
      toast.success(`New email received: ${newEmail.subject}`);
    };

    // Simulate emails coming in every 10 seconds when connected
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(simulateIncomingEmail, 10000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isConnected]);

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    // Mark as read
    setEmails(prev => 
      prev.map(e => e.id === email.id ? { ...e, read: true } : e)
    );
  };

  const handleConnect = () => {
    setIsConnected(true);
    toast.success("Connected to Postmark! Monitoring for incoming emails...");
  };

  const stats = {
    total: emails.length,
    unread: emails.filter(e => !e.read).length,
    support: emails.filter(e => e.category === 'support').length,
    sales: emails.filter(e => e.category === 'sales').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Postmark Email Parser</h1>
                <p className="text-sm text-gray-500">Intelligent email processing</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                isConnected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  isConnected ? 'bg-green-500' : 'bg-gray-400'
                }`} />
                <span className="text-sm font-medium">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              {!isConnected && (
                <button
                  onClick={handleConnect}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
                >
                  Connect to Postmark
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <StatsCards stats={stats} />
        
        {/* Email Dashboard */}
        <EmailDashboard emails={emails} />

        {/* Main Content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Email List */}
          <div className="lg:col-span-1">
            <EmailList 
              emails={emails} 
              onEmailClick={handleEmailClick}
              selectedEmailId={selectedEmail?.id}
            />
          </div>
          
          {/* Email Viewer */}
          <div className="lg:col-span-2">
            <EmailViewer email={selectedEmail} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
