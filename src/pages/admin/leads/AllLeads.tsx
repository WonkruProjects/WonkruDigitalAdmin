// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { useToast } from "@/components/ui/use-toast";
// import { Badge } from "@/components/ui/badge";
// import { 
//   Dialog, 
//   DialogContent, 
//   DialogDescription, 
//   DialogHeader, 
//   DialogTitle 
// } from "@/components/ui/dialog";
// import { 
//   Select, 
//   SelectContent, 
//   SelectItem, 
//   SelectTrigger, 
//   SelectValue 
// } from "@/components/ui/select";
// import { Calendar } from "@/components/ui/calendar";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { format } from "date-fns";
// import { Calendar as CalendarIcon, Star, StarOff, Check, Trash2, Eye, Search, Bell, ArrowUpDown, Filter, ListFilter, X } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Skeleton } from "@/components/ui/skeleton";
// import { fetchLeads } from "./mockLeadsApi";

// // Lead status options
// const STATUS_OPTIONS = [
//   { value: "new", label: "New" },
//   { value: "contacted", label: "Contacted" },
//   { value: "in_progress", label: "In Progress" },
//   { value: "converted", label: "Converted" },
//   { value: "lost", label: "Lost" }
// ];

// // Priority options
// const PRIORITY_OPTIONS = [
//   { value: "low", label: "Low" },
//   { value: "medium", label: "Medium" },
//   { value: "high", label: "High" }
// ];

// // Service options
// const SERVICE_OPTIONS = [
//   { value: "web_development", label: "Web Development" },
//   { value: "mobile_app", label: "Mobile App Development" },
//   { value: "ui_ux", label: "UI/UX Design" },
//   { value: "seo", label: "SEO Optimization" },
//   { value: "digital_marketing", label: "Digital Marketing" }
// ];

// // Lead type for TypeScript
// interface Lead {
//   id: number;
//   name: string;
//   email: string;
//   company: string;
//   service: string;
//   message: string;
//   date: string;
//   status: string;
//   priority: string;
//   reminder?: string;
//   notes?: string;
// }

// // Filter type for TypeScript
// interface FilterOptions {
//   status: string[];
//   priority: string[];
//   service: string[];
//   reminderSet: boolean | null;
//   dateRange: {
//     start: Date | undefined;
//     end: Date | undefined;
//   };
// }

// const AllLeads = () => {
//   const { toast } = useToast();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortColumn, setSortColumn] = useState<string | null>("date");
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
//   const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
//   const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
//   const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);
//   const [reminderDate, setReminderDate] = useState<Date | undefined>(undefined);
//   const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  
//   // Filter state
//   const [filterOptions, setFilterOptions] = useState<FilterOptions>({
//     status: [],
//     priority: [],
//     service: [],
//     reminderSet: null,
//     dateRange: {
//       start: undefined,
//       end: undefined
//     }
//   });
  
//   // Active filters count badge
//   const activeFiltersCount = 
//     filterOptions.status.length + 
//     filterOptions.priority.length + 
//     filterOptions.service.length + 
//     (filterOptions.reminderSet !== null ? 1 : 0) +
//     ((filterOptions.dateRange.start || filterOptions.dateRange.end) ? 1 : 0);
  
//   // Sample leads data
//   const [leads, setLeads] = useState<Lead[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch (mock) leads on mount
//   useEffect(() => {
//     setIsLoading(true);
//     fetchLeads().then(data => {
//       setLeads(data);
//       setIsLoading(false);
//     });
//   }, []);

//   // Handle sorting
//   const handleSort = (column: string) => {
//     if (sortColumn === column) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       setSortColumn(column);
//       setSortDirection("asc");
//     }
    
//     // Add animation effect on sort change
//     const tableElement = document.querySelector('table');
//     if (tableElement) {
//       tableElement.classList.remove('animate-fade-in');
//       void tableElement.offsetWidth; // Force reflow
//       tableElement.classList.add('animate-fade-in');
//     }
    
//     toast({
//       title: "Sorting updated",
//       description: `Sorted by ${column} in ${sortDirection === "asc" ? "descending" : "ascending"} order`,
//     });
//   };

//   // Sort leads based on current sort column and direction
//   const sortedLeads = [...leads].sort((a, b) => {
//     if (!sortColumn) return 0;
    
//     const aValue = a[sortColumn as keyof Lead];
//     const bValue = b[sortColumn as keyof Lead];
    
//     if (aValue === bValue) return 0;
    
//     const comparison = aValue < bValue ? -1 : 1;
//     return sortDirection === "asc" ? comparison : -comparison;
//   });

//   // Apply filters to leads
//   const filteredByOptions = sortedLeads.filter(lead => {
//     // Status filter
//     if (filterOptions.status.length > 0 && !filterOptions.status.includes(lead.status)) {
//       return false;
//     }
    
//     // Priority filter
//     if (filterOptions.priority.length > 0 && !filterOptions.priority.includes(lead.priority)) {
//       return false;
//     }
    
//     // Service filter
//     if (filterOptions.service.length > 0 && !filterOptions.service.includes(lead.service)) {
//       return false;
//     }
    
//     // Reminder filter
//     if (filterOptions.reminderSet === true && !lead.reminder) {
//       return false;
//     }
//     if (filterOptions.reminderSet === false && lead.reminder) {
//       return false;
//     }
    
//     // Date range filter
//     if (filterOptions.dateRange.start || filterOptions.dateRange.end) {
//       const leadDate = new Date(lead.date);
//       if (filterOptions.dateRange.start && leadDate < filterOptions.dateRange.start) {
//         return false;
//       }
//       if (filterOptions.dateRange.end) {
//         const endDateCopy = new Date(filterOptions.dateRange.end);
//         endDateCopy.setHours(23, 59, 59, 999); // Set to end of the day
//         if (leadDate > endDateCopy) {
//           return false;
//         }
//       }
//     }
    
//     return true;
//   });

//   // Filter leads based on search query
//   const filteredLeads = filteredByOptions.filter(lead => {
//     const searchString = searchQuery.toLowerCase();
//     return (
//       lead.name.toLowerCase().includes(searchString) ||
//       lead.email.toLowerCase().includes(searchString) ||
//       lead.company.toLowerCase().includes(searchString) ||
//       SERVICE_OPTIONS.find(option => option.value === lead.service)?.label.toLowerCase().includes(searchString) ||
//       lead.message.toLowerCase().includes(searchString)
//     );
//   });

//   // Toggle filter for status, priority, service
//   const toggleFilter = (type: 'status' | 'priority' | 'service', value: string) => {
//     setFilterOptions(prev => {
//       const currentValues = [...prev[type]];
//       const valueIndex = currentValues.indexOf(value);
      
//       if (valueIndex === -1) {
//         // Add the value
//         return {
//           ...prev,
//           [type]: [...currentValues, value]
//         };
//       } else {
//         // Remove the value
//         currentValues.splice(valueIndex, 1);
//         return {
//           ...prev,
//           [type]: currentValues
//         };
//       }
//     });
//   };
  
//   // Toggle reminder filter
//   const toggleReminderFilter = (hasReminder: boolean | null) => {
//     setFilterOptions(prev => ({
//       ...prev,
//       reminderSet: hasReminder
//     }));
//   };
  
//   // Set date range filter
//   const setDateRangeFilter = (key: 'start' | 'end', date: Date | undefined) => {
//     setFilterOptions(prev => ({
//       ...prev,
//       dateRange: {
//         ...prev.dateRange,
//         [key]: date
//       }
//     }));
//   };
  
//   // Clear all filters
//   const clearAllFilters = () => {
//     setFilterOptions({
//       status: [],
//       priority: [],
//       service: [],
//       reminderSet: null,
//       dateRange: {
//         start: undefined,
//         end: undefined
//       }
//     });
    
