
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, Globe, Lock, Settings } from 'lucide-react';
import { toast } from "sonner";

export const WebhookSetup: React.FC = () => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [copied, setCopied] = useState(false);

  const exampleWebhookUrl = `${window.location.origin}/api/postmark/webhook`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (!webhookUrl || !apiKey) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Webhook configuration saved!");
  };

  return (
    <div className="space-y-6">
      {/* Setup Instructions */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Postmark Integration Setup</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <h4 className="font-medium text-blue-900 mb-2">Setup Instructions</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
              <li>Log in to your Postmark account</li>
              <li>Navigate to your server's settings</li>
              <li>Go to the "Webhooks" section</li>
              <li>Add a new webhook with the URL below</li>
              <li>Select "Inbound" as the webhook type</li>
              <li>Save your configuration</li>
            </ol>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="webhook-url" className="text-sm font-medium text-gray-700">
                Webhook URL for Postmark
              </Label>
              <div className="mt-1 flex space-x-2">
                <Input
                  id="webhook-url"
                  value={exampleWebhookUrl}
                  readOnly
                  className="bg-gray-50"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(exampleWebhookUrl)}
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Use this URL in your Postmark webhook configuration
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuration Form */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="api-key" className="text-sm font-medium text-gray-700">
              Postmark Server API Token
            </Label>
            <Input
              id="api-key"
              type="password"
              placeholder="Enter your Postmark Server API Token"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Found in your Postmark server settings under "API Tokens"
            </p>
          </div>

          <div>
            <Label htmlFor="custom-webhook" className="text-sm font-medium text-gray-700">
              Custom Webhook URL (Optional)
            </Label>
            <Input
              id="custom-webhook"
              placeholder="https://your-domain.com/webhook"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="mt-1"
            />
          </div>

          <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700">
            Save Configuration
          </Button>
        </CardContent>
      </Card>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Globe className="h-8 w-8 text-green-500" />
              <div>
                <p className="font-medium text-gray-900">Webhook Status</p>
                <Badge className="bg-green-100 text-green-800">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Lock className="h-8 w-8 text-blue-500" />
              <div>
                <p className="font-medium text-gray-900">Security</p>
                <Badge className="bg-blue-100 text-blue-800">Encrypted</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
