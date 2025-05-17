
import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { 
  LayoutDashboard, 
  Image, 
  Wrench, 
  Factory, 
  FolderKanban, 
  FileText, 
  Users,
  BarChart, 
  Settings, 
  Mail, 
  LogOut, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Check if user is authenticated
    const isAuth = localStorage.getItem("adminAuth") === "true";
    if (!isAuth) {
      navigate("/admin/login");
    } else {
      setAuthenticated(true);
    }

    // Close sidebar on mobile by default
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [navigate, isMobile]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin panel",
    });
    navigate("/admin/login");
  };

  const toggleSubmenu = (menu: string) => {
    if (activeSubmenu === menu) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(menu);
    }
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/admin/dashboard",
      submenu: false,
    },
    {
      title: "Website Content",
      icon: <Image className="h-5 w-5" />,
      submenu: true,
      submenuTitle: "website-content",
      items: [
        { title: "Hero Section", path: "/admin/website/hero" },
        { title: "Technical Services", path: "/admin/website/services" },
        { title: "Industries", path: "/admin/website/industries" },
        { title: "Projects", path: "/admin/website/projects" },
        { title: "Blogs", path: "/admin/website/blogs" },
      ],
    },
    {
      title: "Lead Management",
      icon: <Users className="h-5 w-5" />,
      submenu: true,
      submenuTitle: "leads",
      items: [
        { title: "All Leads", path: "/admin/leads/all" },
        { title: "Priority Leads", path: "/admin/leads/priority" },
        { title: "Converted Leads", path: "/admin/leads/converted" },
        { title: "Archived Leads", path: "/admin/leads/archived" },
      ],
    },
    {
      title: "Analytics",
      icon: <BarChart className="h-5 w-5" />,
      path: "/admin/analytics",
      submenu: false,
    },
    {
      title: "Newsletter",
      icon: <Mail className="h-5 w-5" />,
      path: "/admin/newsletter",
      submenu: false,
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      submenu: true,
      submenuTitle: "settings",
      items: [
        { title: "Company Profile", path: "/admin/settings/company" },
        { title: "Contact Details", path: "/admin/settings/contact" },
        { title: "Working Hours", path: "/admin/settings/hours" },
        { title: "Social Media", path: "/admin/settings/social" },
        { title: "Service Categories", path: "/admin/settings/services" },
        { title: "Theme Settings", path: "/admin/settings/theme" },
      ],
    },
  ];

  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="fixed z-40 top-4 left-4 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white shadow-md border-gray-200"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="font-bold text-xl text-indigo-600">Wonkru Digital</div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {menuItems.map((item) => (
                <div key={item.title}>
                  {item.submenu ? (
                    <div>
                      <button
                        className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        onClick={() => toggleSubmenu(item.submenuTitle as string)}
                      >
                        {item.icon}
                        <span className="ml-3 flex-1">{item.title}</span>
                        {activeSubmenu === item.submenuTitle ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      {activeSubmenu === item.submenuTitle && (
                        <div className="mt-1 space-y-1 ml-7">
                          {item.items?.map((subItem) => (
                            <button
                              key={subItem.title}
                              className="w-full text-left pl-3 pr-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                              onClick={() => {
                                navigate(subItem.path);
                                if (isMobile) setSidebarOpen(false);
                              }}
                            >
                              {subItem.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => {
                        navigate(item.path as string);
                        if (isMobile) setSidebarOpen(false);
                      }}
                    >
                      {item.icon}
                      <span className="ml-3">{item.title}</span>
                    </button>
                  )}
                </div>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t border-gray-200">
            <button
              className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          sidebarOpen ? "md:ml-64" : "ml-0",
          "md:ml-64"
        )}
      >
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <Toaster />
    </div>
  );
};

export default AdminLayout;