//     toast({
//       title: "Filters cleared",
//       description: "All filters have been reset",
//     });
//   };
  
//   // Clear specific filter type
//   const clearFilterType = (type: keyof FilterOptions) => {
//     if (type === 'dateRange') {
//       setFilterOptions(prev => ({
//         ...prev,
//         dateRange: {
//           start: undefined,
//           end: undefined
//         }
//       }));
//     } else {
//       setFilterOptions(prev => ({
//         ...prev,
//         [type]: type === 'reminderSet' ? null : []
//       }));
//     }
//   };

//   // Handle priority toggle
//   const handleTogglePriority = (id: number) => {
//     setLeads(leads.map(lead => {
//       if (lead.id === id) {
//         const newPriority = lead.priority === "high" ? "low" : 
//                           lead.priority === "medium" ? "high" : "medium";
//         return { ...lead, priority: newPriority };
//       }
//       return lead;
//     }));
    
//     toast({
//       title: "Priority updated",
//       description: "Lead priority has been updated successfully",
//     });
//   };

//   // Handle status change
//   const handleStatusChange = (id: number, status: string) => {
//     setLeads(leads.map(lead => {
//       if (lead.id === id) {
//         return { ...lead, status };
//       }
//       return lead;
//     }));
    
//     toast({
//       title: "Status updated",
//       description: "Lead status has been updated successfully",
//     });
//   };

//   // Handle setting a reminder
//   const handleSetReminder = (id: number) => {
//     if (!reminderDate) {
//       toast({
//         title: "Error",
//         description: "Please select a date for the reminder",
//         variant: "destructive",
//       });
//       return;
//     }
    
//     setLeads(leads.map(lead => {
//       if (lead.id === id) {
//         return { 
//           ...lead, 
//           reminder: format(reminderDate, "yyyy-MM-dd") 
//         };
//       }
//       return lead;
//     }));
    
//     setIsReminderDialogOpen(false);
//     setReminderDate(undefined);
    
//     toast({
//       title: "Reminder set",
//       description: `Reminder set for ${format(reminderDate, "PPP")}`,
//     });
//   };

//   // Handle deleting a lead
//   const handleDeleteLead = (id: number) => {
//     setLeads(leads.filter(lead => lead.id !== id));
    
//     toast({
//       title: "Lead deleted",
//       description: "Lead has been moved to trash",
//     });
//   };

//   // Handle viewing lead details
//   const handleViewLead = (lead: Lead) => {
//     setSelectedLead(lead);
//     setIsViewDialogOpen(true);
//   };

//   // Handle setting a reminder for a lead
//   const handleOpenReminderDialog = (lead: Lead) => {
//     setSelectedLead(lead);
//     if (lead.reminder) {
//       setReminderDate(new Date(lead.reminder));
//     } else {
//       setReminderDate(undefined);
//     }
//     setIsReminderDialogOpen(true);
//   };

//   // Get status badge color
//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "new":
//         return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">New</Badge>;
//       case "contacted":
//         return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Contacted</Badge>;
//       case "in_progress":
//         return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">In Progress</Badge>;
//       case "converted":
//         return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Converted</Badge>;
//       case "lost":
//         return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Lost</Badge>;
//       default:
//         return <Badge variant="outline">{status}</Badge>;
//     }
//   };

//   // Get priority badge
//   const getPriorityBadge = (priority: string) => {
//     switch (priority) {
//       case "high":
//         return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>;
//       case "medium":
//         return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Medium</Badge>;
//       case "low":
//         return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>;
//       default:
//         return <Badge variant="outline">{priority}</Badge>;
//     }
//   };

//   // Get service label from value
//   const getServiceLabel = (serviceValue: string) => {
//     return SERVICE_OPTIONS.find(option => option.value === serviceValue)?.label || serviceValue;
//   };

//   // Active filter badges
//   const renderActiveFilterBadges = () => {
//     const badges = [];
    
//     // Status filters
//     filterOptions.status.forEach(status => {
//       badges.push(
//         <Badge 
//           key={`status-${status}`} 
//           variant="outline" 
//           className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 transition-colors animate-fade-in"
//         >
//           {STATUS_OPTIONS.find(opt => opt.value === status)?.label}
//           <X 
//             className="h-3 w-3 cursor-pointer" 
//             onClick={() => toggleFilter('status', status)}
//           />
//         </Badge>
//       );
//     });
    
//     // Priority filters
//     filterOptions.priority.forEach(priority => {
//       badges.push(
//         <Badge 
//           key={`priority-${priority}`} 
//           variant="outline" 
//           className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 transition-colors animate-fade-in"
//         >
//           {PRIORITY_OPTIONS.find(opt => opt.value === priority)?.label} Priority
//           <X 
//             className="h-3 w-3 cursor-pointer" 
//             onClick={() => toggleFilter('priority', priority)}
//           />
//         </Badge>
//       );
//     });
    
//     // Service filters
//     filterOptions.service.forEach(service => {
//       badges.push(
//         <Badge 
//           key={`service-${service}`} 
//           variant="outline" 
//           className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 transition-colors animate-fade-in"
//         >
//           {SERVICE_OPTIONS.find(opt => opt.value === service)?.label}
//           <X 
//             className="h-3 w-3 cursor-pointer" 
//             onClick={() => toggleFilter('service', service)}
//           />
//         </Badge>
//       );
//     });
    
//     // Reminder filter
//     if (filterOptions.reminderSet !== null) {
//       badges.push(
//         <Badge 
//           key="reminder" 
//           variant="outline" 
//           className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 transition-colors animate-fade-in"
//         >
//           {filterOptions.reminderSet ? "Has Reminder" : "No Reminder"}
//           <X 
//             className="h-3 w-3 cursor-pointer" 
//             onClick={() => toggleReminderFilter(null)}
//           />
//         </Badge>
//       );
//     }
    
//     // Date range filter
//     if (filterOptions.dateRange.start || filterOptions.dateRange.end) {
//       const dateText = filterOptions.dateRange.start && filterOptions.dateRange.end
//         ? `${format(filterOptions.dateRange.start, "MMM d")} - ${format(filterOptions.dateRange.end, "MMM d")}`
//         : filterOptions.dateRange.start
//           ? `After ${format(filterOptions.dateRange.start, "MMM d")}`
//           : `Before ${format(filterOptions.dateRange.end!, "MMM d")}`;
      
//       badges.push(
//         <Badge 
//           key="date-range" 
//           variant="outline" 
//           className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 transition-colors animate-fade-in"
//         >
//           {dateText}
//           <X 
//             className="h-3 w-3 cursor-pointer" 
//             onClick={() => clearFilterType('dateRange')}
//           />
//         </Badge>
//       );
//     }
    
//     return badges;
//   };

//   const renderSkeletonRows = (count: number) => (
//     Array.from({ length: count }).map((_, i) => (
//       <TableRow key={`skeleton-${i}`}>
//         <TableCell>
//           <Skeleton className="w-8 h-8 rounded-full" />
//         </TableCell>
//         <TableCell><Skeleton className="h-4 w-24" /></TableCell>
//         <TableCell><Skeleton className="h-4 w-32" /></TableCell>
//         <TableCell><Skeleton className="h-4 w-28" /></TableCell>
//         <TableCell><Skeleton className="h-4 w-36" /></TableCell>
//         <TableCell><Skeleton className="h-4 w-16" /></TableCell>
//         <TableCell><Skeleton className="h-6 w-20 rounded" /></TableCell>
//         <TableCell><Skeleton className="h-4 w-16" /></TableCell>
//         <TableCell className="text-right flex gap-2 justify-end">
//           <Skeleton className="h-8 w-8 rounded-full" />
//           <Skeleton className="h-8 w-8 rounded-full" />
//           <Skeleton className="h-8 w-8 rounded-full" />
//         </TableCell>
//       </TableRow>
//     ))
//   );

