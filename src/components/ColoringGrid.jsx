import React from 'react';
import { motion } from 'framer-motion';
import ColorCard from './ColorCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/data/translations';

const ColoringGrid = ({ 
  drawings, 
  loading, 
  currentPage, 
  totalPages, 
  onPageChange,
  sortOption,
  onSortChange,
  totalItems
}) => {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-xl aspect-[4/5] animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header / Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <p className="text-sm text-gray-500">
          {t('showing')} <span className="font-semibold text-gray-900">{drawings.length}</span> {t('of')} <span className="font-semibold text-gray-900">{totalItems}</span> {t('results')}
        </p>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-sm text-gray-500 whitespace-nowrap hidden sm:inline">{t('sortBy')}</span>
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full sm:w-48 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
          >
            <option value="downloads">{t('mostDownloaded')}</option>
            <option value="recent">{t('mostRecent')}</option>
            <option value="rating">{t('topRated')}</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {drawings.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {drawings.map((drawing) => (
            <ColorCard key={drawing.id} item={drawing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">{t('noDrawingsFound')}</p>
          <Button 
            variant="link" 
            className="text-purple-600 mt-2"
            onClick={() => window.location.reload()}
          >
            {t('clearAllFilters')}
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-10 w-10"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <div className="flex items-center gap-1 mx-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => onPageChange(i + 1)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === i + 1
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-10 w-10"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ColoringGrid;