
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import HeroSection from "./pages/admin/website/HeroSection";
import TechnicalServices from "./pages/admin/website/TechnicalServices";
import Industries from "./pages/admin/website/Industries";
import Projects from "./pages/admin/website/Projects";
import Blogs from "./pages/admin/website/Blogs";
import AllLeads from "./pages/admin/leads/AllLeads";
import Analytics from "./pages/admin/Analytics";
import Newsletter from "./pages/admin/Newsletter";
import CompanySettings from "./pages/admin/settings/Company";
import ContactSettings from "./pages/admin/settings/Contact";
import HoursSettings from "./pages/admin/settings/Hours";
import SocialSettings from "./pages/admin/settings/Social";
import ServiceSettings from "./pages/admin/settings/Services";
import ThemeSettings from "./pages/admin/settings/Theme";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            
            {/* Website Content Routes */}
            <Route path="website/hero" element={<HeroSection />} />
            <Route path="website/services" element={<TechnicalServices />} />
            <Route path="website/industries" element={<Industries />} />
            <Route path="website/projects" element={<Projects />} />
            <Route path="website/blogs" element={<Blogs />} />
            
            {/* Lead Management Routes */}
            <Route path="leads/all" element={<AllLeads />} />
            <Route path="leads/priority" element={<AllLeads />} />
            <Route path="leads/converted" element={<AllLeads />} />
            <Route path="leads/archived" element={<AllLeads />} />
            
            {/* Analytics Route */}
            <Route path="analytics" element={<Analytics />} />
            
            {/* Newsletter Route */}
            <Route path="newsletter" element={<Newsletter />} />
            
            {/* Settings Routes */}
            <Route path="settings/company" element={<CompanySettings />} />
            <Route path="settings/contact" element={<ContactSettings />} />
            <Route path="settings/hours" element={<HoursSettings />} />
            <Route path="settings/social" element={<SocialSettings />} />
            <Route path="settings/services" element={<ServiceSettings />} />
            <Route path="settings/theme" element={<ThemeSettings />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