//   return (
//     <div className="space-y-6 animate-fade-in">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold tracking-tight hover:text-gray-700 transition-colors">Lead Management</h1>
//         <div className="flex items-center gap-2">
//           <div className="relative w-64">
//             <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search leads..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-8 hover:border-gray-400 transition-colors focus:ring-2 focus:ring-gray-200"
//             />
//           </div>
          
//           <Popover open={isFilterMenuOpen} onOpenChange={setIsFilterMenuOpen}>
//             <PopoverTrigger asChild>
//               <Button 
//                 variant="outline" 
//                 size="icon"
//                 className="transition-all duration-200 hover:bg-gray-100 hover:border-gray-400 relative"
//               >
//                 <Filter className="h-4 w-4" />
//                 {activeFiltersCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                     {activeFiltersCount}
//                   </span>
//                 )}
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-80 p-4 animate-scale-in">
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <h4 className="font-medium text-sm">Filter Leads</h4>
//                   {activeFiltersCount > 0 && (
//                     <Button 
//                       variant="ghost" 
//                       size="sm" 
//                       onClick={clearAllFilters}
//                       className="text-xs h-8 px-2 hover:bg-gray-100 transition-colors"
//                     >
//                       Clear all
//                     </Button>
//                   )}
//                 </div>
                
//                 <div>
//                   <h5 className="text-sm font-medium mb-1.5">By Status</h5>
//                   <div className="flex flex-wrap gap-1">
//                     {STATUS_OPTIONS.map(option => (
//                       <Badge 
//                         key={option.value}
//                         variant={filterOptions.status.includes(option.value) ? "default" : "outline"}
//                         className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
//                           filterOptions.status.includes(option.value) 
//                             ? "bg-gray-800 hover:bg-gray-700" 
//                             : "hover:bg-gray-100"
//                         }`}
//                         onClick={() => toggleFilter('status', option.value)}
//                       >
//                         {option.label}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
                
//                 <div>
//                   <h5 className="text-sm font-medium mb-1.5">By Priority</h5>
//                   <div className="flex flex-wrap gap-1">
//                     {PRIORITY_OPTIONS.map(option => (
//                       <Badge 
//                         key={option.value}
//                         variant={filterOptions.priority.includes(option.value) ? "default" : "outline"}
//                         className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
//                           filterOptions.priority.includes(option.value) 
//                             ? "bg-gray-800 hover:bg-gray-700" 
//                             : "hover:bg-gray-100"
//                         }`}
//                         onClick={() => toggleFilter('priority', option.value)}
//                       >
//                         {option.label}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
                
//                 <div>
//                   <h5 className="text-sm font-medium mb-1.5">By Service</h5>
//                   <div className="flex flex-wrap gap-1">
//                     {SERVICE_OPTIONS.map(option => (
//                       <Badge 
//                         key={option.value}
//                         variant={filterOptions.service.includes(option.value) ? "default" : "outline"}
//                         className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
//                           filterOptions.service.includes(option.value) 
//                             ? "bg-gray-800 hover:bg-gray-700" 
//                             : "hover:bg-gray-100"
//                         }`}
//                         onClick={() => toggleFilter('service', option.value)}
//                       >
//                         {option.label}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
                
//                 <div>
//                   <h5 className="text-sm font-medium mb-1.5">By Reminder</h5>
//                   <div className="flex flex-wrap gap-1">
//                     <Badge 
//                       variant={filterOptions.reminderSet === true ? "default" : "outline"}
//                       className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
//                         filterOptions.reminderSet === true 
//                           ? "bg-gray-800 hover:bg-gray-700" 
//                           : "hover:bg-gray-100"
//                       }`}
//                       onClick={() => toggleReminderFilter(filterOptions.reminderSet === true ? null : true)}
//                     >
//                       Has Reminder
//                     </Badge>
//                     <Badge 
//                       variant={filterOptions.reminderSet === false ? "default" : "outline"}
//                       className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
//                         filterOptions.reminderSet === false 
//                           ? "bg-gray-800 hover:bg-gray-700" 
//                           : "hover:bg-gray-100"
//                       }`}
//                       onClick={() => toggleReminderFilter(filterOptions.reminderSet === false ? null : false)}
//                     >
//                       No Reminder
//                     </Badge>
//                   </div>
//                 </div>
                
//                 <div>
//                   <h5 className="text-sm font-medium mb-1.5">By Date Range</h5>
//                   <div className="grid grid-cols-2 gap-2">
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <Button
//                           variant="outline"
//                           className={`w-full justify-start text-left text-xs h-8 transition-colors ${
//                             filterOptions.dateRange.start ? "border-gray-400" : ""
//                           }`}
//                         >
//                           {filterOptions.dateRange.start ? (
//                             format(filterOptions.dateRange.start, "PPP")
//                           ) : (
//                             <span className="text-muted-foreground">Start date</span>
//                           )}
//                         </Button>
//                       </PopoverTrigger>
//                       <PopoverContent className="w-auto p-0" align="start">
//                         <Calendar
//                           mode="single"
//                           selected={filterOptions.dateRange.start}
//                           onSelect={(date) => setDateRangeFilter('start', date)}
//                           initialFocus
//                         />
//                       </PopoverContent>
//                     </Popover>
                    
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <Button
//                           variant="outline"
//                           className={`w-full justify-start text-left text-xs h-8 transition-colors ${
//                             filterOptions.dateRange.end ? "border-gray-400" : ""
//                           }`}
//                         >
//                           {filterOptions.dateRange.end ? (
//                             format(filterOptions.dateRange.end, "PPP")
//                           ) : (
//                             <span className="text-muted-foreground">End date</span>
//                           )}
//                         </Button>
//                       </PopoverTrigger>
//                       <PopoverContent className="w-auto p-0" align="start">
//                         <Calendar
//                           mode="single"
//                           selected={filterOptions.dateRange.end}
//                           onSelect={(date) => setDateRangeFilter('end', date)}
//                           initialFocus
//                         />
//                       </PopoverContent>
//                     </Popover>
//                   </div>
//                 </div>
                
//                 <Button 
//                   className="w-full transition-all duration-200 hover:bg-gray-700 animate-fade-in"
//                   onClick={() => setIsFilterMenuOpen(false)}
//                 >
//                   Apply Filters
//                 </Button>
//               </div>
//             </PopoverContent>
//           </Popover>
//         </div>
//       </div>
      
//       {/* Active filters display */}
//       {activeFiltersCount > 0 && (
//         <div className="flex items-center gap-2 animate-fade-in">
//           <div className="text-sm text-muted-foreground">Active filters:</div>
//           <div className="flex flex-wrap gap-1.5">
//             {renderActiveFilterBadges()}
//           </div>
//         </div>
//       )}
      
