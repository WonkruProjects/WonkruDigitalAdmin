import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Save, Globe, Facebook, Twitter, Linkedin, Instagram, Youtube, Github } from "lucide-react";

const SocialSettings = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    website: "https://wonkrudigital.com",
    facebook: "https://facebook.com/wonkrudigital",
    twitter: "https://twitter.com/wonkrudigital",
    linkedin: "https://linkedin.com/company/wonkrudigital",
    instagram: "https://instagram.com/wonkrudigital",
    youtube: "",
    github: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        description: "Social media links have been updated successfully",
      });
    }, 1000);
  };

  const socialPlatforms = [
    { id: 'website', name: 'Website', icon: <Globe className="h-5 w-5" />, placeholder: 'https://yourwebsite.com' },
    { id: 'facebook', name: 'Facebook', icon: <Facebook className="h-5 w-5" />, placeholder: 'https://facebook.com/yourpage' },
    { id: 'twitter', name: 'Twitter', icon: <Twitter className="h-5 w-5" />, placeholder: 'https://twitter.com/yourhandle' },
    { id: 'linkedin', name: 'LinkedIn', icon: <Linkedin className="h-5 w-5" />, placeholder: 'https://linkedin.com/company/yourcompany' },
    { id: 'instagram', name: 'Instagram', icon: <Instagram className="h-5 w-5" />, placeholder: 'https://instagram.com/yourhandle' },
    { id: 'youtube', name: 'YouTube', icon: <Youtube className="h-5 w-5" />, placeholder: 'https://youtube.com/c/yourchannel' },
    { id: 'github', name: 'GitHub', icon: <Github className="h-5 w-5" />, placeholder: 'https://github.com/yourorganization' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center hover:scale-[1.01] transition-transform duration-300">
        <h1 className="text-3xl font-bold tracking-tight hover:text-primary transition-colors duration-300">Social Media</h1>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card className="transition-all duration-300 hover:shadow-lg animate-slide-in">
          <CardHeader className="hover:bg-secondary/10 transition-colors duration-300">
            <CardTitle className="hover:text-primary transition-colors duration-300">Social Media Links</CardTitle>
            <CardDescription className="hover:text-secondary-foreground transition-colors duration-300">
              Manage your company's social media presence that appears on your website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {socialPlatforms.map((platform, index) => (
              <div key={platform.id} className="space-y-2 hover:scale-[1.02] transition-transform duration-300 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <label htmlFor={platform.id} className="text-sm font-medium hover:text-primary transition-colors duration-300">{platform.name}</label>
                <div className="flex gap-2">
                  <div className="transition-all duration-300 hover:scale-110 hover:text-primary">
                    {React.cloneElement(platform.icon as React.ReactElement, {
                      className: "h-5 w-5 text-muted-foreground hover:text-primary transition-colors duration-300"
                    })}
                  </div>
                  <Input
                    id={platform.id}
                    value={formData[platform.id as keyof typeof formData]}
                    onChange={handleInputChange}
                    placeholder={platform.placeholder}
                    className="flex-1 transition-all duration-300 hover:border-primary focus:border-primary"
                  />
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6 hover:bg-secondary/10 transition-colors duration-300">
            <div className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
              Last updated: <span className="font-medium hover:text-primary transition-colors duration-300">{new Date().toLocaleDateString()}</span>
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-primary/80"
            >
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
                  <Save className="mr-2 h-4 w-4 animate-bounce" />
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

export default SocialSettings;
