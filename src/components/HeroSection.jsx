import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const HeroSection = () => {
  const { toast } = useToast();

  const handleCTAClick = () => {
    toast({
      title: "🚧 Este recurso ainda não está implementado — mas não se preocupe! Você pode solicitá-lo no seu próximo prompt! 🚀"
    });
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1694645252458-5c599631e87d)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/90 via-pink-500/85 to-orange-500/90" />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 right-10 w-24 h-24 bg-white/20 rounded-full backdrop-blur-sm"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 right-1/4 w-32 h-32 bg-yellow-300/30 rounded-full blur-2xl"
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Encontre seu <span className="text-yellow-300">"Colorir"</span>
            <br />
            e Aproveite
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Descubra milhares de páginas para colorir e crie seu livro perfeito em FreeColoringBookids.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={handleCTAClick}
              className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Começar a Colorir Agora
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleCTAClick}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Explorar Galeria
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;