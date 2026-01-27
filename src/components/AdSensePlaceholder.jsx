import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const AdSensePlaceholder = ({ size = '728x90', className }) => {
  const dimensions = {
    '728x90': { width: '728px', height: '90px', maxWidth: '100%' },
    '300x250': { width: '300px', height: '250px', maxWidth: '100%' },
    '300x600': { width: '300px', height: '600px', maxWidth: '100%' }
  };

  const dim = dimensions[size] || dimensions['728x90'];

  return (
    <div className={cn('flex justify-center', className)}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
        style={{
          width: dim.width,
          height: dim.height,
          maxWidth: dim.maxWidth
        }}
      >
        <div className="text-center p-4">
          <p className="text-gray-400 text-sm font-medium mb-1">Espaço para Anúncio</p>
          <p className="text-gray-300 text-xs">{size}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdSensePlaceholder;