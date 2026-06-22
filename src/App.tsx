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
import GalleryAlbum from "./pages/GalleryAlbum";
import Schedule from "./pages/Schedule";
import Press from "./pages/Press";
import Register from "./pages/Register";
import AuthorDetail from "./pages/AuthorDetail";
import Media from "./pages/Media";
import PaymentSuccess from "./pages/PaymentSuccess";
import Evaluation from "./pages/Evaluation";
import EvaluationQR from "./pages/EvaluationQR";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Conference from "./pages/Conference";
import Edition2026 from "./pages/Edition2026";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import OsPage from "./pages/OsPage";
import { BlogIndex, BlogPost } from "./pages/Blog";
import { OsEventsIndex, OsEventDetail } from "./pages/OsEvents";
import EwomanOsPreview from "./pages/OsPreview";

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
      <BrowserRouter>
        <Routes>
          {/* H8.1 — OS secure preview: no Layout, no ContentProvider, no nav/footer */}
          <Route path="/os-preview/ewoman" element={<EwomanOsPreview />} />

          {/* Public site — all routes wrapped in ContentProvider + Layout */}
          <Route
            path="*"
            element={
              <ContentProvider>
                <Layout>
                  <Suspense fallback={<div className="min-h-screen gradient-magenta" />}>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/speakers" element={<Speakers />} />
                      <Route path="/speakers/:slug" element={<SpeakerDetail />} />
                      <Route path="/gallery" element={<Gallery />} />
                      <Route path="/gallery/:album" element={<GalleryAlbum />} />
                      <Route path="/schedule" element={<Schedule />} />
                      <Route path="/press" element={<Press />} />
                      <Route path="/media" element={<Media />} />
                      <Route path="/authors/:slug" element={<AuthorDetail />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/payment-success" element={<PaymentSuccess />} />
                      <Route path="/evaluation" element={<Evaluation />} />
                      <Route path="/evaluation-qr" element={<EvaluationQR />} />
                      <Route path="/checkin" element={<CheckIn />} />
                      <Route path="/ticket/:reference" element={<Ticket />} />
                      <Route path="/admin" element={<AdminDashboard />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/conference" element={<Conference />} />
                      <Route path="/2026-edition" element={<Edition2026 />} />
                      <Route path="/testimonials" element={<Testimonials />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/p/:slug" element={<OsPage />} />
                      <Route path="/blog" element={<BlogIndex />} />
                      <Route path="/blog/:slug" element={<BlogPost />} />
                      <Route path="/os-events" element={<OsEventsIndex />} />
                      <Route path="/os-events/:slug" element={<OsEventDetail />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </Layout>
              </ContentProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
