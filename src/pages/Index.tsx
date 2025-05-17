
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-900">
      <div className="text-center px-6 py-12 max-w-lg mx-auto bg-white/10 backdrop-blur-sm rounded-xl shadow-xl">
        <h1 className="text-4xl font-bold text-white mb-6">
          Wonkru Digital <span className="text-indigo-300">Admin</span>
        </h1>
        <p className="text-lg text-white/80 mb-8">
          Manage your website content, leads, and analytics all in one place.
        </p>
        <Button 
          onClick={() => navigate("/admin/login")} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg rounded-lg transition-all"
        >
          Access Admin Panel
        </Button>
      </div>
    </div>
  );
};

export default Index;
