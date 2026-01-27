import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import CategoriesPage from '@/pages/CategoriesPage';
import NewsPage from '@/pages/NewsPage';
import NewsDetailPage from '@/pages/NewsDetailPage';
import DrawingDetailPage from '@/pages/DrawingDetailPage';
import SupportPage from '@/pages/SupportPage';
import AdminDashboard from '@/pages/AdminDashboard';
import { Toaster } from '@/components/ui/toaster';
import { NewsProvider } from '@/contexts/NewsContext';
import { DrawingsProvider } from '@/contexts/DrawingsContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <NewsProvider>
        <DrawingsProvider>
          <Router>
            <Helmet>
              <title>FreeColoringBookIds - Free Coloring Pages for Kids | freecoloringbookids.com</title>
              <meta name="description" content="Download and print free coloring pages for kids. Explore hundreds of coloring book designs at freecoloringbookids.com" />
              <meta property="og:title" content="FreeColoringBookIds - Free Coloring Pages for Kids" />
              <meta property="og:description" content="Download and print free coloring pages for kids at freecoloringbookids.com" />
              <meta property="og:site_name" content="FreeColoringBookIds" />
            </Helmet>
            
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/categorias" element={<CategoriesPage />} />
                <Route path="/noticias" element={<NewsPage />} />
                <Route path="/noticias/:id" element={<NewsDetailPage />} />
                <Route path="/desenho/:id" element={<DrawingDetailPage />} />
                <Route path="/apoie" element={<SupportPage />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
              
              <Toaster />
            </div>
          </Router>
        </DrawingsProvider>
      </NewsProvider>
    </LanguageProvider>
  );
}

export default App;