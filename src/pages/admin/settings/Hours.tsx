
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Save, Clock } from "lucide-react";

interface WorkingHour {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

const HoursSettings = () => {
  const { toast } = useToast();
  const [workingHours, setWorkingHours] = useState<WorkingHour[]>([
    { day: "Monday", isOpen: true, openTime: "09:00", closeTime: "18:00" },
    { day: "Tuesday", isOpen: true, openTime: "09:00", closeTime: "18:00" },
    { day: "Wednesday", isOpen: true, openTime: "09:00", closeTime: "18:00" },
    { day: "Thursday", isOpen: true, openTime: "09:00", closeTime: "18:00" },
    { day: "Friday", isOpen: true, openTime: "09:00", closeTime: "17:00" },
    { day: "Saturday", isOpen: false, openTime: "10:00", closeTime: "15:00" },
    { day: "Sunday", isOpen: false, openTime: "10:00", closeTime: "15:00" }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleDay = (index: number) => {
    const newHours = [...workingHours];
    newHours[index].isOpen = !newHours[index].isOpen;
    setWorkingHours(newHours);
  };

  const handleTimeChange = (index: number, field: 'openTime' | 'closeTime', value: string) => {
    const newHours = [...workingHours];
    newHours[index][field] = value;
    setWorkingHours(newHours);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Settings saved",
        description: "Working hours have been updated successfully",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Working Hours</h1>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Business Hours</CardTitle>
            <CardDescription>
              Set your company's operating hours that will be displayed on your website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {workingHours.map((day, index) => (
              <div key={day.day} className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-3 sm:col-span-2">
                  <span className="font-medium">{day.day}</span>
                </div>
                <div className="col-span-3 sm:col-span-2 flex items-center space-x-2">
                  <Switch 
                    checked={day.isOpen} 
                    onCheckedChange={() => handleToggleDay(index)} 
                    id={`${day.day}-toggle`}
                  />
                  <label htmlFor={`${day.day}-toggle`} className="text-sm">
                    {day.isOpen ? "Open" : "Closed"}
                  </label>
                </div>
                {day.isOpen ? (
                  <>
                    <div className="col-span-3 sm:col-span-4 flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Input
                        type="time"
                        value={day.openTime}
                        onChange={(e) => handleTimeChange(index, 'openTime', e.target.value)}
                        disabled={!day.isOpen}
                      />
                    </div>
                    <div className="col-span-3 sm:col-span-4 flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Input
                        type="time"
                        value={day.closeTime}
                        onChange={(e) => handleTimeChange(index, 'closeTime', e.target.value)}
                        disabled={!day.isOpen}
                      />
                    </div>
                  </>
                ) : (
                  <div className="col-span-6 sm:col-span-8 text-muted-foreground text-sm">
                    Closed all day
                  </div>
                )}
                {index < workingHours.length - 1 && (
                  <div className="col-span-12 my-2">
                    <Separator />
                  </div>
                )}
              </div>
            ))}
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

export default HoursSettings;
