import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  // Detectar idioma do navegador ou usar localStorage
  const getInitialLanguage = () => {
    const saved = localStorage.getItem('language');
    if (saved) return saved;
    
    const browserLang = navigator.language.split('-')[0];
    if (['pt', 'en', 'es'].includes(browserLang)) {
      return browserLang;
    }
    return 'pt'; // Padrão
  };

  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = (newLang) => {
    if (['pt', 'en', 'es'].includes(newLang)) {
      setLanguage(newLang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};