//       <Card className="transition-all duration-300 hover:shadow-md">
//         <CardHeader>
//           <CardTitle className="hover:text-gray-700 transition-colors">All Leads</CardTitle>
//           <CardDescription>Manage and track all incoming leads</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="w-12">Priority</TableHead>
//                 <TableHead 
//                   className="cursor-pointer transition-colors hover:text-gray-800" 
//                   onClick={() => handleSort("name")}
//                 >
//                   <div className="flex items-center">
//                     Name
//                     {sortColumn === "name" && (
//                       <ArrowUpDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${sortDirection === "desc" ? "transform rotate-180" : ""}`} />
//                     )}
//                   </div>
//                 </TableHead>
//                 <TableHead 
//                   className="cursor-pointer transition-colors hover:text-gray-800" 
//                   onClick={() => handleSort("email")}
//                 >
//                   <div className="flex items-center">
//                     Email
//                     {sortColumn === "email" && (
//                       <ArrowUpDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${sortDirection === "desc" ? "transform rotate-180" : ""}`} />
//                     )}
//                   </div>
//                 </TableHead>
//                 <TableHead 
//                   className="cursor-pointer transition-colors hover:text-gray-800" 
//                   onClick={() => handleSort("company")}
//                 >
//                   <div className="flex items-center">
//                     Company
//                     {sortColumn === "company" && (
//                       <ArrowUpDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${sortDirection === "desc" ? "transform rotate-180" : ""}`} />
//                     )}
//                   </div>
//                 </TableHead>
//                 <TableHead 
//                   className="cursor-pointer transition-colors hover:text-gray-800" 
//                   onClick={() => handleSort("service")}
//                 >
//                   <div className="flex items-center">
//                     Service
//                     {sortColumn === "service" && (
//                       <ArrowUpDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${sortDirection === "desc" ? "transform rotate-180" : ""}`} />
//                     )}
//                   </div>
//                 </TableHead>
//                 <TableHead 
//                   className="cursor-pointer transition-colors hover:text-gray-800" 
//                   onClick={() => handleSort("date")}
//                 >
//                   <div className="flex items-center">
//                     Date
//                     {sortColumn === "date" && (
//                       <ArrowUpDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${sortDirection === "desc" ? "transform rotate-180" : ""}`} />
//                     )}
//                   </div>
//                 </TableHead>
//                 <TableHead
//                   className="cursor-pointer transition-colors hover:text-gray-800"
//                   onClick={() => handleSort("status")}
//                 >
//                   <div className="flex items-center">
//                     Status
//                     {sortColumn === "status" && (
//                       <ArrowUpDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${sortDirection === "desc" ? "transform rotate-180" : ""}`} />
//                     )}
//                   </div>
//                 </TableHead>
//                 <TableHead
//                   className="cursor-pointer transition-colors hover:text-gray-800"
//                   onClick={() => handleSort("reminder")}
//                 >
//                   <div className="flex items-center">
//                     Reminder
//                     {sortColumn === "reminder" && (
//                       <ArrowUpDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${sortDirection === "desc" ? "transform rotate-180" : ""}`} />
//                     )}
//                   </div>
//                 </TableHead>
//                 <TableHead className="text-right">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {isLoading
//                 ? renderSkeletonRows(5)
//                 : filteredLeads.map((lead) => (
//                     <TableRow key={lead.id} className="group animate-fade-in">
//                       <TableCell>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => handleTogglePriority(lead.id)}
//                           className={`transition-all duration-200 ${
//                             lead.priority === "high" 
//                               ? "text-red-500 hover:text-red-600" 
//                               : lead.priority === "medium"
//                                 ? "text-amber-500 hover:text-amber-600"
//                                 : "text-gray-400 hover:text-gray-500"
//                           } group-hover:scale-110`}
//                         >
//                           {lead.priority === "high" ? (
//                             <Star className="h-4 w-4 fill-current" />
//                           ) : lead.priority === "medium" ? (
//                             <Star className="h-4 w-4" />
//                           ) : (
//                             <StarOff className="h-4 w-4" />
//                           )}
//                         </Button>
//                       </TableCell>
//                       <TableCell className="font-medium transition-colors group-hover:text-gray-800">{lead.name}</TableCell>
//                       <TableCell className="transition-colors group-hover:text-gray-800">{lead.email}</TableCell>
//                       <TableCell className="transition-colors group-hover:text-gray-800">{lead.company}</TableCell>
//                       <TableCell className="transition-colors group-hover:text-gray-800">{getServiceLabel(lead.service)}</TableCell>
//                       <TableCell className="transition-colors group-hover:text-gray-800">{new Date(lead.date).toLocaleDateString()}</TableCell>
//                       <TableCell>
//                         <Select
//                           value={lead.status}
//                           onValueChange={(value) => handleStatusChange(lead.id, value)}
//                         >
//                           <SelectTrigger className="w-28 h-8 px-2 transition-all duration-200 group-hover:border-gray-400">
//                             <SelectValue>{getStatusBadge(lead.status)}</SelectValue>
//                           </SelectTrigger>
//                           <SelectContent>
//                             {STATUS_OPTIONS.map(option => (
//                               <SelectItem key={option.value} value={option.value}>
//                                 {getStatusBadge(option.value)}
//                               </SelectItem>
//                             ))}
//                           </SelectContent>
//                         </Select>
//                       </TableCell>
//                       <TableCell>
//                         {lead.reminder ? (
//                           <div className="flex items-center text-sm transition-colors group-hover:text-gray-800">
//                             <CalendarIcon className="mr-1 h-3 w-3" />
//                             {new Date(lead.reminder).toLocaleDateString()}
//                           </div>
//                         ) : (
//                           <span className="text-muted-foreground text-sm">None</span>
//                         )}
//                       </TableCell>
//                       <TableCell className="text-right">
//                         <div className="flex justify-end space-x-1">
//                           <Button 
//                             variant="outline" 
//                             size="icon" 
//                             onClick={() => handleViewLead(lead)}
//                             className="transition-all duration-200 hover:bg-gray-100 hover:border-gray-400 group-hover:scale-105"
//                           >
//                             <Eye className="h-4 w-4" />
//                           </Button>
//                           <Button 
//                             variant="outline" 
//                             size="icon" 
//                             onClick={() => handleOpenReminderDialog(lead)}
//                             className="transition-all duration-200 hover:bg-gray-100 hover:border-gray-400 group-hover:scale-105"
//                           >
//                             <Bell className="h-4 w-4" />
//                           </Button>
//                           <Button 
//                             variant="outline" 
//                             size="icon" 
//                             className="text-red-500 transition-all duration-200 hover:bg-red-50 hover:border-red-200 group-hover:scale-105" 
//                             onClick={() => handleDeleteLead(lead.id)}
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))
//               }
//               {!isLoading && filteredLeads.length === 0 && (
//                 <TableRow>
//                   <TableCell colSpan={9} className="text-center py-8 text-muted-foreground animate-fade-in">
//                     No leads found. Try adjusting your search or filter criteria.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* View Lead Dialog */}
//       <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
//         <DialogContent className="sm:max-w-lg animate-scale-in">
//           <DialogHeader>
//             <DialogTitle>Lead Details</DialogTitle>
//             <DialogDescription>
//               Detailed information about the selected lead
//             </DialogDescription>
//           </DialogHeader>
//           {isLoading
//             ? (
//               <div className="space-y-4 animate-fade-in">
//                 <Skeleton className="h-6 w-40" />
//                 <Skeleton className="h-4 w-32" />
//                 <Skeleton className="h-10 w-full" />
//                 <Skeleton className="h-52 w-full" />
//               </div>
//             ) : selectedLead && (
//               <div className="space-y-4 animate-fade-in">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="text-lg font-semibold transition-colors hover:text-gray-700">{selectedLead.name}</h3>
//                     <p className="text-sm text-muted-foreground">{selectedLead.email}</p>
//                   </div>
//                   <div className="space-y-1 text-right">
//                     {getPriorityBadge(selectedLead.priority)}
//                     <div className="mt-1">{getStatusBadge(selectedLead.status)}</div>
//                   </div>
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-4 py-2">
//                   <div className="transition-all duration-200 hover:bg-gray-50 p-2 rounded-md">
//                     <p className="text-sm font-medium">Company</p>
//                     <p>{selectedLead.company}</p>
//                   </div>
//                   <div className="transition-all duration-200 hover:bg-gray-50 p-2 rounded-md">
//                     <p className="text-sm font-medium">Service Interested In</p>
//                     <p>{getServiceLabel(selectedLead.service)}</p>
//                   </div>
//                   <div className="transition-all duration-200 hover:bg-gray-50 p-2 rounded-md">
//                     <p className="text-sm font-medium">Submission Date</p>
//                     <p>{new Date(selectedLead.date).toLocaleDateString()}</p>
//                   </div>
//                   <div className="transition-all duration-200 hover:bg-gray-50 p-2 rounded-md">
//                     <p className="text-sm font-medium">Reminder</p>
//                     <p>{selectedLead.reminder ? new Date(selectedLead.reminder).toLocaleDateString() : "None set"}</p>
//                   </div>
//                 </div>
                
