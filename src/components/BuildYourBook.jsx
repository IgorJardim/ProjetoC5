import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, BookOpen, Library, FileText, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const BuildYourBook = () => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    toast({
      title: "Envio de arquivo",
      description: "🚧 Este recurso ainda não está implementado — mas não se preocupe! Você pode solicitá-lo no seu próximo prompt! 🚀"
    });
  };

  const handleFileInput = () => {
    toast({
      title: "Envio de arquivo",
      description: "🚧 Este recurso ainda não está implementado — mas não se preocupe! Você pode solicitá-lo no seu próximo prompt! 🚀"
    });
  };

  const handleLibraryClick = () => {
    toast({
      title: "Acesso à biblioteca",
      description: "🚧 Este recurso ainda não está implementado — mas não se preocupe! Você pode solicitá-lo no seu próximo prompt! 🚀"
    });
  };

  const handleCreateClick = () => {
    toast({
      title: "Criar caderno",
      description: "🚧 Este recurso ainda não está implementado — mas não se preocupe! Você pode solicitá-lo no seu próximo prompt! 🚀"
    });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white px-6 py-2 rounded-full mb-4">
            <BookOpen className="w-5 h-5" />
            <span className="font-semibold">Criação Personalizada</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Monte seu livro e já sai
            <br />
            pronto p/ impressão
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Crie seu livro de colorir personalizado pronto para impressão em minutos
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* File Upload Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-3 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                isDragging
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-300 bg-white hover:border-purple-400 hover:bg-purple-50/50'
              }`}
            >
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
                  <Upload className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Envie seus Arquivos
              </h3>
              <p className="text-gray-600 mb-6">
                Arraste e solte ou clique para enviar
              </p>

              <div className="flex flex-wrap gap-2 justify-center mb-6">
                <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                  <FileText className="w-4 h-4" />
                  PDF
                </span>
                <span className="inline-flex items-center gap-1 bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">
                  <ImageIcon className="w-4 h-4" />
                  JPEG
                </span>
                <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                  <ImageIcon className="w-4 h-4" />
                  PNG
                </span>
              </div>

              <Button
                onClick={handleFileInput}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full px-8 shadow-lg transform hover:scale-105 transition-all"
              >
                Escolher Arquivos
              </Button>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-lg border-2 border-transparent hover:border-purple-300 transition-all cursor-pointer"
              onClick={handleLibraryClick}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shrink-0">
                  <Library className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    Escolher da Biblioteca
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Navegue por milhares de designs prontos
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Create Custom Notebook 
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden"
          >
            {/* Decorative elements 
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full translate-y-20 -translate-x-20" />

            <div className="relative z-10">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
              </div>

              <h3 className="text-3xl font-bold mb-4">
                Criar Caderno Personalizado
              </h3>
              
              <p className="text-white/90 mb-8 text-lg">
                Crie um livro de colorir único adaptado às suas preferências. Escolha temas, layouts e personalize cada detalhe.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                  <span>Escolha seus temas favoritos</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                  <span>Personalize layouts de página</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                  <span>Formato PDF pronto para impressão</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                  <span>Saída de qualidade profissional</span>
                </li>
              </ul>

              <Button
                onClick={handleCreateClick}
                size="lg"
                className="w-full bg-white text-purple-600 hover:bg-gray-100 text-lg font-semibold rounded-full shadow-xl transform hover:scale-105 transition-all"
              >
                Começar a Criar Agora
              </Button>
            </div>
          </motion.div> */} 
        </div>
      </div>
    </section>
  );
};

export default BuildYourBook;