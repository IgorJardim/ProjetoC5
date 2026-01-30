import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { useNews } from '@/contexts/NewsContext';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation, useCategoryTranslation } from '@/data/translations';

const NewsDetailPage = () => {
  const { id } = useParams();
  const { getNewsById } = useNews();
  const { toast } = useToast();
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const { translateCategory } = useCategoryTranslation(language);
  const newsItem = getNewsById(id);

  if (!newsItem) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{t('newsNotFound')}</h1>
          <Link to="/noticias" className="text-purple-600 hover:text-pink-600">
            {t('backToNews')}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: newsItem.title,
        text: newsItem.excerpt,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: t('newsLinkCopied'),
        description: t('newsLinkCopiedDesc')
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb items={[
          { label: t('news'), href: '/noticias' },
          { label: newsItem.title.substring(0, 30) + '...', href: null }
        ]} />

        <article className="max-w-4xl mx-auto">
          <Link
            to="/noticias"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('backToNews')}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {translateCategory(newsItem.category)}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {newsItem.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{newsItem.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(newsItem.date).toLocaleDateString(
                  language === 'pt' ? 'pt-BR' : language === 'es' ? 'es-ES' : 'en-US',
                  { 
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  }
                )}</span>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 hover:text-purple-600 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                {t('share')}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src={newsItem.image}
              alt={newsItem.title}
              className="w-full h-96 object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8"
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                {newsItem.content}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center"
          >
            <h3 className="text-2xl font-bold mb-4">{t('likedThisNews')}</h3>
            <p className="mb-6">{t('shareWithFriends')}</p>
            <button
              onClick={handleShare}
              className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              {t('share')}
            </button>
          </motion.div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default NewsDetailPage;