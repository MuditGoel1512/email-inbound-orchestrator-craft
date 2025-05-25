
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, User, Mail, Globe, Github } from 'lucide-react';
import { toast } from "sonner";

export const SubmissionTemplate: React.FC = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    projectUrl: '',
    githubUrl: '',
    authorName: '',
    authorEmail: '',
    technologies: '',
    features: '',
    challenges: '',
    futureEnhancements: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Validate required fields
    const requiredFields = ['projectName', 'projectDescription', 'authorName', 'authorEmail'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Submission template completed! Ready for submission.");
    console.log("Submission data:", formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
            <FileText className="h-6 w-6 text-blue-600" />
            <span>Postmark Hackathon Submission Template</span>
          </CardTitle>
          <p className="text-gray-600">
            Complete this template to submit your Postmark inbound email parsing application
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Project Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Project Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="project-name" className="text-sm font-medium text-gray-700">
                  Project Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="project-name"
                  placeholder="Enter your project name"
                  value={formData.projectName}
                  onChange={(e) => handleInputChange('projectName', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="project-url" className="text-sm font-medium text-gray-700">
                  Live Project URL
                </Label>
                <Input
                  id="project-url"
                  placeholder="https://your-project.com"
                  value={formData.projectUrl}
                  onChange={(e) => handleInputChange('projectUrl', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="project-description" className="text-sm font-medium text-gray-700">
                Project Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="project-description"
                placeholder="Describe your project, its purpose, and how it uses Postmark's inbound email parsing..."
                value={formData.projectDescription}
                onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                className="mt-1 min-h-32"
              />
            </div>

            <div>
              <Label htmlFor="github-url" className="text-sm font-medium text-gray-700">
                GitHub Repository URL
              </Label>
              <Input
                id="github-url"
                placeholder="https://github.com/username/repository"
                value={formData.githubUrl}
                onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          {/* Author Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Author Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="author-name" className="text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="author-name"
                  placeholder="Enter your full name"
                  value={formData.authorName}
                  onChange={(e) => handleInputChange('authorName', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="author-email" className="text-sm font-medium text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="author-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.authorEmail}
                  onChange={(e) => handleInputChange('authorEmail', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Technical Details</h3>
            
            <div>
              <Label htmlFor="technologies" className="text-sm font-medium text-gray-700">
                Technologies Used
              </Label>
              <Input
                id="technologies"
                placeholder="React, TypeScript, Postmark, Tailwind CSS, etc."
                value={formData.technologies}
                onChange={(e) => handleInputChange('technologies', e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="features" className="text-sm font-medium text-gray-700">
                Key Features
              </Label>
              <Textarea
                id="features"
                placeholder="List the main features of your application..."
                value={formData.features}
                onChange={(e) => handleInputChange('features', e.target.value)}
                className="mt-1 min-h-24"
              />
            </div>

            <div>
              <Label htmlFor="challenges" className="text-sm font-medium text-gray-700">
                Challenges Faced & Solutions
              </Label>
              <Textarea
                id="challenges"
                placeholder="Describe any challenges you encountered and how you solved them..."
                value={formData.challenges}
                onChange={(e) => handleInputChange('challenges', e.target.value)}
                className="mt-1 min-h-24"
              />
            </div>

            <div>
              <Label htmlFor="future-enhancements" className="text-sm font-medium text-gray-700">
                Future Enhancements
              </Label>
              <Textarea
                id="future-enhancements"
                placeholder="What would you add or improve in future versions?"
                value={formData.futureEnhancements}
                onChange={(e) => handleInputChange('futureEnhancements', e.target.value)}
                className="mt-1 min-h-24"
              />
            </div>
          </div>

          {/* Postmark Integration Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Postmark Integration</h3>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-medium text-blue-900 mb-2">Required Information</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
                <li>How your application receives and processes inbound emails</li>
                <li>Email parsing logic and categorization system</li>
                <li>Integration with Postmark's webhook system</li>
                <li>Data visualization and user interface design</li>
                <li>Real-time email processing capabilities</li>
              </ul>
            </div>
          </div>

          {/* Submission Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
            <Button onClick={handleSubmit} className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Upload className="h-4 w-4 mr-2" />
              Complete Submission Template
            </Button>
            <Button variant="outline" className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Save as Draft
            </Button>
          </div>

          {/* Submission Checklist */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Submission Checklist</h4>
            <div className="space-y-2">
              {[
                'Project demonstrates Postmark inbound email parsing',
                'Code is well-documented and organized',
                'Application includes real-time email processing',
                'User interface is intuitive and responsive',
                'Technical documentation is complete'
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
