
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Save } from "lucide-react";

const CompanySettings = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: "Wonkru Digital",
    tagline: "Empowering Businesses with Digital Solutions",
    logoUrl: "/placeholder.svg",
    faviconUrl: "/favicon.ico",
    aboutCompany: "Wonkru Digital is a cutting-edge digital agency specializing in web development, mobile applications, and digital marketing. We work with businesses of all sizes to create innovative digital solutions."
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Settings saved",
        description: "Company profile has been updated successfully",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Company Profile</h1>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Manage your company's basic information that appears across your website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="companyName" className="text-sm font-medium">Company Name</label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                placeholder="Your company name"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="tagline" className="text-sm font-medium">Tagline</label>
              <Input
                id="tagline"
                value={formData.tagline}
                onChange={handleInputChange}
                placeholder="A short description of your company"
              />
              <p className="text-xs text-muted-foreground">
                This appears in various places on your website, including the homepage
              </p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="aboutCompany" className="text-sm font-medium">About Company</label>
              <Textarea
                id="aboutCompany"
                value={formData.aboutCompany}
                onChange={handleInputChange}
                placeholder="A detailed description of your company"
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                This is used on the About page and in other places where a longer description is needed
              </p>
            </div>
            
            <Separator />
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="logoUrl" className="text-sm font-medium">Logo URL</label>
                <div className="flex gap-4 items-start">
                  <div className="flex-1">
                    <Input
                      id="logoUrl"
                      value={formData.logoUrl}
                      onChange={handleInputChange}
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                  <div className="w-16 h-16 border rounded-md flex items-center justify-center bg-gray-50">
                    <img 
                      src={formData.logoUrl} 
                      alt="Company logo" 
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your primary logo that appears in the header and footer
                </p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="faviconUrl" className="text-sm font-medium">Favicon URL</label>
                <div className="flex gap-4 items-start">
                  <div className="flex-1">
                    <Input
                      id="faviconUrl"
                      value={formData.faviconUrl}
                      onChange={handleInputChange}
                      placeholder="https://example.com/favicon.ico"
                    />
                  </div>
                  <div className="w-16 h-16 border rounded-md flex items-center justify-center bg-gray-50">
                    <img 
                      src={formData.faviconUrl} 
                      alt="Favicon" 
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/favicon.ico";
                      }}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  The small icon that appears in browser tabs
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6">
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default CompanySettings;
