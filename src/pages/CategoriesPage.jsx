import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Filter } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import FilterSidebar from '@/components/FilterSidebar';
import ColoringGrid from '@/components/ColoringGrid';
import { useDrawings } from '@/contexts/DrawingsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/data/translations';
import { Button } from '@/components/ui/button';
import AdSensePlaceholder from '@/components/AdSensePlaceholder';

const CategoriesPage = () => {
  const { drawings } = useDrawings();
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const location = useLocation();

  // Filter State
  const [filters, setFilters] = useState({
    categories: [],
    subcategories: [],
    difficulty: [],
    ageGroup: []
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('downloads');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Initialize search from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location.search]);

  // Filter Logic
  const filteredDrawings = drawings.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.subcategory.toLowerCase().includes(searchQuery.toLowerCase());

    const matchCategory = filters.categories.length === 0 || filters.categories.includes(item.category);
    const matchSubcategory = filters.subcategories.length === 0 || filters.subcategories.includes(item.subcategory);
    const matchDifficulty = filters.difficulty.length === 0 || filters.difficulty.includes(item.difficulty);
    const matchAge = filters.ageGroup.length === 0 || filters.ageGroup.includes(item.ageGroup);

    return matchSearch && matchCategory && matchSubcategory && matchDifficulty && matchAge;
  });

  // Sort Logic
  const sortedDrawings = [...filteredDrawings].sort((a, b) => {
    if (sortOption === 'downloads') return b.downloads - a.downloads;
    if (sortOption === 'recent') return new Date(b.dateAdded) - new Date(a.dateAdded);
    if (sortOption === 'rating') return b.rating - a.rating;
    return 0;
  });

  // Pagination Logic
  const totalPages = Math.ceil(sortedDrawings.length / itemsPerPage);
  const currentDrawings = sortedDrawings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers
  const handleFilterChange = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }));
    setCurrentPage(1);
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [filters, sortOption, searchQuery]);

  // Traduzir meta tags
  const metaTitle = language === 'en' 
    ? 'Categories | FreeColoringBookids - Coloring Pages'
    : language === 'es'
    ? 'Categorías | FreeColoringBookids - Dibujos para Colorear'
    : 'Categorias | FreeColoringBookids - Desenhos para Colorir';

  const metaDescription = language === 'en'
    ? 'Browse our categories of coloring pages. Find mandalas, animals, educational drawings and more. Free to print.'
    : language === 'es'
    ? 'Navega por nuestras categorías de dibujos para colorear. Encuentra mandalas, animales, dibujos educativos y más. Gratis para imprimir.'
    : 'Navegue por nossas categorias de desenhos para colorir. Encontre mandalas, animais, desenhos educativos e muito mais. Grátis para imprimir.';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>

      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: t('categories'), href: null }]} />
        <AdSensePlaceholder size="728x90" className="my-16" />
        
        {searchQuery && (
          <div className="mb-6 flex items-center gap-2">
            <span className="text-gray-600">
              {language === 'en' ? 'Results for:' : language === 'es' ? 'Resultados para:' : 'Resultados para:'}
            </span>
            <span className="font-semibold text-purple-600">"{searchQuery}"</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSearchQuery('')}
              className="ml-2 h-auto py-0 px-2 text-xs text-gray-500 hover:text-red-500"
            >
              ({language === 'en' ? 'Clear search' : language === 'es' ? 'Limpiar búsqueda' : 'Limpar busca'})
            </Button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
          </aside>
          
          <div className="flex-1">
            <div className="lg:hidden mb-4">
              <Button 
                onClick={() => setIsMobileFilterOpen(true)}
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 bg-white"
              >
                <Filter className="w-4 h-4" />
                {language === 'en' ? 'Filter Results' : language === 'es' ? 'Filtrar Resultados' : 'Filtrar Resultados'}
              </Button>
            </div>

            <ColoringGrid 
              drawings={currentDrawings}
              loading={loading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              sortOption={sortOption}
              onSortChange={setSortOption}
              totalItems={sortedDrawings.length}
            />
          </div>
        </div>
      </main>

      <Footer />

      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-3/4 max-w-xs bg-white shadow-2xl p-4 overflow-y-auto animate-in slide-in-from-left duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{t('filters')}</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsMobileFilterOpen(false)}>
                {t('close')}
              </Button>
            </div>
            <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;