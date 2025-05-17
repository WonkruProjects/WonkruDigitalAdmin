
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export type Service = {
  id: number;
  logo: string;
  title: string;
  subtitle: string;
  description: string;
};

type ServiceFormProps = {
  service?: Service;
  onSubmit: (service: Omit<Service, "id">) => void;
  onCancel: () => void;
};

const ServiceForm = ({ service, onSubmit, onCancel }: ServiceFormProps) => {
  const { toast } = useToast();
  const [logo, setLogo] = useState(service?.logo || "");
  const [title, setTitle] = useState(service?.title || "");
  const [subtitle, setSubtitle] = useState(service?.subtitle || "");
  const [description, setDescription] = useState(service?.description || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!logo.trim() || !title.trim() || !subtitle.trim() || !description.trim()) {
      toast({
        title: "Form error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit({
      logo,
      title,
      subtitle,
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="logo">Logo URL</Label>
        <Input
          id="logo"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          placeholder="https://example.com/logo.png"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Web Development"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="subtitle">Subtitle</Label>
        <Input
          id="subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Modern solutions for your business"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detailed description of the service..."
          rows={4}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {service ? "Update Service" : "Add Service"}
        </Button>
      </div>
    </form>
  );
};

export default ServiceForm;
