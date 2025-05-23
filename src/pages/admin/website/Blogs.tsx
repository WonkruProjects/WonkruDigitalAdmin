
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { useToast } from "@/components/ui/use-toast";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { 
//   Select, 
//   SelectContent, 
//   SelectItem, 
//   SelectTrigger, 
//   SelectValue 
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { Plus, Edit, Trash, Eye, X, Calendar } from "lucide-react";

// const availableCategories = [
//   "Web Development", "Mobile App", "Design", "Technology", "AI", "Security", "Product", "Business"
// ];

// const availableTechnologies = [
//   "React", "Angular", "Vue", "NodeJS", "Python", "Django", "WordPress", "PHP", 
//   "JavaScript", "TypeScript", "Swift", "Kotlin"
// ];

// type Blog = {
//   id: number;
//   logo: string;
//   title: string;
//   description: string;
//   categories: string[];
//   technologies: string[];
//   date: string;
//   readTime: string;
//   writerLogo: string;
//   writerName: string;
//   body: string;
// };

// const Blogs = () => {
//   const { toast } = useToast();
//   const [blogs, setBlogs] = useState<Blog[]>([
//     {
//       id: 1,
//       logo: "/placeholder.svg",
//       title: "The Future of Web Development in 2024",
//       description: "Explore the latest trends and technologies shaping the web development landscape in 2024.",
//       categories: ["Web Development", "Technology"],
//       technologies: ["React", "JavaScript"],
//       date: "2024-03-15",
//       readTime: "5 min read",
//       writerLogo: "/placeholder.svg",
//       writerName: "John Smith",
//       body: "<h2>The Future of Web Development</h2><p>As we move further into 2024, the web development landscape continues to evolve at a rapid pace...</p>"
//     },
//     {
//       id: 2,
//       logo: "/placeholder.svg",
//       title: "Building Secure Mobile Applications",
//       description: "A comprehensive guide to implementing security best practices in your mobile applications.",
//       categories: ["Mobile App", "Security"],
//       technologies: ["React Native", "Swift"],
//       date: "2024-02-22",
//       readTime: "8 min read",
//       writerLogo: "/placeholder.svg",
//       writerName: "Sarah Johnson",
//       body: "<h2>Mobile Application Security</h2><p>With the increasing number of cyber threats, ensuring the security of your mobile applications is more important than ever...</p>"
//     }
//   ]);

//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isViewMode, setIsViewMode] = useState(false);
//   const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
//   const [formData, setFormData] = useState({
//     logo: "",
//     title: "",
//     description: "",
//     categories: [] as string[],
//     technologies: [] as string[],
//     date: new Date().toISOString().split('T')[0],
//     readTime: "",
//     writerLogo: "",
//     writerName: "",
//     body: ""
//   });

//   const resetForm = () => {
//     setFormData({
//       logo: "",
//       title: "",
//       description: "",
//       categories: [],
//       technologies: [],
//       date: new Date().toISOString().split('T')[0],
//       readTime: "",
//       writerLogo: "",
//       writerName: "",
//       body: ""
//     });
//   };

//   const handleOpenAddDialog = () => {
//     resetForm();
//     setCurrentBlog(null);
//     setIsViewMode(false);
//     setIsDialogOpen(true);
//   };

//   const handleOpenEditDialog = (blog: Blog) => {
//     setFormData({
//       logo: blog.logo,
//       title: blog.title,
//       description: blog.description,
//       categories: [...blog.categories],
//       technologies: [...blog.technologies],
//       date: blog.date,
//       readTime: blog.readTime,
//       writerLogo: blog.writerLogo,
//       writerName: blog.writerName,
//       body: blog.body
//     });
//     setCurrentBlog(blog);
//     setIsViewMode(false);
//     setIsDialogOpen(true);
//   };

//   const handleOpenViewDialog = (blog: Blog) => {
//     setFormData({
//       logo: blog.logo,
//       title: blog.title,
//       description: blog.description,
//       categories: [...blog.categories],
//       technologies: [...blog.technologies],
//       date: blog.date,
//       readTime: blog.readTime,
//       writerLogo: blog.writerLogo,
//       writerName: blog.writerName,
//       body: blog.body
//     });
//     setCurrentBlog(blog);
//     setIsViewMode(true);
//     setIsDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setIsDialogOpen(false);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { id, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [id]: value
//     }));
//   };

//   const handleAddCategory = (category: string) => {
//     if (!formData.categories.includes(category)) {
//       setFormData(prev => ({
//         ...prev,
//         categories: [...prev.categories, category]
//       }));
//     }
//   };

//   const handleRemoveCategory = (category: string) => {
//     setFormData(prev => ({
//       ...prev,
//       categories: prev.categories.filter(cat => cat !== category)
//     }));
//   };

//   const handleAddTechnology = (technology: string) => {
//     if (!formData.technologies.includes(technology)) {
//       setFormData(prev => ({
//         ...prev,
//         technologies: [...prev.technologies, technology]
//       }));
//     }
//   };

//   const handleRemoveTechnology = (technology: string) => {
//     setFormData(prev => ({
//       ...prev,
//       technologies: prev.technologies.filter(tech => tech !== technology)
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!formData.logo || !formData.title || !formData.description || 
//         formData.categories.length === 0 || !formData.date || 
//         !formData.readTime || !formData.writerName || !formData.body) {
//       toast({
//         title: "Form error",
//         description: "Please fill in all required fields",
//         variant: "destructive",
//       });
//       return;
//     }
    
//     if (currentBlog) {
//       // Update existing blog
//       const updatedBlogs = blogs.map(blog => 
//         blog.id === currentBlog.id 
//           ? { ...blog, ...formData } 
//           : blog
//       );
//       setBlogs(updatedBlogs);
//       toast({
//         title: "Blog updated",
//         description: `${formData.title} has been updated successfully`,
//       });
//     } else {
//       // Add new blog
//       const newId = blogs.length > 0 ? Math.max(...blogs.map(b => b.id)) + 1 : 1;
//       const newBlog: Blog = {
//         id: newId,
//         ...formData
//       };
//       setBlogs([...blogs, newBlog]);
//       toast({
//         title: "Blog added",
//         description: `${formData.title} has been added successfully`,
//       });
//     }
    
//     handleCloseDialog();
//   };

//   const handleDeleteBlog = (id: number) => {
//     setBlogs(blogs.filter(blog => blog.id !== id));
//     toast({
//       title: "Blog removed",
//       description: "Blog has been removed successfully",
//     });
//   };

//   const formatDate = (dateString: string) => {
//     const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold tracking-tight">Latest Insights</h1>
//         <Button onClick={handleOpenAddDialog}>
//           <Plus className="mr-2 h-4 w-4" /> Add Blog
//         </Button>
//       </div>
      
//       <Card>
//         <CardHeader>
//           <CardTitle>Manage Blog Posts</CardTitle>
//           <CardDescription>Add, edit, or remove blog posts and articles</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Image</TableHead>
//                 <TableHead>Title</TableHead>
//                 <TableHead>Categories</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Author</TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {blogs.map((blog) => (
//                 <TableRow key={blog.id}>
//                   <TableCell>
//                     <img src={blog.logo} alt={blog.title} className="w-16 h-12 object-cover rounded-md" />
//                   </TableCell>
//                   <TableCell>
//                     <div className="font-medium">{blog.title}</div>
//                     <div className="text-sm text-muted-foreground truncate max-w-[200px]">{blog.description}</div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex flex-wrap gap-1">
//                       {blog.categories.map(category => (
//                         <Badge key={category} variant="outline" className="bg-primary/10">
//                           {category}
//                         </Badge>
//                       ))}
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center">
//                       <Calendar className="mr-1 h-3 w-3" /> {formatDate(blog.date)}
//                     </div>
//                     <div className="text-xs text-muted-foreground">{blog.readTime}</div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center">
//                       <img src={blog.writerLogo} alt={blog.writerName} className="w-6 h-6 rounded-full mr-2" />
//                       <span>{blog.writerName}</span>
//                     </div>
//                   </TableCell>
//                   <TableCell className="text-right">
//                     <div className="flex justify-end gap-2">
//                       <Button variant="outline" size="sm" onClick={() => handleOpenViewDialog(blog)}>
//                         <Eye className="h-4 w-4" />
//                       </Button>
//                       <Button variant="outline" size="sm" onClick={() => handleOpenEditDialog(blog)}>
//                         <Edit className="h-4 w-4" />
//                       </Button>
//                       <Button variant="outline" size="sm" onClick={() => handleDeleteBlog(blog.id)}>
//                         <Trash className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//               {blogs.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
//                     No blog posts added yet. Click 'Add Blog' to get started.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle>
//               {isViewMode ? "View Blog Post" : currentBlog ? "Edit Blog Post" : "Add New Blog Post"}
//             </DialogTitle>
//             <DialogDescription>
//               {isViewMode 
//                 ? "Blog post details and content"
//                 : currentBlog 
//                   ? "Update the details of the selected blog post"
//                   : "Fill in the details to add a new blog post"}
//             </DialogDescription>
//           </DialogHeader>
          
//           {isViewMode ? (
//             <div className="space-y-6">
//               <div className="aspect-video relative overflow-hidden rounded-lg">
//                 <img src={formData.logo} alt={formData.title} className="w-full h-full object-cover" />
//               </div>
              
//               <div>
//                 <h2 className="text-2xl font-bold">{formData.title}</h2>
//                 <p className="mt-2 text-muted-foreground">{formData.description}</p>
//               </div>
              
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <img src={formData.writerLogo} alt={formData.writerName} className="w-10 h-10 rounded-full mr-3" />
//                   <div>
//                     <div className="font-medium">{formData.writerName}</div>
//                     <div className="text-sm text-muted-foreground">{formatDate(formData.date)} · {formData.readTime}</div>
//                   </div>
//                 </div>
                
//                 <div className="flex flex-wrap gap-2">
//                   {formData.categories.map(category => (
//                     <Badge key={category} variant="outline" className="bg-primary/10">
//                       {category}
//                     </Badge>
//                   ))}
//                 </div>
//               </div>
              
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {formData.technologies.map(tech => (
//                   <Badge key={tech} variant="secondary" className="bg-secondary/50">
//                     {tech}
//                   </Badge>
//                 ))}
//               </div>
              
//               <div className="border-t pt-4">
//                 <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: formData.body }} />
//               </div>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div className="space-y-2 md:col-span-2">
//                   <Label htmlFor="logo">Featured Image URL</Label>
//                   <Input
//                     id="logo"
//                     value={formData.logo}
//                     onChange={handleInputChange}
//                     placeholder="https://example.com/image.jpg"
//                   />
//                 </div>
                
//                 <div className="space-y-2 md:col-span-2">
//                   <Label htmlFor="title">Title</Label>
//                   <Input
//                     id="title"
//                     value={formData.title}
//                     onChange={handleInputChange}
//                     placeholder="Blog Title"
//                   />
//                 </div>
                
//                 <div className="space-y-2 md:col-span-2">
//                   <Label htmlFor="description">Description / Excerpt</Label>
//                   <Textarea
//                     id="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     placeholder="Brief description of the blog post..."
//                     rows={2}
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label>Categories</Label>
//                   <div className="flex flex-wrap gap-2 mb-2">
//                     {formData.categories.map(category => (
//                       <Badge key={category} className="flex items-center gap-1 bg-primary/10">
//                         {category}
//                         <button 
//                           type="button" 
//                           onClick={() => handleRemoveCategory(category)}
//                           className="text-gray-500 hover:text-gray-700"
//                         >
//                           <X className="h-3 w-3" />
//                         </button>
//                       </Badge>
//                     ))}
//                   </div>
//                   <Select onValueChange={handleAddCategory}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select category" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {availableCategories
//                         .filter(cat => !formData.categories.includes(cat))
//                         .map(category => (
//                           <SelectItem key={category} value={category}>
//                             {category}
//                           </SelectItem>
//                         ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label>Technologies</Label>
//                   <div className="flex flex-wrap gap-2 mb-2">
//                     {formData.technologies.map(tech => (
//                       <Badge key={tech} variant="secondary" className="flex items-center gap-1 bg-secondary/50">
//                         {tech}
//                         <button 
//                           type="button" 
//                           onClick={() => handleRemoveTechnology(tech)}
//                           className="text-gray-500 hover:text-gray-700"
//                         >
//                           <X className="h-3 w-3" />
//                         </button>
//                       </Badge>
//                     ))}
//                   </div>
//                   <Select onValueChange={handleAddTechnology}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select technology" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {availableTechnologies
//                         .filter(tech => !formData.technologies.includes(tech))
//                         .map(technology => (
//                           <SelectItem key={technology} value={technology}>
//                             {technology}
//                           </SelectItem>
//                         ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="date">Publication Date</Label>
//                   <Input
//                     id="date"
//                     type="date"
//                     value={formData.date}
//                     onChange={handleInputChange}
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="readTime">Read Time</Label>
//                   <Input
//                     id="readTime"
//                     value={formData.readTime}
//                     onChange={handleInputChange}
//                     placeholder="5 min read"
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="writerLogo">Writer Avatar URL</Label>
//                   <Input
//                     id="writerLogo"
//                     value={formData.writerLogo}
//                     onChange={handleInputChange}
//                     placeholder="https://example.com/avatar.jpg"
//                   />
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="writerName">Writer Name</Label>
//                   <Input
//                     id="writerName"
//                     value={formData.writerName}
//                     onChange={handleInputChange}
//                     placeholder="John Smith"
//                   />
//                 </div>
                
//                 <div className="space-y-2 md:col-span-2">
//                   <Label htmlFor="body">Body Content (HTML)</Label>
//                   <Textarea
//                     id="body"
//                     value={formData.body}
//                     onChange={handleInputChange}
//                     placeholder="<h2>Introduction</h2><p>Enter HTML content here...</p>"
//                     rows={10}
//                   />
//                 </div>
//               </div>
              
//               <div className="flex justify-end gap-2">
//                 <Button type="button" variant="outline" onClick={handleCloseDialog}>
//                   Cancel
//                 </Button>
//                 <Button type="submit">
//                   {currentBlog ? "Update Blog Post" : "Add Blog Post"}
//                 </Button>
//               </div>
//             </form>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Blogs;

import { useState, useEffect } from "react";
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
import { Plus, Edit, Trash, Eye, X, Calendar, Loader2 } from "lucide-react";

const availableCategories = [
  "Web Development", "Mobile App", "Design", "Technology", "AI", "Security", "Product", "Business"
];

const availableTechnologies = [
  "React", "Angular", "Vue", "NodeJS", "Python", "Django", "WordPress", "PHP", 
  "JavaScript", "TypeScript", "Swift", "Kotlin"
];

type Blog = {
  _id: string;
  featuredImageUrl: string;
  title: string;
  description: string;
  categories: string[];
  technologies: string[];
  publicationDate: string;
  readTime: string;
  writerAvatarUrl: string;
  writerName: string;
  writerLinkedinUrl: string;
  bodyContent: string;
  views: number;
  likes: number;
  shares: number;
  createdAt: string;
  updatedAt: string;
};

const Blogs = () => {
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({
    featuredImageUrl: "",
    title: "",
    description: "",
    categories: [] as string[],
    technologies: [] as string[],
    publicationDate: new Date().toISOString().split('T')[0],
    readTime: "",
    writerAvatarUrl: "",
    writerName: "",
    writerLinkedinUrl: "",
    bodyContent: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.wonkrudigital.com/api/v1/blogs/");
      const data = await response.json();
      if (data.success) {
        setBlogs(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch blogs");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch blogs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const resetForm = () => {
    setFormData({
      featuredImageUrl: "",
      title: "",
      description: "",
      categories: [],
      technologies: [],
      publicationDate: new Date().toISOString().split('T')[0],
      readTime: "",
      writerAvatarUrl: "",
      writerName: "",
      writerLinkedinUrl: "",
      bodyContent: ""
    });
  };

  const handleOpenAddDialog = () => {
    resetForm();
    setCurrentBlog(null);
    setIsViewMode(false);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (blog: Blog) => {
    setFormData({
      featuredImageUrl: blog.featuredImageUrl,
      title: blog.title,
      description: blog.description,
      categories: [...blog.categories],
      technologies: [...blog.technologies],
      publicationDate: blog.publicationDate.split('T')[0],
      readTime: blog.readTime,
      writerAvatarUrl: blog.writerAvatarUrl,
      writerName: blog.writerName,
      writerLinkedinUrl: blog.writerLinkedinUrl,
      bodyContent: blog.bodyContent
    });
    setCurrentBlog(blog);
    setIsViewMode(false);
    setIsDialogOpen(true);
  };

  const handleOpenViewDialog = (blog: Blog) => {
    setFormData({
      featuredImageUrl: blog.featuredImageUrl,
      title: blog.title,
      description: blog.description,
      categories: [...blog.categories],
      technologies: [...blog.technologies],
      publicationDate: blog.publicationDate.split('T')[0],
      readTime: blog.readTime,
      writerAvatarUrl: blog.writerAvatarUrl,
      writerName: blog.writerName,
      writerLinkedinUrl: blog.writerLinkedinUrl,
      bodyContent: blog.bodyContent
    });
    setCurrentBlog(blog);
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

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.featuredImageUrl || !formData.title || !formData.description || 
        formData.categories.length === 0 || !formData.publicationDate || 
        !formData.readTime || !formData.writerName || !formData.bodyContent) {
      toast({
        title: "Form error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      if (!token) {
        throw new Error("No authentication token found");
      }

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`); // Add Authorization header

      const raw = JSON.stringify({
        featuredImageUrl: formData.featuredImageUrl,
        title: formData.title,
        description: formData.description,
        categories: formData.categories,
        technologies: formData.technologies,
        publicationDate: new Date(formData.publicationDate).toISOString(),
        readTime: formData.readTime,
        writerAvatarUrl: formData.writerAvatarUrl,
        writerName: formData.writerName,
        writerLinkedinUrl: formData.writerLinkedinUrl,
        bodyContent: formData.bodyContent
      });

      if (currentBlog) {
        // Update existing blog
        const response = await fetch(`https://api.wonkrudigital.com/api/v1/blogs/${currentBlog._id}`, {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        });
        
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.message || "Failed to update blog");
        }

        if (result.success) {
          toast({
            title: "Blog updated",
            description: `${formData.title} has been updated successfully`,
          });
          await fetchBlogs();
        } else {
          throw new Error(result.message || "Failed to update blog");
        }
      } else {
        // Add new blog
        const response = await fetch("https://api.wonkrudigital.com/api/v1/blogs/", {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        });
        
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.message || "Failed to add blog");
        }

        if (result.success) {
          toast({
            title: "Blog added",
            description: `${formData.title} has been added successfully`,
          });
          await fetchBlogs();
        } else {
          throw new Error(result.message || "Failed to add blog");
        }
      }
      
      handleCloseDialog();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

// eslint-disable-next-line no-debugger
const handleDeleteBlog = async (id: string) => {  debugger
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`https://api.wonkrudigital.com/api/v1/blogs/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      redirect: "follow"
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || "Failed to delete blog");
    }

    if (result.success) {
      toast({
        title: "Blog removed",
        description: "Blog has been removed successfully",
      });
      await fetchBlogs();
    } else {
      throw new Error(result.message || "Failed to delete blog");
    }
  } catch (error) {
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to delete blog",
      variant: "destructive",
    });
  }
};

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Latest Insights</h1>
        <Button onClick={handleOpenAddDialog} disabled={loading}>
          <Plus className="mr-2 h-4 w-4" /> Add Blog
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Blog Posts</CardTitle>
          <CardDescription>Add, edit, or remove blog posts and articles</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Categories</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell>
                      <img 
                        src={blog.featuredImageUrl} 
                        alt={blog.title} 
                        className="w-16 h-12 object-cover rounded-md" 
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{blog.title}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-[200px]">{blog.description}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {blog.categories.map(category => (
                          <Badge key={category} variant="outline" className="bg-primary/10">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" /> {formatDate(blog.publicationDate)}
                      </div>
                      <div className="text-xs text-muted-foreground">{blog.readTime} min read</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <img 
                          src={blog.writerAvatarUrl} 
                          alt={blog.writerName} 
                          className="w-6 h-6 rounded-full mr-2"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/placeholder.svg";
                          }}
                        />
                        <span>{blog.writerName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleOpenViewDialog(blog)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleOpenEditDialog(blog)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteBlog(blog._id)}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {blogs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No blog posts found. Click 'Add Blog' to create your first blog post.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isViewMode ? "View Blog Post" : currentBlog ? "Edit Blog Post" : "Add New Blog Post"}
            </DialogTitle>
            <DialogDescription>
              {isViewMode 
                ? "Blog post details and content"
                : currentBlog 
                  ? "Update the details of the selected blog post"
                  : "Fill in the details to add a new blog post"}
            </DialogDescription>
          </DialogHeader>
          
          {isViewMode ? (
            <div className="space-y-6">
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <img 
                  src={formData.featuredImageUrl} 
                  alt={formData.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold">{formData.title}</h2>
                <p className="mt-2 text-muted-foreground">{formData.description}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src={formData.writerAvatarUrl} 
                    alt={formData.writerName} 
                    className="w-10 h-10 rounded-full mr-3"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                  <div>
                    <div className="font-medium">{formData.writerName}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(formData.publicationDate)} · {formData.readTime} min read
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {formData.categories.map(category => (
                    <Badge key={category} variant="outline" className="bg-primary/10">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.technologies.map(tech => (
                  <Badge key={tech} variant="secondary" className="bg-secondary/50">
                    {tech}
                  </Badge>
                ))}
              </div>
              
              <div className="border-t pt-4">
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: formData.bodyContent }} />
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="featuredImageUrl">Featured Image URL</Label>
                  <Input
                    id="featuredImageUrl"
                    value={formData.featuredImageUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Blog Title"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description / Excerpt</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Brief description of the blog post..."
                    rows={2}
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
                
                <div className="space-y-2">
                  <Label htmlFor="publicationDate">Publication Date</Label>
                  <Input
                    id="publicationDate"
                    type="date"
                    value={formData.publicationDate}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="readTime">Read Time (minutes)</Label>
                  <Input
                    id="readTime"
                    value={formData.readTime}
                    onChange={handleInputChange}
                    placeholder="5"
                    type="number"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="writerAvatarUrl">Writer Avatar URL</Label>
                  <Input
                    id="writerAvatarUrl"
                    value={formData.writerAvatarUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="writerName">Writer Name</Label>
                  <Input
                    id="writerName"
                    value={formData.writerName}
                    onChange={handleInputChange}
                    placeholder="John Smith"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="writerLinkedinUrl">Writer LinkedIn URL</Label>
                  <Input
                    id="writerLinkedinUrl"
                    value={formData.writerLinkedinUrl}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bodyContent">Body Content (HTML)</Label>
                  <Textarea
                    id="bodyContent"
                    value={formData.bodyContent}
                    onChange={handleInputChange}
                    placeholder="<h2>Introduction</h2><p>Enter HTML content here...</p>"
                    rows={10}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleCloseDialog}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : currentBlog ? (
                    "Update Blog Post"
                  ) : (
                    "Add Blog Post"
                  )}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Blogs;