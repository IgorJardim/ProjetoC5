import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Heart, Share2, Printer, Calendar, Star } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import { useDrawings } from '@/contexts/DrawingsContext';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation, useCategoryTranslation, useDifficultyTranslation } from '@/data/translations';

const API_URL = 'http://localhost/api-colorir/drawings';

const DrawingDetailPage = () => {
  const { id } = useParams();
  const { getDrawingById } = useDrawings();
  const { toast } = useToast();
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const { translateCategory } = useCategoryTranslation(language);
  const { translateDifficulty } = useDifficultyTranslation(language);
  
  const [drawing, setDrawing] = useState(null);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const drawingData = getDrawingById(id);
    if (drawingData) {
      setDrawing(drawingData);
      setLikes(drawingData.likes || 0);
      checkIfLiked(id);
    }
  }, [id, getDrawingById]);

  const checkIfLiked = (drawingId) => {
    const userLikes = JSON.parse(localStorage.getItem('user_likes') || '[]');
    setHasLiked(userLikes.includes(drawingId));
  };

  const handleLike = async () => {
    try {
      const drawingId = drawing.id;
      const action = hasLiked ? 'remove' : 'add';
      
      const response = await fetch(`${API_URL}/like.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          drawing_id: drawingId,
          action: action
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setLikes(result.likes);
        setHasLiked(!hasLiked);
        
        const userLikes = JSON.parse(localStorage.getItem('user_likes') || '[]');
        if (hasLiked) {
          const updatedUserLikes = userLikes.filter(id => id !== drawingId);
          localStorage.setItem('user_likes', JSON.stringify(updatedUserLikes));
          
          toast({
            title: t('likeRemoved'),
            description: t('likeRemovedDesc')
          });
        } else {
          userLikes.push(drawingId);
          localStorage.setItem('user_likes', JSON.stringify(userLikes));
          
          toast({
            title: `❤️ ${t('likeAdded')}`,
            description: t('likeAddedDesc')
          });
        }
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Erro ao dar like:', error);
      toast({
        title: `❌ ${t('error')}`,
        description: t('errorLike')
      });
    }
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      
      // Incrementar contador no banco
      await fetch(`${API_URL}/increment-download.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          drawing_id: drawing.id
        })
      });
      
      // Download da imagem
      const response = await fetch(drawing.image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${drawing.title.replace(/\s+/g, '_')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: `✅ ${t('downloadStarted')}`,
        description: t('downloadStartedDesc')
      });
    } catch (error) {
      console.error('Erro no download:', error);
      toast({
        title: `❌ ${t('error')}`,
        description: t('errorDownload')
      });
    } finally {
      setIsDownloading(false);
    }
  };

  // IMPRESSÃO CORRIGIDA - SÓ A IMAGEM
  const handlePrint = async () => {
    try {
      // Incrementar contador de downloads (impressão conta como download)
      await fetch(`${API_URL}/increment-download.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          drawing_id: drawing.id
        })
      });

      // Criar janela de impressão com APENAS a imagem
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${drawing.title} - FreeColoringBookIds</title>
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              
              body {
                margin: 0;
                padding: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                font-family: Arial, sans-serif;
                background: white;
              }
              
              .container {
                max-width: 100%;
                width: 100%;
                text-align: center;
              }
              
              .image-wrapper {
                position: relative;
                display: inline-block;
                max-width: 100%;
              }
              
              img {
                max-width: 100%;
                max-height: 90vh;
                height: auto;
                display: block;
                margin: 0 auto;
                border: 2px solid #333;
                page-break-inside: avoid;
              }
              
              .watermark {
                margin-top: 15px;
                font-size: 11px;
                color: #666;
                text-align: center;
                font-style: italic;
              }
              
              .info {
                margin-top: 8px;
                font-size: 10px;
                color: #999;
                text-align: center;
              }
              
              @media print {
                body {
                  padding: 0;
                  margin: 0;
                }
                
                .container {
                  page-break-inside: avoid;
                }
                
                img {
                  max-height: 90vh;
                  border: 1px solid #333;
                }
                
                .watermark {
                  font-size: 10px;
                  margin-top: 10px;
                }
                
                .info {
                  font-size: 9px;
                  margin-top: 5px;
                }
                
                @page {
                  margin: 1cm;
                  size: A4 portrait;
                }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="image-wrapper">
                <img 
                  src="${drawing.image}" 
                  alt="${drawing.title}"
                  onload="window.print(); setTimeout(() => window.close(), 500);"
                />
              </div>
              <div class="watermark">
                © FreeColoringBookIds.com - ${t('freeColoringDrawing')}
              </div>
              <div class="info">
                ${translateCategory(drawing.category)} • ${translateCategory(drawing.subcategory)} • ${translateDifficulty(drawing.difficulty)} • ${drawing.ageGroup} ${t('years')}
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();

      toast({
        title: `🖨️ ${t('printPreparing')}`,
        description: t('printPreparingDesc')
      });

    } catch (error) {
      console.error('Erro ao imprimir:', error);
      toast({
        title: `❌ ${t('error')}`,
        description: t('errorPrint')
      });
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: drawing.title,
      text: `${drawing.title}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast({
          title: `✅ ${t('shared')}`,
          description: t('sharedDesc')
        });
      } catch (err) {
        console.log('Erro ao compartilhar:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: `📋 ${t('linkCopied')}`,
        description: t('linkCopiedDesc')
      });
    }
  };

  if (!drawing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{t('drawingNotFound')}</h1>
          <Link to="/categorias" className="text-purple-600 hover:text-pink-600">
            {t('backToCategories')}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const difficultyColor = {
    'Fácil': 'bg-green-100 text-green-700 border-green-300',
    'Médio': 'bg-yellow-100 text-yellow-700 border-yellow-300',
    'Difícil': 'bg-red-100 text-red-700 border-red-300',
    'Easy': 'bg-green-100 text-green-700 border-green-300',
    'Medium': 'bg-yellow-100 text-yellow-700 border-yellow-300',
    'Hard': 'bg-red-100 text-red-700 border-red-300',
    'Fácil': 'bg-green-100 text-green-700 border-green-300',
    'Medio': 'bg-yellow-100 text-yellow-700 border-yellow-300',
    'Difícil': 'bg-red-100 text-red-700 border-red-300'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb items={[
          { label: t('categories'), href: '/categorias' },
          { label: translateCategory(drawing.category), href: `/categorias?category=${drawing.category}` },
          { label: drawing.title, href: null }
        ]} />

        <div className="max-w-6xl mx-auto">
          <Link
            to="/categorias"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('backToCategories')}
          </Link>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Coluna da Imagem */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-purple-200">
                <div className="relative group">
                  <img
                    src={drawing.image}
                    alt={drawing.title}
                    className="w-full h-auto"
                  />
                  <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-semibold">
                    freecoloringbookids.com
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50"
                >
                  <Download className="w-5 h-5" />
                  {isDownloading ? t('downloading') : t('download')}
                </button>

                <button
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-4 rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  <Printer className="w-5 h-5" />
                  {t('print')}
                </button>
              </div>
            </motion.div>

            {/* Coluna de Informações */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-4xl font-bold text-gray-800 flex-1">
                    {drawing.title}
                  </h1>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-4 py-2 rounded-full text-sm font-semibold bg-purple-100 text-purple-700 border border-purple-200">
                    {translateCategory(drawing.category)}
                  </span>
                  <span className="px-4 py-2 rounded-full text-sm font-semibold bg-pink-100 text-pink-700 border border-pink-200">
                    {translateCategory(drawing.subcategory)}
                  </span>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${difficultyColor[drawing.difficulty]}`}>
                    {translateDifficulty(drawing.difficulty)}
                  </span>
                  <span className="px-4 py-2 rounded-full text-sm font-semibold bg-orange-100 text-orange-700 border border-orange-200">
                    {drawing.ageGroup} {t('years')}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-700 mb-2">{t('description')}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {drawing.description}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-700 mb-4">{t('statistics')}</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Printer className="w-5 h-5" />
                      <span className="font-medium">{t('printed')}</span>
                    </div>
                    <span className="font-bold text-gray-800">{drawing.downloads?.toLocaleString() || 0}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{t('rating')}</span>
                    </div>
                    <span className="font-bold text-gray-800">{drawing.rating || 5.0}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-5 h-5" />
                      <span className="font-medium">{t('addedOn')}</span>
                    </div>
                    <span className="font-bold text-gray-800">
                      {new Date(drawing.dateAdded).toLocaleDateString(
                        language === 'pt' ? 'pt-BR' : language === 'es' ? 'es-ES' : 'en-US'
                      )}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleLike}
                  className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-lg transition-all ${
                    hasLiked
                      ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${hasLiked ? 'fill-white' : ''}`} />
                  <span>{hasLiked ? t('liked') : t('like')}</span>
                  <span className="ml-auto bg-white/20 px-3 py-1 rounded-full text-sm">
                    {likes}
                  </span>
                </button>

                <button
                  onClick={handleShare}
                  className="w-full mt-3 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  <Share2 className="w-5 h-5" />
                  {t('share')}
                </button>
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-xl mb-3">💡 {t('coloringTips')}</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-300">•</span>
                    <span>{t('tip1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-300">•</span>
                    <span>{t('tip2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-300">•</span>
                    <span>{t('tip3')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-300">•</span>
                    <span>{t('tip4')}</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DrawingDetailPage;