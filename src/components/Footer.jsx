import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
const Footer = () => {
  const {
    toast
  } = useToast();
  const handleLinkClick = section => {
    toast({
      title: `Seção ${section}`,
      description: "🚧 Este recurso ainda não está implementado — mas não se preocupe! Você pode solicitá-lo no seu próximo prompt! 🚀"
    });
  };
  const handleNewsletterSubmit = e => {
    e.preventDefault();
    toast({
      title: "Inscrição na newsletter",
      description: "🚧 Este recurso ainda não está implementado — mas não se preocupe! Você pode solicitá-lo no seu próximo prompt! 🚀"
    });
  };
  const footerLinks = {
    'Empresa': ['Sobre Nós', 'Nossa História', 'Carreiras', 'Kit de Imprensa'],
    'Suporte': ['Fale Conosco', 'FAQ', 'Envio', 'Devoluções'],
    'Legal': ['Política de Privacidade', 'Termos de Uso', 'Política de Cookies', 'Aviso Legal']
  };
  const socialLinks = [{
    icon: Facebook,
    name: 'Facebook',
    color: 'hover:text-blue-600'
  }, {
    icon: Instagram,
    name: 'Instagram',
    color: 'hover:text-pink-600'
  }, {
    icon: Twitter,
    name: 'Twitter',
    color: 'hover:text-blue-400'
  }];
  return <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl"></span>
              </div>
              <span className="text-xl font-bold">FreeColoringBookids</span>
            </div>
            <p className="text-gray-300 mb-6">
              Seu destino definitivo para experiências criativas de colorir. Descubra, crie e aproveite belas obras de arte em <a href="https://freecoloringbookids.com" className="text-purple-300 hover:text-purple-100 underline">freecoloringbookids.com</a>.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(social => <button key={social.name} onClick={() => handleLinkClick(social.name)} className={`w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all ${social.color}`}>
                  <social.icon className="w-5 h-5" />
                </button>)}
            </div>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links], idx) => <motion.div key={title} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: (idx + 1) * 0.1
        }}>
              <span className="text-lg font-semibold mb-4 block">{title}</span>
              <ul className="space-y-2">
                {links.map(link => <li key={link}>
                    <button onClick={() => handleLinkClick(link)} className="text-gray-300 hover:text-white transition-colors text-left">
                      {link}
                    </button>
                  </li>)}
              </ul>
            </motion.div>)}

          {/* Newsletter Section */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.4
        }}>
            <span className="text-lg font-semibold mb-4 block">Newsletter</span>
            <p className="text-gray-300 mb-4 text-sm">
              Inscreva-se para receber ofertas especiais e novidades
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input type="email" placeholder="Seu e-mail" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500" />
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg">
                Inscrever-se
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Contact Info */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="border-t border-white/10 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">E-mail</p>
                <p className="text-white">contact@freecoloringbookids.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-pink-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Telefone</p>
                <p className="text-white">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Localização</p>
                <p className="text-white">Rio de Janeiro, Brasil</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} viewport={{
        once: true
      }} className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
          <p>© 2026 FreeColoringBookids. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>;
};
export default Footer;