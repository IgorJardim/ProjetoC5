import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, ArrowRight, Search, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { useNews } from '@/contexts/NewsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation, useCategoryTranslation } from '@/data/translations';

const NewsPage = () => {
  const { getPublishedNews } = useNews();
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const { translateCategory } = useCategoryTranslation(language);
  const publishedNews = getPublishedNews();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(t('allCategories'));

  const categories = [t('allCategories'), ...new Set(publishedNews.map(n => n.category))];

  const filteredNews = publishedNews.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === t('allCategories') || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredNews = publishedNews[0];
  const otherNews = filteredNews.slice(selectedCategory === t('allCategories') && !searchQuery ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: t('news'), href: null }]} />

        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full mb-4"
          >
            <Clock className="w-5 h-5" />
            <span className="font-semibold">{t('latestNews')}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4"
          >
            {t('stayInformed')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            {t('newsSubtitle')}
          </motion.p>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('searchNews')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-300'
                }`}
              >
                {category === t('allCategories') ? category : translateCategory(category)}
              </button>
            ))}
          </div>
        </div>

        {featuredNews && selectedCategory === t('allCategories') && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto">
                  <img
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {t('featured')}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredNews.date).toLocaleDateString(
                        language === 'pt' ? 'pt-BR' : language === 'es' ? 'es-ES' : 'en-US'
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      {translateCategory(featuredNews.category)}
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    {featuredNews.title}
                  </h2>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {featuredNews.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-gray-500 mb-6">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{featuredNews.author}</span>
                  </div>
                  <Link
                    to={`/noticias/${featuredNews.id}`}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all w-fit"
                  >
                    {t('readMore')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherNews.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-white/90 backdrop-blur-sm text-purple-600 px-3 py-1 rounded-full text-xs font-semibold">
                    {translateCategory(item.category)}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(item.date).toLocaleDateString(
                      language === 'pt' ? 'pt-BR' : language === 'es' ? 'es-ES' : 'en-US'
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {item.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <User className="w-4 h-4" />
                    <span>{item.author}</span>
                  </div>
                  <Link
                    to={`/noticias/${item.id}`}
                    className="text-purple-600 hover:text-pink-600 font-semibold text-sm flex items-center gap-1"
                  >
                    {t('readMore')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">{t('noNewsFound')}</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default NewsPage;