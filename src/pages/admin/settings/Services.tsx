
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
  Plus, 
  Trash2, 
  GripVertical, 
  Wrench,
  PencilRuler
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
}

const ServiceSettings = () => {
  const { toast } = useToast();
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([
    { id: "1", name: "Web Development", description: "Custom websites and web applications" },
    { id: "2", name: "Mobile App Development", description: "Native and cross-platform mobile applications" },
    { id: "3", name: "UI/UX Design", description: "User interface and user experience design" },
    { id: "4", name: "Digital Marketing", description: "SEO, PPC, and social media marketing" },
    { id: "5", name: "Cloud Solutions", description: "AWS, Azure, and Google Cloud services" }
  ]);
  const [newCategory, setNewCategory] = useState<Partial<ServiceCategory>>({
    name: "",
    description: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (editingId) {
      setServiceCategories(categories => 
        categories.map(cat => 
          cat.id === editingId ? { ...cat, [id]: value } : cat
        )
      );
    } else {
      setNewCategory({
        ...newCategory,
        [id]: value
      });
    }
  };

  const handleAddCategory = () => {
    if (!newCategory.name || !newCategory.description) {
      toast({
        title: "Validation Error",
        description: "Please provide both a name and description for the new category",
        variant: "destructive"
      });
      return;
    }
    
    const newId = (Math.max(...serviceCategories.map(cat => parseInt(cat.id)), 0) + 1).toString();
    setServiceCategories([
      ...serviceCategories,
      { id: newId, name: newCategory.name!, description: newCategory.description! }
    ]);
    setNewCategory({ name: "", description: "" });
    
    toast({
      title: "Category added",
      description: `"${newCategory.name}" has been added to the list`
    });
  };

  const handleDeleteCategory = (id: string) => {
    setServiceCategories(categories => categories.filter(cat => cat.id !== id));
    
    if (editingId === id) {
      setEditingId(null);
    }
    
    toast({
      title: "Category deleted",
      description: "The service category has been removed"
    });
  };

  const handleEditCategory = (id: string) => {
    if (editingId === id) {
      setEditingId(null);
    } else {
      setEditingId(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setEditingId(null);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Settings saved",
        description: "Service categories have been updated successfully",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center hover:scale-[1.01] transition-transform duration-300">
        <h1 className="text-3xl font-bold tracking-tight hover:text-primary transition-colors duration-300">Service Categories</h1>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card className="mb-6 transition-all duration-300 hover:shadow-lg animate-slide-in">
          <CardHeader className="hover:bg-secondary/10 transition-colors duration-300">
            <CardTitle className="hover:text-primary transition-colors duration-300">Add New Service Category</CardTitle>
            <CardDescription className="hover:text-secondary-foreground transition-colors duration-300">
              Create new service categories for your business
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 hover:scale-[1.02] transition-transform duration-300">
                <label htmlFor="name" className="text-sm font-medium hover:text-primary transition-colors duration-300">Category Name</label>
                <div className="flex gap-2">
                  <Wrench className="h-5 w-5 text-muted-foreground mt-2 hover:text-primary transition-colors duration-300 animate-bounce" />
                  <Input
                    id="name"
                    value={newCategory.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Web Development"
                    className="flex-1 transition-all duration-300 hover:border-primary focus:border-primary"
                  />
                </div>
              </div>
              
              <div className="space-y-2 hover:scale-[1.02] transition-transform duration-300">
                <label htmlFor="description" className="text-sm font-medium hover:text-primary transition-colors duration-300">Category Description</label>
                <div className="flex gap-2">
                  <PencilRuler className="h-5 w-5 text-muted-foreground mt-2 hover:text-primary transition-colors duration-300 animate-bounce" />
                  <Input
                    id="description"
                    value={newCategory.description}
                    onChange={handleInputChange}
                    placeholder="Brief description of the service"
                    className="flex-1 transition-all duration-300 hover:border-primary focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 border-t p-4 hover:bg-secondary/10 transition-colors duration-300">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => setNewCategory({ name: "", description: "" })}
              className="transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Clear
            </Button>
            <Button 
              type="button" 
              onClick={handleAddCategory}
              className="transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-primary/80"
            >
              <Plus className="mr-2 h-4 w-4 animate-pulse" />
              Add Category
            </Button>
          </CardFooter>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg animate-slide-in delay-100">
          <CardHeader className="hover:bg-secondary/10 transition-colors duration-300">
            <CardTitle className="hover:text-primary transition-colors duration-300">Manage Service Categories</CardTitle>
            <CardDescription className="hover:text-secondary-foreground transition-colors duration-300">
              Edit or remove existing service categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table searchable={true}>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10 hover:text-primary transition-colors duration-300">#</TableHead>
                  <TableHead className="hover:text-primary transition-colors duration-300">Name</TableHead>
                  <TableHead className="hover:text-primary transition-colors duration-300">Description</TableHead>
                  <TableHead className="w-[100px] text-right hover:text-primary transition-colors duration-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {serviceCategories.map((category, index) => (
                  <TableRow key={category.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <TableCell className="font-medium hover:text-primary transition-colors duration-300">
                      <div className="flex items-center">
                        <GripVertical className="h-4 w-4 text-muted-foreground mr-2 hover:text-primary transition-colors duration-300 cursor-grab" />
                        {index + 1}
                      </div>
                    </TableCell>
                    <TableCell className="hover:text-primary transition-colors duration-300">
                      {editingId === category.id ? (
                        <Input
                          id="name"
                          value={category.name}
                          onChange={handleInputChange}
                          className="transition-all duration-300 hover:border-primary focus:border-primary"
                        />
                      ) : (
                        <span className="hover:font-medium transition-all duration-300">{category.name}</span>
                      )}
                    </TableCell>
                    <TableCell className="hover:text-primary transition-colors duration-300">
                      {editingId === category.id ? (
                        <Input
                          id="description"
                          value={category.description}
                          onChange={handleInputChange}
                          className="transition-all duration-300 hover:border-primary focus:border-primary"
                        />
                      ) : (
                        <span className="hover:font-medium transition-all duration-300">{category.description}</span>
                      )}
                    </TableCell>
                    <TableCell className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditCategory(category.id)}
                        className="transition-all duration-300 hover:scale-110 hover:bg-secondary/50 active:scale-95"
                      >
                        <PencilRuler className="h-4 w-4 hover:text-primary transition-colors duration-300" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteCategory(category.id)}
                        className="transition-all duration-300 hover:scale-110 hover:bg-destructive/10 active:scale-95"
                      >
                        <Trash2 className="h-4 w-4 text-red-500 hover:text-destructive transition-colors duration-300" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {serviceCategories.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground animate-pulse">
                      No service categories found. Add one above.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-6 hover:bg-secondary/10 transition-colors duration-300">
            <div className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
              Total categories: <span className="font-medium hover:text-primary transition-colors duration-300">{serviceCategories.length}</span>
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

export default ServiceSettings;
