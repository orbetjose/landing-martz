import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { LanguageProvider } from "./components/LanguageContext.tsx";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out",
      once: true,
      offset: 80,
      disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <LanguageProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Post />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
