import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/data/translations';

const Footer = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const { t } = useTranslation(language);

  const handleLinkClick = section => {
    toast({
      title: `${t('section')} ${section}`,
      description: `🚧 ${t('featureNotImplemented')} 🚀`
    });
  };

  const handleNewsletterSubmit = e => {
    e.preventDefault();
    toast({
      title: t('newsletterSignup'),
      description: `🚧 ${t('featureNotImplemented')} 🚀`
    });
  };

  const footerLinks = {
    [t('company')]: [t('aboutUs'), t('ourStory')],
    [t('support')]: [t('contact')],
    [t('legal')]: [t('privacyPolicy'), t('termsOfUse'), t('cookiePolicy'), t('legalNotice')]
  };

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', color: 'hover:text-blue-600' },
    { icon: Instagram, name: 'Instagram', color: 'hover:text-pink-600' },
    { icon: Twitter, name: 'Twitter', color: 'hover:text-blue-400' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🎨</span>
              </div>
              <span className="text-xl font-bold">FreeColoringBookids</span>
            </div>
            <p className="text-gray-300 mb-6">
              {t('destinationText')}{' '}
              <a href="https://freecoloringbookids.com" className="text-purple-300 hover:text-purple-100 underline">
                freecoloringbookids.com
              </a>.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(social => (
                <button 
                  key={social.name} 
                  onClick={() => handleLinkClick(social.name)} 
                  className={`w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links], idx) => (
            <motion.div 
              key={title} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: (idx + 1) * 0.1 }}
            >
              <span className="text-lg font-semibold mb-4 block">{title}</span>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link}>
                    <button 
                      onClick={() => handleLinkClick(link)} 
                      className="text-gray-300 hover:text-white transition-colors text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="border-t border-white/10 pt-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">{t('email')}</p>
                <p className="text-white">contact@freecoloringbookids.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-pink-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">{t('phone')}</p>
                <p className="text-white">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">{t('location')}</p>
                <p className="text-white">Rio de Janeiro, Brasil</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Copyright + Admin Link */}
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          viewport={{ once: true }} 
          className="border-t border-white/10 pt-8 text-center"
        >
          <p className="text-gray-400 text-sm mb-3">
            © 2026 FreeColoringBookids. {t('allRightsReserved')}
          </p>
          
          {/* Link Admin Discreto */}
          <Link 
            to="/admin" 
            className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-purple-400 transition-colors"
          >
            <Shield className="w-3 h-3" />
            <span>{t('admin')}</span>
          </Link>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;