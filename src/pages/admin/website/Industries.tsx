
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash } from "lucide-react";

type Industry = {
  id: number;
  logo: string;
  title: string;
  subtitle: string;
  description: string;
};

const Industries = () => {
  const { toast } = useToast();
  const [industries, setIndustries] = useState<Industry[]>([
    {
      id: 1,
      logo: "/placeholder.svg",
      title: "Healthcare",
      subtitle: "Digital solutions for healthcare providers",
      description: "We help healthcare organizations modernize their IT infrastructure and improve patient care through innovative technology solutions."
    },
    {
      id: 2,
      logo: "/placeholder.svg",
      title: "Finance",
      subtitle: "Fintech solutions for modern finance",
      description: "Our financial technology solutions help banks, insurance companies and fintech startups deliver secure and efficient services."
    },
    {
      id: 3,
      logo: "/placeholder.svg",
      title: "Education",
      subtitle: "Technology for the future of learning",
      description: "We create digital platforms that enhance the learning experience for students and simplify administrative tasks for educators."
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentIndustry, setCurrentIndustry] = useState<Industry | null>(null);
  const [formData, setFormData] = useState({
    logo: "",
    title: "",
    subtitle: "",
    description: ""
  });

  const resetForm = () => {
    setFormData({
      logo: "",
      title: "",
      subtitle: "",
      description: ""
    });
  };

  const handleOpenAddDialog = () => {
    resetForm();
    setCurrentIndustry(null);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (industry: Industry) => {
    setFormData({
      logo: industry.logo,
      title: industry.title,
      subtitle: industry.subtitle,
      description: industry.description
    });
    setCurrentIndustry(industry);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.logo || !formData.title || !formData.subtitle || !formData.description) {
      toast({
        title: "Form error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (currentIndustry) {
      // Update existing industry
      const updatedIndustries = industries.map(industry => 
        industry.id === currentIndustry.id 
          ? { ...industry, ...formData } 
          : industry
      );
      setIndustries(updatedIndustries);
      toast({
        title: "Industry updated",
        description: `${formData.title} has been updated successfully`,
      });
    } else {
      // Add new industry
      const newId = industries.length > 0 ? Math.max(...industries.map(i => i.id)) + 1 : 1;
      const newIndustry: Industry = {
        id: newId,
        ...formData
      };
      setIndustries([...industries, newIndustry]);
      toast({
        title: "Industry added",
        description: `${formData.title} has been added successfully`,
      });
    }
    
    handleCloseDialog();
  };

  const handleDeleteIndustry = (id: number) => {
    setIndustries(industries.filter(industry => industry.id !== id));
    toast({
      title: "Industry removed",
      description: "Industry has been removed successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Industries We Serve</h1>
        <Button onClick={handleOpenAddDialog}>
          <Plus className="mr-2 h-4 w-4" /> Add Industry
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Industries</CardTitle>
          <CardDescription>Add, edit, or remove industries that your company serves</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Logo</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Subtitle</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {industries.map((industry) => (
                <TableRow key={industry.id}>
                  <TableCell>
                    <img src={industry.logo} alt={industry.title} className="w-12 h-12 object-contain" />
                  </TableCell>
                  <TableCell className="font-medium">{industry.title}</TableCell>
                  <TableCell>{industry.subtitle}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate">{industry.description}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleOpenEditDialog(industry)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteIndustry(industry.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {industries.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No industries added yet. Click 'Add Industry' to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {currentIndustry ? "Edit Industry" : "Add New Industry"}
            </DialogTitle>
            <DialogDescription>
              {currentIndustry 
                ? "Update the details of the selected industry"
                : "Fill in the details to add a new industry"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="logo">Logo URL</Label>
              <Input
                id="logo"
                value={formData.logo}
                onChange={handleInputChange}
                placeholder="https://example.com/logo.png"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Healthcare"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                placeholder="Digital solutions for healthcare providers"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Detailed description of the industry..."
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit">
                {currentIndustry ? "Update Industry" : "Add Industry"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Industries;
