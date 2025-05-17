
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash } from "lucide-react";
import ServiceForm, { Service } from "@/components/admin/ServiceForm";

const TechnicalServices = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      logo: "/placeholder.svg",
      title: "Web Development",
      subtitle: "Responsive and scalable web solutions",
      description: "Our expert team delivers custom web applications that are fast, responsive, and built with the latest technologies."
    },
    {
      id: 2,
      logo: "/placeholder.svg",
      title: "Mobile App Development",
      subtitle: "Native and cross-platform apps",
      description: "We create engaging mobile experiences for iOS and Android, with a focus on performance and usability."
    },
    {
      id: 3,
      logo: "/placeholder.svg",
      title: "UI/UX Design",
      subtitle: "Intuitive and attractive interfaces",
      description: "Our design team creates beautiful, user-friendly interfaces that enhance user engagement and satisfaction."
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | undefined>(undefined);

  const handleOpenAddDialog = () => {
    setCurrentService(undefined);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (service: Service) => {
    setCurrentService(service);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleAddService = (serviceData: Omit<Service, "id">) => {
    const newId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
    const newService: Service = {
      id: newId,
      ...serviceData
    };
    
    setServices([...services, newService]);
    setIsDialogOpen(false);
    
    toast({
      title: "Service added",
      description: `${serviceData.title} has been added successfully`,
    });
  };

  const handleUpdateService = (serviceData: Omit<Service, "id">) => {
    if (!currentService) return;
    
    const updatedServices = services.map(service => 
      service.id === currentService.id ? { ...service, ...serviceData } : service
    );
    
    setServices(updatedServices);
    setIsDialogOpen(false);
    
    toast({
      title: "Service updated",
      description: `${serviceData.title} has been updated successfully`,
    });
  };

  const handleDeleteService = (id: number) => {
    setServices(services.filter(service => service.id !== id));
    
    toast({
      title: "Service removed",
      description: "Service has been removed successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Technical Services</h1>
        <Button onClick={handleOpenAddDialog}>
          <Plus className="mr-2 h-4 w-4" /> Add Service
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Services</CardTitle>
          <CardDescription>Add, edit, or remove technical services that your company offers</CardDescription>
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
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <img src={service.logo} alt={service.title} className="w-12 h-12 object-contain" />
                  </TableCell>
                  <TableCell className="font-medium">{service.title}</TableCell>
                  <TableCell>{service.subtitle}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate">{service.description}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleOpenEditDialog(service)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteService(service.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {services.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No services added yet. Click 'Add Service' to get started.
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
              {currentService ? "Edit Service" : "Add New Service"}
            </DialogTitle>
            <DialogDescription>
              {currentService 
                ? "Update the details of the selected service"
                : "Fill in the details to add a new technical service"}
            </DialogDescription>
          </DialogHeader>
          <ServiceForm 
            service={currentService}
            onSubmit={currentService ? handleUpdateService : handleAddService}
            onCancel={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TechnicalServices;
