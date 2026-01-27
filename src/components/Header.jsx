import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, Globe, Heart, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/data/translations';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation(language);

  const languages = [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];

  const currentLang = languages.find(lang => lang.code === language);

  const menuItems = [
    { name: t('home'), href: '/', type: 'link' },
    { name: t('categories'), href: '/categorias', type: 'link' },
    { name: t('news'), href: '/noticias', type: 'link' }
  ];

  const handleMenuClick = (item) => {
    setIsMenuOpen(false);
  };

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsLangMenuOpen(false);
    const langName = languages.find(l => l.code === langCode)?.name;
    toast({
      title: `${langName} ✓`,
      description: language === 'pt' 
        ? `Idioma alterado para ${langName}` 
        : language === 'en'
        ? `Language changed to ${langName}`
        : `Idioma cambiado a ${langName}`
    });
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/categorias?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="backdrop-blur-md bg-white/70 border-b border-white/20 shadow-lg">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">🎨</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hidden sm:block">
                  FreeColoringBookids
                </span>
              </motion.div>
            </Link>

            <div className="hidden lg:flex items-center gap-6">
              {menuItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors relative group"
                >
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.name}
                  </motion.span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
              
              {/* BOTÃO APOIE - DESTAQUE */}
              <Link to="/apoie">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all animate-pulse"
                >
                  <Heart className="w-4 h-4 mr-2 fill-white" />
                  {t('support')}
                </Button>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:flex items-center bg-white/90 rounded-full px-4 py-2 shadow-md border border-gray-200 max-w-md flex-1 mx-6"
            >
              <Search className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder={t('search')}
                className="bg-transparent outline-none flex-1 text-gray-700 placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </motion.div>

            <div className="flex items-center gap-3">
              {/* Botão Apoie Mobile */}
              <Link to="/apoie" className="lg:hidden">
                <Button
                  size="icon"
                  className="rounded-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white shadow-lg"
                >
                  <Heart className="w-5 h-5 fill-white" />
                </Button>
              </Link>

              {/* Language Selector */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="rounded-full hover:bg-purple-100 flex items-center gap-2"
                >
                  <Globe className="w-5 h-5 text-gray-700" />
                  <span className="hidden sm:inline text-sm font-medium text-gray-700">
                    {currentLang?.flag} {currentLang?.code.toUpperCase()}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-700" />
                </Button>

                <AnimatePresence>
                  {isLangMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition-colors ${
                            language === lang.code ? 'bg-purple-100' : ''
                          }`}
                        >
                          <span className="text-2xl">{lang.flag}</span>
                          <span className="font-medium text-gray-700">{lang.name}</span>
                          {language === lang.code && (
                            <span className="ml-auto text-purple-600">✓</span>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-purple-100 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          <div className="md:hidden mt-4">
            <div className="flex items-center bg-white/90 rounded-full px-4 py-2 shadow-md border border-gray-200">
              <Search className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder={t('search')}
                className="bg-transparent outline-none flex-1 text-gray-700 placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden backdrop-blur-md bg-white/95 border-b border-white/20 shadow-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {menuItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-lg font-medium transition-colors"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.name}
                  </motion.div>
                </Link>
              ))}
              
              {/* Botão Apoie no Menu Mobile */}
              <Link
                to="/apoie"
                onClick={() => setIsMenuOpen(false)}
                className="block"
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: menuItems.length * 0.05 }}
                  className="px-4 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg font-bold text-center shadow-lg"
                >
                  <Heart className="w-5 h-5 inline mr-2 fill-white" />
                  {t('support')}
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;