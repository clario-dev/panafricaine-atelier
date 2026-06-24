import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Atelier from "./pages/Atelier";
import CollectionsIndex from "./pages/CollectionsIndex";
import CollectionDetail from "./pages/CollectionDetail";
import SurMesure from "./pages/SurMesure";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/atelier" element={<Atelier />} />
        <Route path="/collections" element={<CollectionsIndex />} />
        <Route path="/collections/:slug" element={<CollectionDetail />} />
        <Route path="/sur-mesure" element={<SurMesure />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
