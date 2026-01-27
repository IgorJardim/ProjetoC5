import React from 'react';
import { motion } from 'framer-motion';
import { Download, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ColoringCard = ({ image, title, downloads, rating }) => {
  const { toast } = useToast();

  const handleAction = (action) => {
    toast({
      title: `Recurso de ${action}`,
      description: "🚧 Este recurso ainda não está implementado — mas não se preocupe! Você pode solicitá-lo no seu próximo prompt! 🚀"
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* TEXTO PARA GOOGLE ADSENSE (Marca d'água digital) */}
        <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded uppercase tracking-wider font-bold pointer-events-none z-10">
          freecoloringbookids.com
        </div>

        {/* Overlay on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-600/50 to-transparent flex items-center justify-center gap-3"
        >
          <Button
            size="icon"
            onClick={() => handleAction('Download')}
            className="bg-white text-purple-600 hover:bg-purple-50 rounded-full shadow-xl transform hover:scale-110 transition-all"
          >
            <Download className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            onClick={() => handleAction('Curtir')}
            className="bg-white text-pink-600 hover:bg-pink-50 rounded-full shadow-xl transform hover:scale-110 transition-all"
          >
            <Heart className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
          {title}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Download className="w-4 h-4" />
            <span>{downloads.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ColoringCard;