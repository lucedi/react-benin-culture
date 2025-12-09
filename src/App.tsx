import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Explore from "./pages/Explore";
import ContentDetail from "./pages/ContentDetail";
import CreateContent from "./pages/CreateContent";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardModeration from "./pages/dashboard/DashboardModeration";
import DashboardUsers from "./pages/dashboard/DashboardUsers";
import Transactions from "./pages/dashboard/Transactions";
import PaymentCallback from "./pages/PaymentCallback";
import NotFound from "./pages/NotFound";
import TypeContentDetails from "./pages/TypeContentDetails";
import Regions from "./pages/Regions";
import RegionContenus from "./pages/RegionContenus";
import "@/lib/axios"; // Initialize axios interceptors

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/explorer" element={<Explore />} />
            <Route path="/regions" element={<Regions />} />
            <Route path="/region/:regionId/contenus" element={<RegionContenus />} />
            <Route path="/content/:id" element={<ContentDetail />} />
            <Route path="/type-contenu/:id" element={<TypeContentDetails />} />
            <Route path="/publier" element={<CreateContent />} />
            <Route path="/payment/callback" element={<PaymentCallback />} />
            {/* Protected Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/moderation"
              element={
                <ProtectedRoute requireAdmin>
                  <DashboardModeration />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/users"
              element={
                <ProtectedRoute requireAdmin>
                  <DashboardUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/transactions"
              element={
                <ProtectedRoute>
                  <Transactions />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