//                 <div className="transition-all duration-200 hover:bg-gray-50 p-2 rounded-md">
//                   <p className="text-sm font-medium">Message</p>
//                   <div className="p-3 bg-gray-50 rounded-md mt-1 text-sm">
//                     {selectedLead.message}
//                   </div>
//                 </div>
                
//                 {selectedLead.notes && (
//                   <div className="transition-all duration-200 hover:bg-gray-50 p-2 rounded-md">
//                     <p className="text-sm font-medium">Notes</p>
//                     <div className="p-3 bg-gray-50 rounded-md mt-1 text-sm">
//                       {selectedLead.notes}
//                     </div>
//                   </div>
//                 )}
                
//                 <div className="flex justify-end gap-2 pt-4">
//                   <Button 
//                     variant="outline" 
//                     onClick={() => handleOpenReminderDialog(selectedLead)}
//                     className="transition-all duration-200 hover:bg-gray-100 hover:border-gray-400"
//                   >
//                     Set Reminder
//                   </Button>
//                   <Select
//                     value={selectedLead.status}
//                     onValueChange={(value) => {
//                       handleStatusChange(selectedLead.id, value);
//                       setSelectedLead({...selectedLead, status: value});
//                     }}
//                   >
//                     <SelectTrigger className="w-36 transition-all duration-200 hover:border-gray-400">
//                       <SelectValue placeholder="Change status" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {STATUS_OPTIONS.map(option => (
//                         <SelectItem key={option.value} value={option.value}>
//                           {option.label}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>
//             )
//           }
//         </DialogContent>
//       </Dialog>

//       {/* Reminder Dialog */}
//       <Dialog open={isReminderDialogOpen} onOpenChange={setIsReminderDialogOpen}>
//         <DialogContent className="sm:max-w-md animate-scale-in">
//           <DialogHeader>
//             <DialogTitle>Set Reminder</DialogTitle>
//             <DialogDescription>
//               Choose a date to follow up with this lead
//             </DialogDescription>
//           </DialogHeader>
//           {isLoading
//             ? (
//               <div className="space-y-4 animate-fade-in">
//                 <Skeleton className="h-4 w-48" />
//                 <Skeleton className="h-10 w-full" />
//                 <Skeleton className="h-14 w-full" />
//               </div>
//             ) : selectedLead && (
//               <div className="space-y-4 animate-fade-in">
//                 <div className="transition-all duration-200 hover:bg-gray-50 p-2 rounded-md">
//                   <p className="text-sm font-medium mb-1">Lead</p>
//                   <p>{selectedLead.name} - {selectedLead.company}</p>
//                 </div>
                
//                 <div className="flex justify-center">
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button
//                         variant="outline"
//                         className="w-full justify-start text-left font-normal transition-all duration-200 hover:border-gray-400"
//                       >
//                         <CalendarIcon className="mr-2 h-4 w-4" />
//                         {reminderDate ? format(reminderDate, "PPP") : <span>Pick a date</span>}
//                       </Button>
//                     </PopoverTrigger>
//                     <PopoverContent className="w-auto p-0">
//                       <Calendar
//                         mode="single"
//                         selected={reminderDate}
//                         onSelect={setReminderDate}
//                         initialFocus
//                       />
//                     </PopoverContent>
//                   </Popover>
//                 </div>
                
//                 <div className="flex justify-end gap-2 pt-4">
//                   <Button 
//                     variant="outline" 
//                     onClick={() => setIsReminderDialogOpen(false)}
//                     className="transition-all duration-200 hover:bg-gray-100 hover:border-gray-400"
//                   >
//                     Cancel
//                   </Button>
//                   <Button 
//                     onClick={() => handleSetReminder(selectedLead.id)}
//                     disabled={!reminderDate}
//                     className="transition-all duration-200 hover:bg-gray-700"
//                   >
//                     Set Reminder
//                   </Button>
//                 </div>
//               </div>
//             )
//           }
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default AllLeads;


import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Star, StarOff, Check, Trash2, Eye, Search, Bell, ArrowUpDown, Filter, ListFilter, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

// Lead status options
const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "in_progress", label: "In Progress" },
  { value: "converted", label: "Converted" },
  { value: "lost", label: "Lost" }
];

// Priority options
const PRIORITY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" }
];

// Service options
const SERVICE_OPTIONS = [
  { value: "web_development", label: "Web Development" },
  { value: "mobile_app", label: "Mobile App Development" },
  { value: "ui_ux", label: "UI/UX Design" },
  { value: "seo", label: "SEO Optimization" },
  { value: "digital_marketing", label: "Digital Marketing" }
];

// Lead type for TypeScript
interface Lead {
  _id: string;
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  message?: string;
  createdAt?: string;
  status?: string;
  priority?: string;
  reminderDate?: string;
  notes?: string;
}

// Filter type for TypeScript
interface FilterOptions {
  status: string[];
  priority: string[];
  service: string[];
  reminderSet: boolean | null;
  dateRange: {
    start: Date | undefined;
    end: Date | undefined;
  };
}

const API_BASE_URL = "https://api.wonkrudigital.com/api/v1/lead/leads";
const AUTH_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjlhNzE5MzhmZjljMzFhNTQ4NTIxMyIsImlhdCI6MTc0NzU5NTU3MCwiZXhwIjoxNzQ4MjAwMzcwfQ.JcmivyythC4lPKsQAETi1X2l2jUOEcCeG6b7oHtm1Hc";

