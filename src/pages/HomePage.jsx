import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Printer, Heart, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TrendingSection from '@/components/TrendingSection';
import AdSensePlaceholder from '@/components/AdSensePlaceholder';
import BuildYourBook from '@/components/BuildYourBook';
import Footer from '@/components/Footer';
import ColorCard from '@/components/ColorCard';
import { useDrawings } from '@/contexts/DrawingsContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/data/translations';
import { Button } from '@/components/ui/button';

const SectionHeader = ({ icon: Icon, title, subtitle, gradient }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center mb-12"
  >
    <div className={`inline-flex items-center gap-2 ${gradient} text-white px-6 py-2 rounded-full mb-4`}>
      <Icon className="w-5 h-5" />
      <span className="font-semibold">{title}</span>
    </div>
    <h2 className={`text-4xl md:text-5xl font-bold ${gradient} bg-clip-text text-transparent mb-4`}>
      {subtitle}
    </h2>
  </motion.div>
);

const HomePage = () => {
  const { drawings, loading } = useDrawings();
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  // Desenhos mais recentes (últimos 8)
  const recentDrawings = [...drawings]
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    .slice(0, 8);

  // Desenhos mais impressos (top 8 por downloads)
  const mostPrintedDrawings = [...drawings]
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 8);

  // Desenhos mais curtidos (top 8 por likes)
  const mostLikedDrawings = [...drawings]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 8);

  const renderDrawingGrid = (drawingsList, loadingState) => {
    if (loadingState) {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl aspect-[4/5] animate-pulse" />
          ))}
        </div>
      );
    }

    if (drawingsList.length === 0) {
      return (
        <div className="text-center py-12 bg-white/50 rounded-xl">
          <p className="text-gray-500">{t('noResults')}</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {drawingsList.map((drawing, index) => (
          <motion.div
            key={drawing.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <ColorCard item={drawing} />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        
        {/* SEÇÃO: DESENHOS MAIS RECENTES */}
        <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <SectionHeader
              icon={Sparkles}
              title={t('newDrawingsLabel')}
              subtitle={t('newDrawings')}
              gradient="bg-gradient-to-r from-blue-600 to-purple-600"
            />
            
            {renderDrawingGrid(recentDrawings, loading)}

            {recentDrawings.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-8"
              >
                <Link to="/categorias">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-8 shadow-lg transform hover:scale-105 transition-all"
                  >
                    {t('viewAll')}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        </section>

        <AdSensePlaceholder size="728x90" className="my-16" />

        {/* SEÇÃO: MAIS IMPRESSOS */}
        <section className="py-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
          <div className="container mx-auto px-4">
            <SectionHeader
              icon={Printer}
              title={t('mostPrintedLabel')}
              subtitle={t('mostPrinted')}
              gradient="bg-gradient-to-r from-green-600 to-emerald-600"
            />
            
            {renderDrawingGrid(mostPrintedDrawings, loading)}

            {mostPrintedDrawings.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-8"
              >
                <Link to="/categorias?sort=impressions">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full px-8 shadow-lg transform hover:scale-105 transition-all"
                  >
                    {t('viewMorePopular')}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        </section>

        {/* SEÇÃO: MAIS CURTIDOS */}
        <section className="py-16 bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
          <div className="container mx-auto px-4">
            <SectionHeader
              icon={Heart}
              title={t('mostLikedLabel')}
              subtitle={t('mostLiked')}
              gradient="bg-gradient-to-r from-pink-600 to-red-600"
            />
            
            {renderDrawingGrid(mostLikedDrawings, loading)}

            {mostLikedDrawings.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-8"
              >
                <Link to="/categorias?sort=likes">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white rounded-full px-8 shadow-lg transform hover:scale-105 transition-all"
                  >
                    {t('viewMoreLiked')}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        </section>

        <BuildYourBook />
        <AdSensePlaceholder size="728x90" className="my-16" />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;