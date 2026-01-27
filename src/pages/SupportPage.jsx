import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Coffee, Pizza, Sparkles, Crown, Users, TrendingUp, Globe, CreditCard, DollarSign, Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/data/translations';

const SupportPage = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const donationPlans = [
    {
      id: 'coffee',
      icon: Coffee,
      name: t('coffee'),
      price: 5,
      priceUSD: 1,
      description: t('coffeeDesc'),
      color: 'from-amber-500 to-orange-600',
      benefits: [
        language === 'en' ? 'Basic support' : language === 'es' ? 'Apoyo básico' : 'Apoio básico',
        language === 'en' ? 'Our thanks' : language === 'es' ? 'Nuestro agradecimiento' : 'Nosso agradecimento'
      ]
    },
    {
      id: 'pizza',
      icon: Pizza,
      name: t('pizza'),
      price: 20,
      priceUSD: 4,
      description: t('pizzaDesc'),
      color: 'from-red-500 to-pink-600',
      benefits: [
        language === 'en' ? 'Significant support' : language === 'es' ? 'Apoyo significativo' : 'Apoio significativo',
        language === 'en' ? 'Helps maintain the site' : language === 'es' ? 'Ayuda a mantener el sitio' : 'Ajuda a manter o site',
        language === 'en' ? 'Special recognition' : language === 'es' ? 'Reconocimiento especial' : 'Reconhecimento especial'
      ],
      popular: true
    },
    {
      id: 'supporter',
      icon: Sparkles,
      name: t('supporter'),
      price: 50,
      priceUSD: 10,
      description: t('supporterDesc'),
      color: 'from-purple-500 to-pink-600',
      benefits: [
        language === 'en' ? 'Monthly support' : language === 'es' ? 'Apoyo mensual' : 'Apoio mensal',
        language === 'en' ? 'Early access' : language === 'es' ? 'Acceso anticipado' : 'Acesso antecipado',
        language === 'en' ? 'Supporter badge' : language === 'es' ? 'Insignia de partidario' : 'Badge de apoiador',
        language === 'en' ? 'Priority support' : language === 'es' ? 'Soporte prioritario' : 'Prioridade no suporte'
      ]
    },
    {
      id: 'sponsor',
      icon: Crown,
      name: t('sponsor'),
      price: 100,
      priceUSD: 20,
      description: t('sponsorDesc'),
      color: 'from-yellow-500 to-amber-600',
      benefits: [
        language === 'en' ? 'Logo on site' : language === 'es' ? 'Logo en el sitio' : 'Logo no site',
        language === 'en' ? 'Public recognition' : language === 'es' ? 'Reconocimiento público' : 'Reconhecimento público',
        language === 'en' ? 'Impact reports' : language === 'es' ? 'Informes de impacto' : 'Relatórios de impacto',
        language === 'en' ? 'Feature influence' : language === 'es' ? 'Influencia en funciones' : 'Influência em features'
      ]
    }
  ];

  const stats = [
    { label: t('freeDrawings'), value: '1000+', icon: Sparkles },
    { label: t('childrenHelped'), value: '500+', icon: Users },
    { label: t('downloadsMonth'), value: '10K+', icon: TrendingUp },
    { label: t('countriesReached'), value: '25+', icon: Globe }
  ];

  const impactAreas = [
    { title: t('serverMaintenance'), percentage: 40, color: 'bg-blue-500' },
    { title: t('newDrawings2'), percentage: 30, color: 'bg-purple-500' },
    { title: t('development'), percentage: 20, color: 'bg-pink-500' },
    { title: t('socialMarketing'), percentage: 10, color: 'bg-green-500' }
  ];

  const handleDonate = (plan) => {
    setSelectedPlan(plan);
    const thankYouMessage = language === 'en' 
      ? `💝 Thank you for choosing: ${plan.name}`
      : language === 'es'
      ? `💝 Gracias por elegir: ${plan.name}`
      : `💝 Obrigado por escolher: ${plan.name}`;

    const systemMessage = language === 'en'
      ? "🚧 Payment system will be implemented soon! Contact us to donate."
      : language === 'es'
      ? "🚧 ¡El sistema de pago se implementará pronto! Contáctanos para donar."
      : "🚧 Sistema de pagamento será implementado em breve! Entre em contato para doar.";

    toast({
      title: thankYouMessage,
      description: systemMessage
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center text-white"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-6"
              >
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Heart className="w-10 h-10 text-white fill-white" />
                </div>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {t('supportTitle')}
                <br />
                <span className="text-yellow-300">{t('supportSubtitle')}</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                {t('supportDescription')}
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => document.getElementById('plans').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-8 shadow-xl"
                >
                  {t('supportNow')}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => document.getElementById('impact').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-full px-8"
                >
                  {t('viewImpact')}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-4">
                    <stat.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Donation Plans */}
        <section id="plans" className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                {t('chooseSupport')}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t('chooseSupportDesc')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {donationPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                        {t('mostPopular')}
                      </span>
                    </div>
                  )}

                  <div className={`relative bg-white rounded-2xl shadow-xl overflow-hidden border-2 ${
                    plan.popular ? 'border-purple-500' : 'border-gray-200'
                  } hover:shadow-2xl transition-all group`}>
                    <div className={`h-2 bg-gradient-to-r ${plan.color}`} />
                    
                    <div className="p-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${plan.color} rounded-full mb-4`}>
                        <plan.icon className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 mb-4">{plan.description}</p>

                      <div className="mb-6">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-4xl font-bold text-gray-800">R$ {plan.price}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {t('or')} USD ${plan.priceUSD}
                        </div>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {plan.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        onClick={() => handleDonate(plan)}
                        className={`w-full bg-gradient-to-r ${plan.color} text-white hover:shadow-lg transition-all rounded-full`}
                      >
                        {t('supportNow')}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section id="impact" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  {t('whereGoesTitle')}
                </h2>
                <p className="text-xl text-gray-600">
                  {t('whereGoesDesc')}
                </p>
              </motion.div>

              <div className="space-y-6">
                {impactAreas.map((area, index) => (
                  <motion.div
                    key={area.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-gray-800">{area.title}</span>
                      <span className="font-bold text-purple-600">{area.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${area.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-full ${area.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                {t('paymentMethods')}
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{t('pix')}</h3>
                  <p className="text-sm text-gray-600">{t('pixDesc')}</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{t('creditCard')}</h3>
                  <p className="text-sm text-gray-600">{t('creditCardDesc')}</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{t('paypal')}</h3>
                  <p className="text-sm text-gray-600">{t('paypalDesc')}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-white"
            >
              <Heart className="w-16 h-16 mx-auto mb-6 fill-white" />
              <h2 className="text-4xl font-bold mb-6">
                {t('everyDonation')}
              </h2>
              <p className="text-xl mb-8 text-white/90">
                {t('everyDonationDesc')}
              </p>
              <Button
                size="lg"
                onClick={() => document.getElementById('plans').scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-purple-600 hover:bg-gray-100 rounded-full px-8 shadow-xl text-lg"
              >
                {t('supportProject')}
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SupportPage;