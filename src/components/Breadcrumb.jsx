import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/data/translations';

const Breadcrumb = ({ items }) => {
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  return (
    <nav className="flex items-center text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
      <Link 
        to="/" 
        className="flex items-center hover:text-purple-600 transition-colors"
      >
        <Home className="w-4 h-4 mr-1" />
        {t('home')}
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          {item.href ? (
            <Link 
              to={item.href}
              className="hover:text-purple-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium cursor-default">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;