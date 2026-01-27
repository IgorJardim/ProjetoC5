import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ColoringCard from '@/components/ColoringCard';

const TrendingSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const trendingImages = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1616815683456-cd7c482c2272',
      title: 'Mandala Floral',
      downloads: 1234,
      rating: 4.8
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1560128416-d8bf90e0ff08',
      title: 'Jardim de Borboletas',
      downloads: 987,
      rating: 4.9
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1666748648877-b9595feb0166',
      title: 'Padrões Geométricos',
      downloads: 856,
      rating: 4.7
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1619896132467-a8229fb23bc7',
      title: 'Criaturas do Oceano',
      downloads: 765,
      rating: 4.6
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1619879310659-01e83a8e9d6b',
      title: 'Arte Abstrata',
      downloads: 654,
      rating: 4.5
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % trendingImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + trendingImages.length) % trendingImages.length);
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % trendingImages.length;
      cards.push(trendingImages[index]);
    }
    return cards;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full mb-4">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold">Em Alta</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Desenhos em Alta
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Descubra os desenhos mais populares baixados pela nossa comunidade
          </p>
        </motion.div>

        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-purple-50 border-2 border-purple-300 rounded-full shadow-lg hidden md:flex"
          >
            <ChevronLeft className="w-6 h-6 text-purple-600" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-purple-50 border-2 border-purple-300 rounded-full shadow-lg hidden md:flex"
          >
            <ChevronRight className="w-6 h-6 text-purple-600" />
          </Button>

          {/* Carousel */}
          <div className="overflow-hidden">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              key={currentIndex}
            >
              <AnimatePresence mode="wait">
                {getVisibleCards().map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <ColoringCard {...item} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center gap-4 mt-8 md:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="bg-white hover:bg-purple-50 border-2 border-purple-300 rounded-full shadow-lg"
            >
              <ChevronLeft className="w-6 h-6 text-purple-600" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="bg-white hover:bg-purple-50 border-2 border-purple-300 rounded-full shadow-lg"
            >
              <ChevronRight className="w-6 h-6 text-purple-600" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {trendingImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'bg-purple-600 w-8'
                    : 'bg-purple-300 hover:bg-purple-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;