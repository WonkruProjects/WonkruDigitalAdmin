
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { 
  Save, 
  Palette, 
  Eye
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const ThemeSettings = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    primaryColor: "#6366f1",
    secondaryColor: "#818cf8",
    accentColor: "#4f46e5",
    textColor: "#1f2937",
    backgroundColor: "#ffffff",
    headerBgColor: "#111827",
    footerBgColor: "#111827",
    buttonRadius: "6",
    fontPrimary: "Inter",
    fontSecondary: "Roboto"
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
        description: "Theme settings have been updated successfully",
      });
    }, 1000);
  };

  const previewStyles = {
    container: {
      backgroundColor: formData.backgroundColor,
      color: formData.textColor,
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
    },
    header: {
      backgroundColor: formData.headerBgColor,
      color: "#ffffff",
      padding: "15px",
      borderRadius: "8px 8px 0 0"
    },
    body: {
      padding: "15px",
    },
    footer: {
      backgroundColor: formData.footerBgColor,
      color: "#ffffff",
      padding: "15px",
      borderRadius: "0 0 8px 8px"
    },
    primaryButton: {
      backgroundColor: formData.primaryColor,
      color: "#ffffff",
      border: "none",
      padding: "8px 16px",
      borderRadius: `${formData.buttonRadius}px`,
      marginRight: "10px"
    },
    secondaryButton: {
      backgroundColor: formData.secondaryColor,
      color: "#ffffff",
      border: "none",
      padding: "8px 16px",
      borderRadius: `${formData.buttonRadius}px`
    },
    accentText: {
      color: formData.accentColor,
      fontWeight: "bold"
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Theme Settings</h1>
      </div>
      
      <Tabs defaultValue="settings">
        <TabsList className="mb-4">
          <TabsTrigger value="settings">Theme Settings</TabsTrigger>
          <TabsTrigger value="preview">Live Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="settings">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Website Theme Configuration</CardTitle>
                <CardDescription>
                  Customize the colors, fonts, and style of your website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Colors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="primaryColor" className="text-sm font-medium flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: formData.primaryColor }}></div>
                        Primary Color
                      </label>
                      <Input
                        id="primaryColor"
                        type="color"
                        value={formData.primaryColor}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="secondaryColor" className="text-sm font-medium flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: formData.secondaryColor }}></div>
                        Secondary Color
                      </label>
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={formData.secondaryColor}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="accentColor" className="text-sm font-medium flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: formData.accentColor }}></div>
                        Accent Color
                      </label>
                      <Input
                        id="accentColor"
                        type="color"
                        value={formData.accentColor}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="textColor" className="text-sm font-medium flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: formData.textColor }}></div>
                        Text Color
                      </label>
                      <Input
                        id="textColor"
                        type="color"
                        value={formData.textColor}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="backgroundColor" className="text-sm font-medium flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: formData.backgroundColor }}></div>
                        Background Color
                      </label>
                      <Input
                        id="backgroundColor"
                        type="color"
                        value={formData.backgroundColor}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="headerBgColor" className="text-sm font-medium flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: formData.headerBgColor }}></div>
                        Header Background
                      </label>
                      <Input
                        id="headerBgColor"
                        type="color"
                        value={formData.headerBgColor}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="footerBgColor" className="text-sm font-medium flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: formData.footerBgColor }}></div>
                        Footer Background
                      </label>
                      <Input
                        id="footerBgColor"
                        type="color"
                        value={formData.footerBgColor}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Typography & Style</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="fontPrimary" className="text-sm font-medium">Primary Font</label>
                      <Input
                        id="fontPrimary"
                        value={formData.fontPrimary}
                        onChange={handleInputChange}
                        placeholder="e.g., Inter"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="fontSecondary" className="text-sm font-medium">Secondary Font</label>
                      <Input
                        id="fontSecondary"
                        value={formData.fontSecondary}
                        onChange={handleInputChange}
                        placeholder="e.g., Roboto"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="buttonRadius" className="text-sm font-medium">Button Radius (px)</label>
                      <Input
                        id="buttonRadius"
                        type="number"
                        min="0"
                        max="20"
                        value={formData.buttonRadius}
                        onChange={handleInputChange}
                      />
                    </div>
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
        </TabsContent>
        
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Theme Preview
              </CardTitle>
              <CardDescription>
                This is how your website will look with the current theme settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div style={previewStyles.container}>
                <div style={previewStyles.header}>
                  <h2 style={{ fontFamily: formData.fontPrimary }}>Wonkru Digital</h2>
                </div>
                <div style={previewStyles.body}>
                  <h3 style={{ fontFamily: formData.fontPrimary, color: formData.textColor }}>Welcome to our website</h3>
                  <p style={{ fontFamily: formData.fontSecondary }}>
                    This is a preview of your website with the selected theme settings.
                    Check how <span style={previewStyles.accentText}>highlighted text</span> and other elements look.
                  </p>
                  <div className="mt-4">
                    <button style={previewStyles.primaryButton}>Primary Button</button>
                    <button style={previewStyles.secondaryButton}>Secondary Button</button>
                  </div>
                </div>
                <div style={previewStyles.footer}>
                  <p style={{ fontFamily: formData.fontSecondary }}>© 2025 Wonkru Digital. All rights reserved.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ThemeSettings;
