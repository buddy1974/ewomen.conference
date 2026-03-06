import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContentProvider } from "@/contexts/ContentContext";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Speakers from "./pages/Speakers";
import SpeakerDetail from "./pages/SpeakerDetail";
import Gallery from "./pages/Gallery";
import Schedule from "./pages/Schedule";
import Press from "./pages/Press";
import Register from "./pages/Register";
import AuthorDetail from "./pages/AuthorDetail";
import Media from "./pages/Media";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";

// Heavy event-operations pages — lazy-loaded to keep main bundle small
const CheckIn = lazy(() => import("./pages/CheckIn"));
const Ticket = lazy(() => import("./pages/Ticket"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ContentProvider>
        <BrowserRouter>
          <Layout>
            <Suspense fallback={<div className="min-h-screen gradient-magenta" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/speakers" element={<Speakers />} />
              <Route path="/speakers/:slug" element={<SpeakerDetail />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/press" element={<Press />} />
              <Route path="/media" element={<Media />} />
              <Route path="/authors/:slug" element={<AuthorDetail />} />
              <Route path="/register" element={<Register />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/checkin" element={<CheckIn />} />
              <Route path="/ticket/:reference" element={<Ticket />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
      </ContentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