const AllLeads = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);
  const [reminderDate, setReminderDate] = useState<Date | undefined>(undefined);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  
  // Filter state
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    status: [],
    priority: [],
    service: [],
    reminderSet: null,
    dateRange: {
      start: undefined,
      end: undefined
    }
  });
  
  // Active filters count badge
  const activeFiltersCount = 
    filterOptions.status.length + 
    filterOptions.priority.length + 
    filterOptions.service.length + 
    (filterOptions.reminderSet !== null ? 1 : 0) +
    ((filterOptions.dateRange.start || filterOptions.dateRange.end) ? 1 : 0);
  
  // Leads data
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch leads from API
  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", AUTH_TOKEN);
  
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
  
      const response = await fetch(API_BASE_URL, requestOptions);
      const result = await response.json();
      
      // Ensure we have an array of leads, even if empty
      setLeads(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast({
        title: "Error",
        description: "Failed to fetch leads",
        variant: "destructive",
      });
      setLeads([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  };
  

  // Fetch leads on mount
  useEffect(() => {
    fetchLeads();
  }, []);

  // Update lead priority
  const updateLeadPriority = async (leadId: string, priority: string) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", AUTH_TOKEN);

      const raw = JSON.stringify({ priority });

      const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      await fetch(`${API_BASE_URL}/${leadId}/priority`, requestOptions);
      fetchLeads(); // Refresh leads after update
      
      toast({
        title: "Priority updated",
        description: "Lead priority has been updated successfully",
      });
    } catch (error) {
      console.error("Error updating priority:", error);
      toast({
        title: "Error",
        description: "Failed to update priority",
        variant: "destructive",
      });
    }
  };

  // Update lead status
  const updateLeadStatus = async (leadId: string, status: string) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", AUTH_TOKEN);

      const raw = JSON.stringify({ status });

      const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      await fetch(`${API_BASE_URL}/${leadId}/status`, requestOptions);
      fetchLeads(); // Refresh leads after update
      
      toast({
        title: "Status updated",
        description: "Lead status has been updated successfully",
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  // Set lead reminder
  const setLeadReminder = async (leadId: string, date: Date | undefined) => {
    if (!date) {
      toast({
        title: "Error",
        description: "Please select a date for the reminder",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", AUTH_TOKEN);

      const raw = JSON.stringify({
        reminderDate: date.toISOString()
      });

      const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      await fetch(`${API_BASE_URL}/${leadId}/reminder`, requestOptions);
      fetchLeads(); // Refresh leads after update
      
      setIsReminderDialogOpen(false);
      setReminderDate(undefined);
      
      toast({
        title: "Reminder set",
        description: `Reminder set for ${format(date, "PPP")}`,
      });
    } catch (error) {
      console.error("Error setting reminder:", error);
      toast({
        title: "Error",
        description: "Failed to set reminder",
        variant: "destructive",
      });
    }
  };

  // Delete lead
  const deleteLead = async (leadId: string) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", AUTH_TOKEN);

      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
      };

      await fetch(`${API_BASE_URL}/${leadId}`, requestOptions);
      fetchLeads(); // Refresh leads after delete
      
      toast({
        title: "Lead deleted",
        description: "Lead has been deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting lead:", error);
      toast({
        title: "Error",
        description: "Failed to delete lead",
        variant: "destructive",
      });
    }
  };

  // Handle sorting
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
    
    // Add animation effect on sort change
    const tableElement = document.querySelector('table');
    if (tableElement) {
      tableElement.classList.remove('animate-fade-in');
      void tableElement.offsetWidth; // Force reflow
      tableElement.classList.add('animate-fade-in');
    }
    
    toast({
      title: "Sorting updated",
      description: `Sorted by ${column} in ${sortDirection === "asc" ? "descending" : "ascending"} order`,
    });
  };

  // Sort leads based on current sort column and direction
  const sortedLeads = [...leads].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aValue = a[sortColumn as keyof Lead];
    const bValue = b[sortColumn as keyof Lead];
    
    if (aValue === bValue) return 0;
    
    const comparison = aValue < bValue ? -1 : 1;
    return sortDirection === "asc" ? comparison : -comparison;
  });

  // Apply filters to leads
  const filteredByOptions = sortedLeads.filter(lead => {
    // Status filter
    if (filterOptions.status.length > 0 && !filterOptions.status.includes(lead.status)) {
      return false;
    }
    
    // Priority filter
    if (filterOptions.priority.length > 0 && !filterOptions.priority.includes(lead.priority)) {
      return false;
    }
    
    // Service filter
    if (filterOptions.service.length > 0 && !filterOptions.service.includes(lead.serviceInterestedIn)) {
      return false;
    }
    
    // Reminder filter
    if (filterOptions.reminderSet === true && !lead.reminderDate) {
      return false;
    }
    if (filterOptions.reminderSet === false && lead.reminderDate) {
      return false;
    }
    
    // Date range filter
    if (filterOptions.dateRange.start || filterOptions.dateRange.end) {
      const leadDate = new Date(lead.createdAt);
      if (filterOptions.dateRange.start && leadDate < filterOptions.dateRange.start) {
        return false;
      }
      if (filterOptions.dateRange.end) {
        const endDateCopy = new Date(filterOptions.dateRange.end);
        endDateCopy.setHours(23, 59, 59, 999); // Set to end of the day
        if (leadDate > endDateCopy) {
          return false;
        }
      }
    }
    
    return true;
  });

  // Filter leads based on search query
  const filteredLeads = filteredByOptions.filter(lead => {
    if (!lead) return false; // Skip if lead is undefined
    
    const searchString = searchQuery.toLowerCase();
    
    // Safely access properties with optional chaining and nullish coalescing
    const name = lead.fullName?.toLowerCase() ?? '';
    const email = lead.email?.toLowerCase() ?? '';
    const company = lead.companyName?.toLowerCase() ?? '';
    const service = SERVICE_OPTIONS.find(option => option.value === lead.serviceInterestedIn)?.label.toLowerCase() ?? '';
    const message = lead.message?.toLowerCase() ?? '';
    
    return (
      name.includes(searchString) ||
      email.includes(searchString) ||
      company.includes(searchString) ||
      service.includes(searchString) ||
      message.includes(searchString)
    );
  });

  // Toggle filter for status, priority, service
  const toggleFilter = (type: 'status' | 'priority' | 'service', value: string) => {
    setFilterOptions(prev => {
      const currentValues = [...prev[type]];
      const valueIndex = currentValues.indexOf(value);
      
      if (valueIndex === -1) {
        // Add the value
        return {
          ...prev,
          [type]: [...currentValues, value]
        };
      } else {
        // Remove the value
        currentValues.splice(valueIndex, 1);
        return {
          ...prev,
          [type]: currentValues
        };
      }
    });
  };
  
  // Toggle reminder filter
  const toggleReminderFilter = (hasReminder: boolean | null) => {
    setFilterOptions(prev => ({
      ...prev,
      reminderSet: hasReminder
    }));
  };
  
  // Set date range filter
  const setDateRangeFilter = (key: 'start' | 'end', date: Date | undefined) => {
    setFilterOptions(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [key]: date
      }
    }));
  };
  
  // Clear all filters
  const clearAllFilters = () => {
    setFilterOptions({
      status: [],
      priority: [],
      service: [],
      reminderSet: null,
      dateRange: {
        start: undefined,
        end: undefined
      }
    });
    
    toast({
      title: "Filters cleared",
      description: "All filters have been reset",
    });
  };
  
  // Clear specific filter type
  const clearFilterType = (type: keyof FilterOptions) => {
    if (type === 'dateRange') {
      setFilterOptions(prev => ({
        ...prev,
        dateRange: {
          start: undefined,
          end: undefined
        }
      }));
    } else {
      setFilterOptions(prev => ({
        ...prev,
        [type]: type === 'reminderSet' ? null : []
      }));
    }
  };

  // Handle priority toggle
  const handleTogglePriority = (id: string) => {
    const lead = leads.find(l => l._id === id);
    if (!lead) return;
    
    const newPriority = lead.priority === "high" ? "low" : 
                      lead.priority === "medium" ? "high" : "medium";
    updateLeadPriority(id, newPriority);
  };

  // Handle status change
  const handleStatusChange = (id: string, status: string) => {
    updateLeadStatus(id, status);
  };

  // Handle setting a reminder
  const handleSetReminder = (id: string) => {
    setLeadReminder(id, reminderDate);
  };

  // Handle deleting a lead
  const handleDeleteLead = (id: string) => {
    deleteLead(id);
  };

  // Handle viewing lead details
  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
    setIsViewDialogOpen(true);
  };

  // Handle setting a reminder for a lead
  const handleOpenReminderDialog = (lead: Lead) => {
    setSelectedLead(lead);
    if (lead.reminderDate) {
      setReminderDate(new Date(lead.reminderDate));
    } else {
      setReminderDate(undefined);
    }
    setIsReminderDialogOpen(true);
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">New</Badge>;
      case "contacted":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Contacted</Badge>;
      case "in_progress":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">In Progress</Badge>;
      case "converted":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Converted</Badge>;
      case "lost":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Lost</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>;
      case "medium":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Medium</Badge>;
      case "low":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  // Get service label from value
  const getServiceLabel = (serviceValue: string) => {
    return SERVICE_OPTIONS.find(option => option.value === serviceValue)?.label || serviceValue;
  };

  // Active filter badges
  const renderActiveFilterBadges = () => {
    const badges = [];
    
    // Status filters
    filterOptions.status.forEach(status => {
      badges.push(
        <Badge 
          key={`status-${status}`} 
          variant="outline" 
          className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 transition-colors animate-fade-in"
        >
          {STATUS_OPTIONS.find(opt => opt.value === status)?.label}
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => toggleFilter('status', status)}
          />
        </Badge>
      );
    });
    
    // Priority filters
    filterOptions.priority.forEach(priority => {
      badges.push(
        <Badge 
          key={`priority-${priority}`} 
          variant="outline" 
          className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 transition-colors animate-fade-in"
        >
          {PRIORITY_OPTIONS.find(opt => opt.value === priority)?.label} Priority
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => toggleFilter('priority', priority)}
          />
        </Badge>
      );
    });
    
    // Service filters
    filterOptions.service.forEach(service => {
      badges.push(
        <Badge 
          key={`service-${service}`} 
          variant="outline" 
          className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 transition-colors animate-fade-in"
        >
          {SERVICE_OPTIONS.find(opt => opt.value === service)?.label}
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => toggleFilter('service', service)}
          />
        </Badge>
      );
    });
    
    // Reminder filter
    if (filterOptions.reminderSet !== null) {
      badges.push(
        <Badge 
          key="reminder" 
          variant="outline" 
          className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 transition-colors animate-fade-in"
        >
          {filterOptions.reminderSet ? "Has Reminder" : "No Reminder"}
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => toggleReminderFilter(null)}
          />
        </Badge>
      );
    }
    
    // Date range filter
    if (filterOptions.dateRange.start || filterOptions.dateRange.end) {
      const dateText = filterOptions.dateRange.start && filterOptions.dateRange.end
        ? `${format(filterOptions.dateRange.start, "MMM d")} - ${format(filterOptions.dateRange.end, "MMM d")}`
        : filterOptions.dateRange.start
          ? `After ${format(filterOptions.dateRange.start, "MMM d")}`
          : `Before ${format(filterOptions.dateRange.end!, "MMM d")}`;
      
      badges.push(
        <Badge 
          key="date-range" 
          variant="outline" 
          className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 transition-colors animate-fade-in"
        >
          {dateText}
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => clearFilterType('dateRange')}
          />
        </Badge>
      );
    }
    
    return badges;
  };

  const renderSkeletonRows = (count: number) => (
    Array.from({ length: count }).map((_, i) => (
      <TableRow key={`skeleton-${i}`}>
        <TableCell>
          <Skeleton className="w-8 h-8 rounded-full" />
        </TableCell>
        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
        <TableCell><Skeleton className="h-4 w-32" /></TableCell>
        <TableCell><Skeleton className="h-4 w-28" /></TableCell>
        <TableCell><Skeleton className="h-4 w-36" /></TableCell>
        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
        <TableCell><Skeleton className="h-6 w-20 rounded" /></TableCell>
        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
        <TableCell className="text-right flex gap-2 justify-end">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </TableCell>
      </TableRow>
    ))
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight hover:text-gray-700 transition-colors">Lead Management</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 hover:border-gray-400 transition-colors focus:ring-2 focus:ring-gray-200"
            />
          </div>
          
          <Popover open={isFilterMenuOpen} onOpenChange={setIsFilterMenuOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                className="transition-all duration-200 hover:bg-gray-100 hover:border-gray-400 relative"
              >
                <Filter className="h-4 w-4" />
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 animate-scale-in">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">Filter Leads</h4>
                  {activeFiltersCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearAllFilters}
                      className="text-xs h-8 px-2 hover:bg-gray-100 transition-colors"
                    >
                      Clear all
                    </Button>
                  )}
                </div>
                
                <div>
                  <h5 className="text-sm font-medium mb-1.5">By Status</h5>
                  <div className="flex flex-wrap gap-1">
                    {STATUS_OPTIONS.map(option => (
                      <Badge 
                        key={option.value}
                        variant={filterOptions.status.includes(option.value) ? "default" : "outline"}
                        className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                          filterOptions.status.includes(option.value) 
                            ? "bg-gray-800 hover:bg-gray-700" 
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => toggleFilter('status', option.value)}
                      >
                        {option.label}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium mb-1.5">By Priority</h5>
                  <div className="flex flex-wrap gap-1">
                    {PRIORITY_OPTIONS.map(option => (
                      <Badge 
                        key={option.value}
                        variant={filterOptions.priority.includes(option.value) ? "default" : "outline"}
                        className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                          filterOptions.priority.includes(option.value) 
                            ? "bg-gray-800 hover:bg-gray-700" 
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => toggleFilter('priority', option.value)}
                      >
                        {option.label}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium mb-1.5">By Service</h5>
                  <div className="flex flex-wrap gap-1">
                    {SERVICE_OPTIONS.map(option => (
                      <Badge 
                        key={option.value}
                        variant={filterOptions.service.includes(option.value) ? "default" : "outline"}
                        className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                          filterOptions.service.includes(option.value) 
                            ? "bg-gray-800 hover:bg-gray-700" 
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => toggleFilter('service', option.value)}
                      >
                        {option.label}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium mb-1.5">By Reminder</h5>
                  <div className="flex flex-wrap gap-1">
                    <Badge 
                      variant={filterOptions.reminderSet === true ? "default" : "outline"}
                      className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                        filterOptions.reminderSet === true 
                          ? "bg-gray-800 hover:bg-gray-700" 
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => toggleReminderFilter(filterOptions.reminderSet === true ? null : true)}
                    >
                      Has Reminder
                    </Badge>
                    <Badge 
                      variant={filterOptions.reminderSet === false ? "default" : "outline"}
                      className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                        filterOptions.reminderSet === false 
                          ? "bg-gray-800 hover:bg-gray-700" 
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => toggleReminderFilter(filterOptions.reminderSet === false ? null : false)}
                    >
                      No Reminder
                    </Badge>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium mb-1.5">By Date Range</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left text-xs h-8 transition-colors ${
                            filterOptions.dateRange.start ? "border-gray-400" : ""
                          }`}
                        >
                          {filterOptions.dateRange.start ? (
                            format(filterOptions.dateRange.start, "PPP")
                          ) : (
                            <span className="text-muted-foreground">Start date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={filterOptions.dateRange.start}
                          onSelect={(date) => setDateRangeFilter('start', date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full justify-start text-left text-xs h-8 transition-colors ${
                            filterOptions.dateRange.end ? "border-gray-400" : ""
                          }`}
                        >
                          {filterOptions.dateRange.end ? (
                            format(filterOptions.dateRange.end, "PPP")
                          ) : (
                            <span className="text-muted-foreground">End date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={filterOptions.dateRange.end}
                          onSelect={(date) => setDateRangeFilter('end', date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                
                <Button 
                  className="w-full transition-all duration-200 hover:bg-gray-700 animate-fade-in"
                  onClick={() => setIsFilterMenuOpen(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      {/* Active filters display */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2 animate-fade-in">
          <div className="text-sm text-muted-foreground">Active filters:</div>
          <div className="flex flex-wrap gap-1.5">
            {renderActiveFilterBadges()}
          </div>
        </div>
      )}
      
      <Card className="transition-all duration-300 hover:shadow-md">
        <CardHeader>
          <CardTitle className="hover:text-gray-700 transition-colors">All Leads</CardTitle>
          <CardDescription>Manage and track all incoming leads</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Priority</TableHead>
                <TableHead 
                  className="cursor-pointer transition-colors hover:text-gray-800" 
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Name
                    {sortColumn === "name" && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${sortDirection === "desc" ? "transform rotate-180" : ""}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer transition-colors hover:text-gray-800" 
                  onClick={() => handleSort("email")}
                >
                  <div className="flex items-center">
                    Email
                    {sortColumn === "email" && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${sortDirection === "desc" ? "transform rotate-180" : ""}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer transition-colors hover:text-gray-800" 
                  onClick={() => handleSort("company")}
                >
                  <div className="flex items-center">
                    Company
                    {sortColumn === "company" && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${sortDirection === "desc" ? "transform rotate-180" : ""}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer transition-colors hover:text-gray-800" 
                  onClick={() => handleSort("service")}
                >
                  <div className="flex items-center">
                    Service
                    {sortColumn === "service" && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${sortDirection === "desc" ? "transform rotate-180" : ""}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer transition-colors hover:text-gray-800" 
                  onClick={() => handleSort("createdAt")}
                >
                  <div className="flex items-center">
                    Date
                    {sortColumn === "createdAt" && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${sortDirection === "desc" ? "transform rotate-180" : ""}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer transition-colors hover:text-gray-800"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    Status
                    {sortColumn === "status" && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${sortDirection === "desc" ? "transform rotate-180" : ""}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer transition-colors hover:text-gray-800"
                  onClick={() => handleSort("reminderDate")}
                >
                  <div className="flex items-center">
                    Reminder
                    {sortColumn === "reminderDate" && (
                      <ArrowUpDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${sortDirection === "desc" ? "transform rotate-180" : ""}`} />
                    )}
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? renderSkeletonRows(5)
                : filteredLeads.map((lead) => (
                    <TableRow key={lead._id} className="group animate-fade-in">
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleTogglePriority(lead._id)}
                          className={`transition-all duration-200 ${
                            lead.priority === "high" 
                              ? "text-red-500 hover:text-red-600" 
                              : lead.priority === "medium"
                                ? "text-amber-500 hover:text-amber-600"
                                : "text-gray-400 hover:text-gray-500"
                          } group-hover:scale-110`}
                        >
                          {lead.priority === "high" ? (
                            <Star className="h-4 w-4 fill-current" />
                          ) : lead.priority === "medium" ? (
                            <Star className="h-4 w-4" />
                          ) : (
                            <StarOff className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className="font-medium transition-colors group-hover:text-gray-800">{lead.fullName}</TableCell>
                      <TableCell className="transition-colors group-hover:text-gray-800">{lead.email}</TableCell>
                      <TableCell className="transition-colors group-hover:text-gray-800">{lead.companyName}</TableCell>
                      <TableCell className="transition-colors group-hover:text-gray-800">{getServiceLabel(lead.serviceInterestedIn)}</TableCell>
                      <TableCell className="transition-colors group-hover:text-gray-800">{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Select
                          value={lead.status}
                          onValueChange={(value) => handleStatusChange(lead._id, value)}
                        >
                          <SelectTrigger className="w-28 h-8 px-2 transition-all duration-200 group-hover:border-gray-400">
                            <SelectValue>{getStatusBadge(lead.status)}</SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {STATUS_OPTIONS.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {getStatusBadge(option.value)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {lead.reminderDate ? (
                          <div className="flex items-center text-sm transition-colors group-hover:text-gray-800">
                            <CalendarIcon className="mr-1 h-3 w-3" />
                            {new Date(lead.reminderDate).toLocaleDateString()}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">None</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleViewLead(lead)}
                            className="transition-all duration-200 hover:bg-gray-100 hover:border-gray-400 group-hover:scale-105"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleOpenReminderDialog(lead)}
                            className="transition-all duration-200 hover:bg-gray-100 hover:border-gray-400 group-hover:scale-105"
                          >
                            <Bell className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="text-red-500 transition-all duration-200 hover:bg-red-50 hover:border-red-200 group-hover:scale-105" 
                            onClick={() => handleDeleteLead(lead._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
              }
              {!isLoading && filteredLeads.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground animate-fade-in">
                    No leads found. Try adjusting your search or filter criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Lead Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-lg animate-scale-in">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected lead
            </DialogDescription>
          </DialogHeader>
          {isLoading
            ? (
              <div className="space-y-4 animate-fade-in">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-52 w-full" />
              </div>
            ) : selectedLead && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold transition-colors hover:text-gray-700">{selectedLead.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedLead.email}</p>
                  </div>
                  <div className="space-y-1 text-right">
                    {getPriorityBadge(selectedLead.priority)}
                    <div className="mt-1">{getStatusBadge(selectedLead.status)}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 py-2">
                  <div className="transition-all duration-200 hover:bg-gray-50 p-2 rounded-md">
                    <p className="text-sm font-medium">Company</p>
                    <p>{selectedLead.company}</p>
                  </div>
                  <div className="transition-all duration-200 hover:bg-gray-50 p-2 rounded-md">
                    <p className="text-sm font-medium">Service Interested In</p>
                    <p>{getServiceLabel(selectedLead.service)}</p>
                  </div>
                  <div className="transition-all duration-200 hover:bg-gray-50 p-2 rounded-md">
                    <p className="text-sm font-medium">Submission Date</p>
                    <p>{new Date(selectedLead.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="transition-all duration-200 hover:bg-gray-50 p-2 rounded-md">
                    <p className="text-sm font-medium">Reminder</p>
                    <p>{selectedLead.reminderDate ? new Date(selectedLead.reminderDate).toLocaleDateString() : "None set"}</p>
                  </div>
                </div>
                
                <div className="transition-all duration-200 hover:bg-gray-50 p-2 rounded-md">
                  <p className="text-sm font-medium">Message</p>
                  <div className="p-3 bg-gray-50 rounded-md mt-1 text-sm">
                    {selectedLead.message}
                  </div>
                </div>
                
                {selectedLead.notes && (
                  <div className="transition-all duration-200 hover:bg-gray-50 p-2 rounded-md">
                    <p className="text-sm font-medium">Notes</p>
                    <div className="p-3 bg-gray-50 rounded-md mt-1 text-sm">
                      {selectedLead.notes}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => handleOpenReminderDialog(selectedLead)}
                    className="transition-all duration-200 hover:bg-gray-100 hover:border-gray-400"
                  >
                    Set Reminder
                  </Button>
                  <Select
                    value={selectedLead.status}
                    onValueChange={(value) => {
                      handleStatusChange(selectedLead._id, value);
                      setSelectedLead({...selectedLead, status: value});
                    }}
                  >
                    <SelectTrigger className="w-36 transition-all duration-200 hover:border-gray-400">
                      <SelectValue placeholder="Change status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )
          }
        </DialogContent>
      </Dialog>

      {/* Reminder Dialog */}
      <Dialog open={isReminderDialogOpen} onOpenChange={setIsReminderDialogOpen}>
        <DialogContent className="sm:max-w-md animate-scale-in">
          <DialogHeader>
            <DialogTitle>Set Reminder</DialogTitle>
            <DialogDescription>
              Choose a date to follow up with this lead
            </DialogDescription>
          </DialogHeader>
          {isLoading
            ? (
              <div className="space-y-4 animate-fade-in">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-14 w-full" />
              </div>
            ) : selectedLead && (
              <div className="space-y-4 animate-fade-in">
                <div className="transition-all duration-200 hover:bg-gray-50 p-2 rounded-md">
                  <p className="text-sm font-medium mb-1">Lead</p>
                  <p>{selectedLead.name} - {selectedLead.company}</p>
                </div>
                
                <div className="flex justify-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal transition-all duration-200 hover:border-gray-400"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {reminderDate ? format(reminderDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={reminderDate}
                        onSelect={setReminderDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsReminderDialogOpen(false)}
                    className="transition-all duration-200 hover:bg-gray-100 hover:border-gray-400"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => handleSetReminder(selectedLead._id)}
                    disabled={!reminderDate}
                    className="transition-all duration-200 hover:bg-gray-700"
                  >
                    Set Reminder
                  </Button>
                </div>
              </div>
            )
          }
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllLeads;