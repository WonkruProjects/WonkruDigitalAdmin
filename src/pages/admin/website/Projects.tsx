
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash, X, Eye } from "lucide-react";

// Mock data for project categories and technologies
const availableCategories = [
  "Web Development", "Mobile App", "E-commerce", "CRM", "Healthcare", "Finance"
];

const availableTechnologies = [
  "React", "Angular", "Vue", "NodeJS", "Python", "Django", "React Native", "Flutter", 
  "WordPress", "Laravel", "PHP", "MongoDB", "MySQL", "PostgreSQL"
];

type Project = {
  id: number;
  logo: string;
  title: string;
  subtitle: string;
  description: string;
  categories: string[];
  technologies: string[];
  caseStudy: string;
};

const Projects = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      logo: "/placeholder.svg",
      title: "E-commerce Platform",
      subtitle: "Modern online shopping experience",
      description: "A fully responsive e-commerce platform with advanced search and recommendation system.",
      categories: ["E-commerce", "Web Development"],
      technologies: ["React", "NodeJS", "MongoDB"],
      caseStudy: "<h2>E-commerce Platform Case Study</h2><p>This project involved creating a modern e-commerce platform...</p>"
    },
    {
      id: 2,
      logo: "/placeholder.svg",
      title: "Healthcare Management System",
      subtitle: "Streamlining patient care",
      description: "An integrated solution for healthcare providers to manage patient records and appointments.",
      categories: ["Healthcare", "CRM"],
      technologies: ["Angular", "Python", "PostgreSQL"],
      caseStudy: "<h2>Healthcare Management System Case Study</h2><p>We developed a comprehensive healthcare management system...</p>"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    logo: "",
    title: "",
    subtitle: "",
    description: "",
    categories: [] as string[],
    technologies: [] as string[],
    caseStudy: ""
  });

  const resetForm = () => {
    setFormData({
      logo: "",
      title: "",
      subtitle: "",
      description: "",
      categories: [],
      technologies: [],
      caseStudy: ""
    });
  };

  const handleOpenAddDialog = () => {
    resetForm();
    setCurrentProject(null);
    setIsViewMode(false);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (project: Project) => {
    setFormData({
      logo: project.logo,
      title: project.title,
      subtitle: project.subtitle,
      description: project.description,
      categories: [...project.categories],
      technologies: [...project.technologies],
      caseStudy: project.caseStudy
    });
    setCurrentProject(project);
    setIsViewMode(false);
    setIsDialogOpen(true);
  };

  const handleOpenViewDialog = (project: Project) => {
    setFormData({
      logo: project.logo,
      title: project.title,
      subtitle: project.subtitle,
      description: project.description,
      categories: [...project.categories],
      technologies: [...project.technologies],
      caseStudy: project.caseStudy
    });
    setCurrentProject(project);
    setIsViewMode(true);
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

  const handleAddCategory = (category: string) => {
    if (!formData.categories.includes(category)) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, category]
      }));
    }
  };

  const handleRemoveCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(cat => cat !== category)
    }));
  };

  const handleAddTechnology = (technology: string) => {
    if (!formData.technologies.includes(technology)) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, technology]
      }));
    }
  };

  const handleRemoveTechnology = (technology: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech !== technology)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.logo || !formData.title || !formData.subtitle || !formData.description || 
        formData.categories.length === 0 || formData.technologies.length === 0) {
      toast({
        title: "Form error",
        description: "Please fill in all fields and select at least one category and technology",
        variant: "destructive",
      });
      return;
    }
    
    if (currentProject) {
      // Update existing project
      const updatedProjects = projects.map(project => 
        project.id === currentProject.id 
          ? { ...project, ...formData } 
          : project
      );
      setProjects(updatedProjects);
      toast({
        title: "Project updated",
        description: `${formData.title} has been updated successfully`,
      });
    } else {
      // Add new project
      const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
      const newProject: Project = {
        id: newId,
        ...formData
      };
      setProjects([...projects, newProject]);
      toast({
        title: "Project added",
        description: `${formData.title} has been added successfully`,
      });
    }
    
    handleCloseDialog();
  };

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
    toast({
      title: "Project removed",
      description: "Project has been removed successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Featured Projects</h1>
        <Button onClick={handleOpenAddDialog}>
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Projects</CardTitle>
          <CardDescription>Add, edit, or remove featured projects</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Logo</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>Technologies</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <img src={project.logo} alt={project.title} className="w-12 h-12 object-contain" />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{project.title}</div>
                    <div className="text-sm text-muted-foreground">{project.subtitle}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {project.categories.map(category => (
                        <Badge key={category} variant="outline" className="bg-primary/10">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map(tech => (
                        <Badge key={tech} variant="secondary" className="bg-secondary/50">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleOpenViewDialog(project)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleOpenEditDialog(project)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteProject(project.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {projects.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No projects added yet. Click 'Add Project' to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isViewMode ? "View Project" : currentProject ? "Edit Project" : "Add New Project"}
            </DialogTitle>
            <DialogDescription>
              {isViewMode 
                ? "Project details and case study"
                : currentProject 
                  ? "Update the details of the selected project"
                  : "Fill in the details to add a new project"}
            </DialogDescription>
          </DialogHeader>
          {isViewMode ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Logo</h3>
                  <img src={formData.logo} alt={formData.title} className="w-32 h-32 object-contain border rounded-md" />
                </div>
                <div>
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-1">Title</h3>
                    <div className="text-lg font-semibold">{formData.title}</div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-1">Subtitle</h3>
                    <div>{formData.subtitle}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Description</h3>
                <div className="border rounded-md p-3 bg-gray-50">{formData.description}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-1">
                    {formData.categories.map(category => (
                      <Badge key={category} variant="outline" className="bg-primary/10">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-1">
                    {formData.technologies.map(tech => (
                      <Badge key={tech} variant="secondary" className="bg-secondary/50">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Case Study</h3>
                <div className="border rounded-md p-4 bg-gray-50">
                  <div dangerouslySetInnerHTML={{ __html: formData.caseStudy }} />
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo URL</Label>
                  <Input
                    id="logo"
                    value={formData.logo}
                    onChange={handleInputChange}
                    placeholder="https://example.com/logo.png"
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Project Title"
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    placeholder="Brief project subtitle"
                    disabled={isViewMode}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Project description..."
                    rows={3}
                    disabled={isViewMode}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Categories</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.categories.map(category => (
                      <Badge key={category} className="flex items-center gap-1 bg-primary/10">
                        {category}
                        <button 
                          type="button" 
                          onClick={() => handleRemoveCategory(category)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <Select onValueChange={handleAddCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCategories
                        .filter(cat => !formData.categories.includes(cat))
                        .map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Technologies</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.technologies.map(tech => (
                      <Badge key={tech} variant="secondary" className="flex items-center gap-1 bg-secondary/50">
                        {tech}
                        <button 
                          type="button" 
                          onClick={() => handleRemoveTechnology(tech)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <Select onValueChange={handleAddTechnology}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select technology" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTechnologies
                        .filter(tech => !formData.technologies.includes(tech))
                        .map(technology => (
                          <SelectItem key={technology} value={technology}>
                            {technology}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="caseStudy">Case Study (HTML)</Label>
                  <Textarea
                    id="caseStudy"
                    value={formData.caseStudy}
                    onChange={handleInputChange}
                    placeholder="<h2>Case Study</h2><p>Enter HTML content here...</p>"
                    rows={8}
                    disabled={isViewMode}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button type="submit">
                  {currentProject ? "Update Project" : "Add Project"}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Projects;
