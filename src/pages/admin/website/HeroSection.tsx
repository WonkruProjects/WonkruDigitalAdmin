
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Plus, X, Edit, Trash, MoveUp, MoveDown, Save } from "lucide-react";

const HeroSection = () => {
  const { toast } = useToast();
  const [heading, setHeading] = useState("Empowering Businesses with Digital Solutions");
  const [description, setDescription] = useState("We help businesses transform their ideas into reality through innovative digital solutions. Our team of experts works closely with you to deliver exceptional results.");
  const [isEditing, setIsEditing] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [editingClientId, setEditingClientId] = useState<number | null>(null);
  const [editLogoUrl, setEditLogoUrl] = useState("");
  const [editWebsiteUrl, setEditWebsiteUrl] = useState("");
  const [clients, setClients] = useState([
    { id: 1, logoUrl: "/placeholder.svg", websiteUrl: "https://client1.com" },
    { id: 2, logoUrl: "/placeholder.svg", websiteUrl: "https://client2.com" },
    { id: 3, logoUrl: "/placeholder.svg", websiteUrl: "https://client3.com" },
    { id: 4, logoUrl: "/placeholder.svg", websiteUrl: "https://client4.com" },
  ]);

  const handleSaveHeadingDesc = () => {
    toast({
      title: "Changes saved",
      description: "Hero section heading and description updated successfully",
    });
    setIsEditing(false);
  };

  const handleAddClient = () => {
    if (!logoUrl.trim() || !websiteUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter both logo URL and website URL",
        variant: "destructive",
      });
      return;
    }

    const newClient = {
      id: clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1,
      logoUrl,
      websiteUrl,
    };

    setClients([...clients, newClient]);
    setLogoUrl("");
    setWebsiteUrl("");

    toast({
      title: "Client added",
      description: "New client logo has been added successfully",
    });
  };

  const handleUpdateClient = () => {
    if (!editLogoUrl.trim() || !editWebsiteUrl.trim() || editingClientId === null) {
      toast({
        title: "Error",
        description: "Please enter both logo URL and website URL",
        variant: "destructive",
      });
      return;
    }

    const updatedClients = clients.map(client => 
      client.id === editingClientId 
        ? { ...client, logoUrl: editLogoUrl, websiteUrl: editWebsiteUrl } 
        : client
    );

    setClients(updatedClients);
    setEditingClientId(null);
    setEditLogoUrl("");
    setEditWebsiteUrl("");

    toast({
      title: "Client updated",
      description: "Client information has been updated successfully",
    });
  };

  const handleEditClient = (client: any) => {
    setEditingClientId(client.id);
    setEditLogoUrl(client.logoUrl);
    setEditWebsiteUrl(client.websiteUrl);
  };

  const handleDeleteClient = (id: number) => {
    setClients(clients.filter(client => client.id !== id));
    toast({
      title: "Client removed",
      description: "Client has been removed successfully",
    });
  };

  const handleMoveClient = (id: number, direction: "up" | "down") => {
    const currentIndex = clients.findIndex(client => client.id === id);
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === clients.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    const newClients = [...clients];
    const temp = newClients[currentIndex];
    newClients[currentIndex] = newClients[newIndex];
    newClients[newIndex] = temp;

    setClients(newClients);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Hero Section</h1>
        <Button onClick={() => isEditing ? handleSaveHeadingDesc() : setIsEditing(true)}>
          {isEditing ? <><Save className="mr-2 h-4 w-4" /> Save Changes</> : <><Edit className="mr-2 h-4 w-4" /> Edit Content</>}
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Heading & Description</CardTitle>
          <CardDescription>Edit the main heading and description for your hero section</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="heading" className="text-sm font-medium">Heading</label>
            {isEditing ? (
              <Input
                id="heading"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                placeholder="Enter the main heading"
              />
            ) : (
              <div className="p-3 border rounded-md bg-gray-50">{heading}</div>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            {isEditing ? (
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter the description"
                rows={4}
              />
            ) : (
              <div className="p-3 border rounded-md bg-gray-50 min-h-24">{description}</div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Client Logos</CardTitle>
              <CardDescription>Manage client logos that appear in the hero section</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" /> Add Client
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Client</DialogTitle>
                  <DialogDescription>
                    Add a new client logo to display in the hero section
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="logoUrl" className="text-sm font-medium">Logo URL</label>
                    <Input
                      id="logoUrl"
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="websiteUrl" className="text-sm font-medium">Website URL</label>
                    <Input
                      id="websiteUrl"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddClient}>Add Client</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Logo</TableHead>
                <TableHead>Website URL</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <img src={client.logoUrl} alt="Client logo" className="w-12 h-12 object-contain" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <a href={client.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {client.websiteUrl}
                    </a>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleMoveClient(client.id, "up")}>
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleMoveClient(client.id, "down")}>
                        <MoveDown className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => handleEditClient(client)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Client</DialogTitle>
                            <DialogDescription>
                              Update client logo and website information
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <label htmlFor="editLogoUrl" className="text-sm font-medium">Logo URL</label>
                              <Input
                                id="editLogoUrl"
                                value={editLogoUrl}
                                onChange={(e) => setEditLogoUrl(e.target.value)}
                                placeholder="https://example.com/logo.png"
                              />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="editWebsiteUrl" className="text-sm font-medium">Website URL</label>
                              <Input
                                id="editWebsiteUrl"
                                value={editWebsiteUrl}
                                onChange={(e) => setEditWebsiteUrl(e.target.value)}
                                placeholder="https://example.com"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={handleUpdateClient}>Update Client</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteClient(client.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {clients.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                    No clients added yet. Click 'Add Client' to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeroSection;
