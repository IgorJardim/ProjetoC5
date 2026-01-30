import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Check, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { categories } from '@/data/coloringData';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation, useCategoryTranslation } from '@/data/translations';

const FilterSection = ({ title, isOpen, onToggle, children }) => {
  return (
    <div className="border-b border-gray-200 py-4 last:border-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left font-semibold text-gray-800 mb-2 hover:text-purple-600 transition-colors"
      >
        <span>{title}</span>
        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2 space-y-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FilterSidebar = ({ filters, onFilterChange }) => {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const { translateCategory } = useCategoryTranslation(language);
  
  const [openSections, setOpenSections] = useState({
    categories: true,
    difficulty: true,
    age: true
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckboxChange = (type, value) => {
    const currentValues = filters[type] || [];
    let newValues;
    if (currentValues.includes(value)) {
      newValues = currentValues.filter(item => item !== value);
    } else {
      newValues = [...currentValues, value];
    }
    onFilterChange(type, newValues);
  };

  // Dificuldades traduzidas - mapeia valores do banco para exibição
  const difficultyDisplay = {
    pt: { 'Fácil': 'Fácil', 'Médio': 'Médio', 'Difícil': 'Difícil' },
    en: { 'Fácil': 'Easy', 'Médio': 'Medium', 'Difícil': 'Hard' },
    es: { 'Fácil': 'Fácil', 'Médio': 'Medio', 'Difícil': 'Difícil' }
  };

  // Valores do banco de dados (sempre em português)
  const difficultyValues = ['Fácil', 'Médio', 'Difícil'];
  const currentDifficultyDisplay = difficultyDisplay[language] || difficultyDisplay.pt;

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h3 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
        {t('filters')}
      </h3>

      {/* Categories */}
      <FilterSection
        title={t('categories')}
        isOpen={openSections.categories}
        onToggle={() => toggleSection('categories')}
      >
        {categories.map(cat => (
          <div key={cat.name} className="mb-3 last:mb-0">
            <div className="flex items-center gap-2 mb-1">
              <div 
                className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-colors ${filters.categories.includes(cat.name) ? 'bg-purple-600 border-purple-600' : 'border-gray-300 bg-white hover:border-purple-400'}`}
                onClick={() => handleCheckboxChange('categories', cat.name)}
              >
                {filters.categories.includes(cat.name) && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className="text-sm font-medium text-gray-700 cursor-pointer" onClick={() => handleCheckboxChange('categories', cat.name)}>
                {translateCategory(cat.name)}
              </span>
            </div>
            
            <div className="ml-6 space-y-1.5 border-l-2 border-gray-100 pl-3">
              {cat.subcategories.map(sub => (
                <div key={sub} className="flex items-center gap-2">
                  <div 
                    className={`w-3.5 h-3.5 rounded border flex items-center justify-center cursor-pointer transition-colors ${filters.subcategories.includes(sub) ? 'bg-pink-500 border-pink-500' : 'border-gray-300 bg-white hover:border-pink-400'}`}
                    onClick={() => handleCheckboxChange('subcategories', sub)}
                  >
                    {filters.subcategories.includes(sub) && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                  <span className="text-xs text-gray-600 cursor-pointer hover:text-pink-600" onClick={() => handleCheckboxChange('subcategories', sub)}>
                    {translateCategory(sub)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </FilterSection>

      {/* Difficulty */}
      <FilterSection
        title={t('difficulty')}
        isOpen={openSections.difficulty}
        onToggle={() => toggleSection('difficulty')}
      >
        {difficultyValues.map(level => (
          <div key={level} className="flex items-center gap-2">
            <div 
              className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-colors ${filters.difficulty.includes(level) ? 'bg-purple-600 border-purple-600' : 'border-gray-300 bg-white hover:border-purple-400'}`}
              onClick={() => handleCheckboxChange('difficulty', level)}
            >
              {filters.difficulty.includes(level) && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className="text-sm text-gray-700 cursor-pointer" onClick={() => handleCheckboxChange('difficulty', level)}>
              {currentDifficultyDisplay[level]}
            </span>
          </div>
        ))}
      </FilterSection>

      {/* Age Group */}
      <FilterSection
        title={t('recommendedAge')}
        isOpen={openSections.age}
        onToggle={() => toggleSection('age')}
      >
        {['3-5', '6-8', '9-12', '13+'].map(age => (
          <div key={age} className="flex items-center gap-2">
            <div 
              className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-colors ${filters.ageGroup.includes(age) ? 'bg-purple-600 border-purple-600' : 'border-gray-300 bg-white hover:border-purple-400'}`}
              onClick={() => handleCheckboxChange('ageGroup', age)}
            >
              {filters.ageGroup.includes(age) && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className="text-sm text-gray-700 cursor-pointer" onClick={() => handleCheckboxChange('ageGroup', age)}>
              {age} {t('years')}
            </span>
          </div>
        ))}
      </FilterSection>

      {/* Donate Button */}
      <div className="mt-8 pt-4 border-t border-gray-100">
        <Link to="/apoie">
          <Button 
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold shadow-md hover:shadow-lg transition-all"
          >
            <HeartHandshake className="w-4 h-4 mr-2" />
            {t('supportProject')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FilterSidebar;