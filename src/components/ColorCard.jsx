import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Printer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation, useCategoryTranslation, useDifficultyTranslation } from '@/data/translations';

const ColorCard = ({ item }) => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const { translateCategory } = useCategoryTranslation(language);
  const { translateDifficulty } = useDifficultyTranslation(language);
  const { id, title, category, subcategory, difficulty, ageGroup, likes, image } = item;
  const [localLikes, setLocalLikes] = useState(likes || 0);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const userLikes = JSON.parse(localStorage.getItem('user_likes') || '[]');
    setHasLiked(userLikes.includes(id));
    setLocalLikes(likes || 0);
  }, [id, likes]);

  const handleQuickLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const action = hasLiked ? 'remove' : 'add';
      
      const response = await fetch('http://localhost/api-colorir/drawings/like.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          drawing_id: id,
          action: action
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setLocalLikes(result.likes);
        setHasLiked(!hasLiked);
        
        const userLikes = JSON.parse(localStorage.getItem('user_likes') || '[]');
        if (hasLiked) {
          const updated = userLikes.filter(likeId => likeId !== id);
          localStorage.setItem('user_likes', JSON.stringify(updated));
        } else {
          userLikes.push(id);
          localStorage.setItem('user_likes', JSON.stringify(userLikes));
        }
        
        toast({
          title: hasLiked ? t('likeRemoved') : `❤️ ${t('likeAdded')}`,
          description: hasLiked ? t('likeRemovedDesc') : t('likeAddedDesc')
        });
      }
    } catch (error) {
      console.error('Erro ao curtir:', error);
      toast({
        title: t('error'),
        description: t('errorLikeOpen')
      });
    }
  };

  // IMPRESSÃO CORRIGIDA
  const handleQuickPrint = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // Incrementar contador primeiro
      await fetch('http://localhost/api-colorir/drawings/increment-download.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ drawing_id: id })
      });

      // Criar janela de impressão popup
      const printWindow = window.open('', '_blank', 'width=800,height=600');
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${title} - FreeColoringBookIds</title>
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
                  src="${image}" 
                  alt="${title}"
                  onload="window.print(); setTimeout(() => window.close(), 500);"
                />
              </div>
              <div class="watermark">
                © FreeColoringBookIds.com - ${t('freeColoringDrawing')}
              </div>
              <div class="info">
                ${translateCategory(category)} • ${translateCategory(subcategory)} • ${translateDifficulty(difficulty)} • ${ageGroup} ${t('years')}
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();

      toast({
        title: `🖨️ ${t('printPreparing')}`,
        description: t('printPreparingShort')
      });

    } catch (error) {
      console.error('Erro ao imprimir:', error);
      toast({
        title: `❌ ${t('error')}`,
        description: t('errorPrintShort')
      });
    }
  };

  const difficultyColor = {
    'Fácil': 'bg-green-100 text-green-700',
    'Médio': 'bg-yellow-100 text-yellow-700',
    'Difícil': 'bg-red-100 text-red-700',
    'Easy': 'bg-green-100 text-green-700',
    'Medium': 'bg-yellow-100 text-yellow-700',
    'Hard': 'bg-red-100 text-red-700',
    'Fácil': 'bg-green-100 text-green-700',
    'Medio': 'bg-yellow-100 text-yellow-700',
    'Difícil': 'bg-red-100 text-red-700'
  };

  return (
    <Link to={`/desenho/${id}`}>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
        className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all overflow-hidden border border-gray-100 cursor-pointer"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Watermark */}
          <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded uppercase tracking-wider font-bold pointer-events-none z-10">
            freecoloringbookids.com
          </div>

          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColor[difficulty] || 'bg-gray-100 text-gray-700'}`}>
              {translateDifficulty(difficulty)}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/90 text-purple-600 shadow-sm backdrop-blur-sm">
              {ageGroup} {t('years')}
            </span>
          </div>

          {/* Hover Actions */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
            <Button
              size="icon"
              onClick={handleQuickLike}
              className={`rounded-full border-none shadow-lg transform hover:scale-110 transition-all ${
                hasLiked 
                  ? 'bg-pink-500 text-white hover:bg-pink-600' 
                  : 'bg-white text-pink-500 hover:bg-pink-50'
              }`}
              title={hasLiked ? t('removeLike') : t('like')}
            >
              <Heart className={`w-5 h-5 ${hasLiked ? 'fill-white' : ''}`} />
            </Button>
            <Button
              size="icon"
              onClick={handleQuickPrint}
              className="rounded-full bg-blue-600 text-white hover:bg-blue-700 border-none shadow-lg transform hover:scale-110 transition-all"
              title={t('quickPrint')}
            >
              <Printer className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-gray-800 line-clamp-1 group-hover:text-purple-600 transition-colors">
                {title}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-1">{translateCategory(category)} • {translateCategory(subcategory)}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
              <Printer className="w-3.5 h-3.5" />
              <span>{t('print')}</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-pink-500">
              <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-pink-500' : ''}`} />
              {localLikes}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ColorCard;