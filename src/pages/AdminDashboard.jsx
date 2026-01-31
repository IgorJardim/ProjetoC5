import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, FileText, Users, Download, TrendingUp, Eye, Plus, Edit2, Trash2, Save, X, Calendar,
  BarChart3, Activity, Upload, Image as ImageIcon, CheckCircle, Printer, Heart, Star
} from 'lucide-react';
import { useNews } from '@/contexts/NewsContext';
import { useDrawings } from '@/contexts/DrawingsContext';
import { useTestimonials } from '@/contexts/TestimonialsContext';
import { MessageSquare } from 'lucide-react';

const AdminDashboard = () => {
  const { news, addNews, updateNews, deleteNews } = useNews();
  const { drawings, addDrawing, updateDrawing, deleteDrawing } = useDrawings();
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useTestimonials();
  
  const [realStats, setRealStats] = useState({
    total_drawings: 0,
    total_downloads: 0,
    total_likes: 0
  });

  const [monthlyStats, setMonthlyStats] = useState([]);
  const [loadingMonthly, setLoadingMonthly] = useState(true);

  // Buscar estatísticas gerais
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost/api-colorir/drawings/stats.php');
        const json = await response.json();
        if (json.success) {
          setRealStats(json.data);
        }
      } catch (error) {
        console.error("Erro ao carregar estatísticas", error);
      }
    };
    fetchStats();
  }, [drawings]);

  // Buscar estatísticas mensais
  useEffect(() => {
    const fetchMonthlyStats = async () => {
      try {
        setLoadingMonthly(true);
        const response = await fetch('http://localhost/api-colorir/drawings/monthly-stats.php');
        const json = await response.json();
        if (json.success) {
          setMonthlyStats(json.data);
        }
      } catch (error) {
        console.error("Erro ao carregar estatísticas mensais", error);
      } finally {
        setLoadingMonthly(false);
      }
    };
    fetchMonthlyStats();
  }, []);
  
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // ========== ESTADO DE NOTÍCIAS ==========
  const [isCreatingNews, setIsCreatingNews] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [newsForm, setNewsForm] = useState({
    title: '',
    content: '',
    image: '',
    published: true,
    author: 'Admin',
    category: 'Novidades'
  });
  const [isDraggingNews, setIsDraggingNews] = useState(false);
  const [newsImagePreview, setNewsImagePreview] = useState('');

  // ========== ESTADO DE DESENHOS ==========
  const [isCreatingDrawing, setIsCreatingDrawing] = useState(false);
  const [editingDrawing, setEditingDrawing] = useState(null);
  const [drawingForm, setDrawingForm] = useState({
    title: '',
    description: '',
    category: 'Entretenimento',
    subcategory: 'Desenhos Animados',
    difficulty: 'Médio',
    ageGroup: '6-8',
    image: ''
  });
  const [isDraggingDrawing, setIsDraggingDrawing] = useState(false);
  const [drawingImagePreview, setDrawingImagePreview] = useState('');
  const [drawingSortOption, setDrawingSortOption] = useState('recent');

  // ========== ESTADO DE DEPOIMENTOS ========== //
   const [isCreatingTestimonial, setIsCreatingTestimonial] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState(null);
    const [testimonialForm, setTestimonialForm] = useState({
      name: '',
      role: '',
      text: '',
      avatar: '',
      rating: 5
    });

  const stats = [
    { 
      label: 'Total de Desenhos', 
      value: String(realStats.total_drawings), 
      icon: FileText, 
      change: '+5%', 
      color: 'from-blue-500 to-blue-600' 
    },
    { 
      label: 'Total de Impressos',
      value: realStats.total_downloads.toLocaleString(), 
      icon: Printer,
      change: '+12%', 
      color: 'from-green-500 to-green-600' 
    },
    { 
      label: 'Total de Curtidas',
      value: realStats.total_likes.toLocaleString(), 
      icon: Heart, 
      change: '+18%', 
      color: 'from-purple-500 to-purple-600' 
    },
  ];

  const maxImpressions = monthlyStats.length > 0 
    ? Math.max(...monthlyStats.map(d => d.impressions))
    : 1;

  const newsCategories = ['Novidades', 'Atualizações', 'Tutoriais', 'Eventos'];
  
  const drawingCategories = {
    'Entretenimento': ['Desenhos Animados', 'Roblox', 'Minecraft', 'Filmes'],
    'Natureza': ['Animais', 'Floresta', 'Mar', 'Frutas', 'Alimentos'],
    'Educativo': ['Figuras Geométricas', 'Objetos Básicos', 'Veículos', 'Datas Festivas'],
    'Terapêutico': ['TDAH', 'Hiperatividade', 'Autismo', 'Calm Pictures']
  };

  const difficulties = ['Fácil', 'Médio', 'Difícil'];
  const ageGroups = ['3-5', '6-8', '9-12', '13+'];

  // ========== FUNÇÕES DE UPLOAD DE IMAGEM (NOTÍCIAS) ==========
  const handleNewsImageUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setNewsImagePreview(base64String);
        if (editingNews) {
          setEditingNews({...editingNews, image: base64String});
        } else {
          setNewsForm({...newsForm, image: base64String});
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Por favor, selecione um arquivo de imagem válido');
    }
  };

  const handleNewsDragOver = (e) => {
    e.preventDefault();
    setIsDraggingNews(true);
  };

  const handleNewsDragLeave = (e) => {
    e.preventDefault();
    setIsDraggingNews(false);
  };

  const handleNewsDrop = (e) => {
    e.preventDefault();
    setIsDraggingNews(false);
    const file = e.dataTransfer.files[0];
    if (file) handleNewsImageUpload(file);
  };

  const handleNewsFileInput = (e) => {
    const file = e.target.files[0];
    if (file) handleNewsImageUpload(file);
  };

  // ========== FUNÇÕES DE UPLOAD DE IMAGEM (DESENHOS) ==========
  const handleDrawingImageUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setDrawingImagePreview(base64String);
        if (editingDrawing) {
          setEditingDrawing({...editingDrawing, image: base64String});
        } else {
          setDrawingForm({...drawingForm, image: base64String});
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Por favor, selecione um arquivo de imagem válido');
    }
  };

  const handleDrawingDragOver = (e) => {
    e.preventDefault();
    setIsDraggingDrawing(true);
  };

  const handleDrawingDragLeave = (e) => {
    e.preventDefault();
    setIsDraggingDrawing(false);
  };

  const handleDrawingDrop = (e) => {
    e.preventDefault();
    setIsDraggingDrawing(false);
    const file = e.dataTransfer.files[0];
    if (file) handleDrawingImageUpload(file);
  };

  const handleDrawingFileInput = (e) => {
    const file = e.target.files[0];
    if (file) handleDrawingImageUpload(file);
  };

  // ========== CRUD DE NOTÍCIAS ==========
  const handleCreateNews = () => {
    if (!newsForm.title.trim()) {
      alert('Por favor, preencha o título da notícia');
      return;
    }
    if (!newsForm.content.trim()) {
      alert('Por favor, preencha o conteúdo da notícia');
      return;
    }

    const newNewsData = {
      ...newsForm,
      image: newsForm.image || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7'
    };

    addNews(newNewsData);
    setNewsForm({ title: '', content: '', image: '', published: true, author: 'Admin', category: 'Novidades' });
    setNewsImagePreview('');
    setIsCreatingNews(false);
  };

  const handleUpdateNews = () => {
    if (!editingNews.title.trim() || !editingNews.content.trim()) {
      alert('Por favor, preencha título e conteúdo');
      return;
    }
    updateNews(editingNews.id, editingNews);
    setEditingNews(null);
    setNewsImagePreview('');
  };

  const handleDeleteNews = (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta notícia?')) {
      deleteNews(id);
    }
  };

  const handleCancelNews = () => {
    setIsCreatingNews(false);
    setEditingNews(null);
    setNewsForm({ title: '', content: '', image: '', published: true, author: 'Admin', category: 'Novidades' });
    setNewsImagePreview('');
  };

  const handleCreateDrawing = async () => {
    if (!drawingForm.title.trim() || !drawingForm.description.trim() || !drawingForm.image) {
      alert('Por favor, preencha todos os campos obrigatórios e adicione uma imagem');
      return;
    }

    const result = await addDrawing(drawingForm);
    
    if (result.success) {
      alert('✅ Desenho salvo com sucesso!');
      setDrawingForm({
        title: '', description: '', category: 'Entretenimento',
        subcategory: 'Desenhos Animados', difficulty: 'Médio',
        ageGroup: '6-8', image: ''
      });
      setDrawingImagePreview('');
      setIsCreatingDrawing(false);
    } else {
      alert('❌ Erro: ' + result.message);
    }
  };

  const handleUpdateDrawing = async () => {
    const result = await updateDrawing(editingDrawing.id, editingDrawing);
    
    if (result.success) {
      alert('✅ Desenho atualizado com sucesso!');
      setEditingDrawing(null);
      setDrawingImagePreview('');
    } else {
      alert('❌ Erro ao atualizar: ' + result.message);
    }
  };

  const handleDeleteDrawing = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este desenho do banco de dados?')) {
      const result = await deleteDrawing(id);
      
      if (result.success) {
        alert('✅ Desenho deletado do banco de dados!');
      } else {
        alert('❌ Erro: ' + result.message);
      }
    }
  };

  const handleCancelDrawing = () => {
    setIsCreatingDrawing(false);
    setEditingDrawing(null);
    setDrawingForm({
      title: '',
      description: '',
      category: 'Entretenimento',
      subcategory: 'Desenhos Animados',
      difficulty: 'Médio',
      ageGroup: '6-8',
      image: ''
    });
    setDrawingImagePreview('');
  };

  // ========== FUNÇÕES DE DEPOIMENTOS ==========
const handleCreateTestimonial = () => {
  if (!testimonialForm.name || !testimonialForm.role || !testimonialForm.text) {
    alert('Por favor, preencha todos os campos obrigatórios');
    return;
  }
  
  addTestimonial(testimonialForm);
  setTestimonialForm({
    name: '',
    role: '',
    text: '',
    avatar: '',
    rating: 5
  });
  setIsCreatingTestimonial(false);
  alert('Depoimento criado com sucesso!');
};

const handleUpdateTestimonial = () => {
  if (!editingTestimonial.name || !editingTestimonial.role || !editingTestimonial.text) {
    alert('Por favor, preencha todos os campos obrigatórios');
    return;
  }
  
  updateTestimonial(editingTestimonial.id, editingTestimonial);
  setEditingTestimonial(null);
  alert('Depoimento atualizado com sucesso!');
};

const handleDeleteTestimonial = (id) => {
  if (window.confirm('Tem certeza que deseja excluir este depoimento?')) {
    deleteTestimonial(id);
    alert('Depoimento excluído com sucesso!');
  }
};

const handleCancelTestimonial = () => {
  setIsCreatingTestimonial(false);
  setEditingTestimonial(null);
  setTestimonialForm({
    name: '',
    role: '',
    text: '',
    avatar: '',
    rating: 5
  });
};
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'news', label: 'Notícias', icon: FileText },
    { id: 'drawings', label: 'Desenhos', icon: ImageIcon },
    { id: 'testimonials', label: 'Depoimentos', icon: MessageSquare }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🎨</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">FreeColoringBookids</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Bem-vindo, Admin</span>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] p-4">
          <nav className="space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {stat.change}
                      </span>
                    </div>
                    <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.label}</h3>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Monthly Impressions Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                    Impressos Mensais
                  </h2>
                  {loadingMonthly && (
                    <span className="text-sm text-gray-500">Carregando...</span>
                  )}
                </div>
                <div className="space-y-4">
                  {monthlyStats.length === 0 && !loadingMonthly ? (
                    <div className="text-center py-8 text-gray-500">
                      Nenhum dado disponível ainda. Adicione desenhos para ver estatísticas.
                    </div>
                  ) : (
                    monthlyStats.map((data, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 font-medium">{data.month}</span>
                          <span className="text-gray-800 font-semibold">
                            {data.impressions.toLocaleString()} Impressos
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(data.impressions / maxImpressions) * 100}%` }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'news' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Gerenciar Notícias</h2>
                  <p className="text-gray-600 mt-1">Total: {news.length} notícias</p>
                </div>
                <button
                  onClick={() => setIsCreatingNews(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
                >
                  <Plus className="w-5 h-5" />
                  Nova Notícia
                </button>
              </div>

              {/* Create/Edit News Form */}
              {(isCreatingNews || editingNews) && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {editingNews ? 'Editar Notícia' : 'Nova Notícia'}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Título *
                      </label>
                      <input
                        type="text"
                        value={editingNews ? editingNews.title : newsForm.title}
                        onChange={(e) => editingNews 
                          ? setEditingNews({...editingNews, title: e.target.value})
                          : setNewsForm({...newsForm, title: e.target.value})
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Digite o título da notícia"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Conteúdo *
                      </label>
                      <textarea
                        value={editingNews ? editingNews.content : newsForm.content}
                        onChange={(e) => editingNews
                          ? setEditingNews({...editingNews, content: e.target.value})
                          : setNewsForm({...newsForm, content: e.target.value})
                        }
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Digite o conteúdo da notícia"
                      />
                    </div>

                    {/* Image Upload Area */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Imagem (Opcional)
                      </label>
                      <div
                        onDragOver={handleNewsDragOver}
                        onDragLeave={handleNewsDragLeave}
                        onDrop={handleNewsDrop}
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                          isDraggingNews 
                            ? 'border-purple-500 bg-purple-50' 
                            : 'border-gray-300 hover:border-purple-400'
                        }`}
                      >
                        {(newsImagePreview || (editingNews && editingNews.image)) ? (
                          <div className="space-y-4">
                            <img
                              src={newsImagePreview || editingNews.image}
                              alt="Preview"
                              className="max-h-64 mx-auto rounded-lg"
                            />
                            <button
                              onClick={() => {
                                setNewsImagePreview('');
                                if (editingNews) {
                                  setEditingNews({...editingNews, image: ''});
                                } else {
                                  setNewsForm({...newsForm, image: ''});
                                }
                              }}
                              className="text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              Remover imagem
                            </button>
                          </div>
                        ) : (
                          <div>
                            <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                            <p className="text-gray-600 mb-2">
                              Arraste e solte uma imagem aqui ou
                            </p>
                            <label className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 cursor-pointer transition-all">
                              <Upload className="w-4 h-4" />
                              Escolher arquivo
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleNewsFileInput}
                                className="hidden"
                              />
                            </label>
                            <p className="text-xs text-gray-500 mt-2">
                              PNG, JPG, GIF até 5MB
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Categoria
                        </label>
                        <select
                          value={editingNews ? editingNews.category : newsForm.category}
                          onChange={(e) => editingNews
                            ? setEditingNews({...editingNews, category: e.target.value})
                            : setNewsForm({...newsForm, category: e.target.value})
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          {newsCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Autor
                        </label>
                        <input
                          type="text"
                          value={editingNews ? editingNews.author : newsForm.author}
                          onChange={(e) => editingNews
                            ? setEditingNews({...editingNews, author: e.target.value})
                            : setNewsForm({...newsForm, author: e.target.value})
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Nome do autor"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingNews ? editingNews.published : newsForm.published}
                          onChange={(e) => editingNews
                            ? setEditingNews({...editingNews, published: e.target.checked})
                            : setNewsForm({...newsForm, published: e.target.checked})
                          }
                          className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Publicar imediatamente</span>
                      </label>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={editingNews ? handleUpdateNews : handleCreateNews}
                        className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
                      >
                        <Save className="w-4 h-4" />
                        {editingNews ? 'Atualizar' : 'Publicar'}
                      </button>
                      <button
                        onClick={handleCancelNews}
                        className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-all"
                      >
                        <X className="w-4 h-4" />
                        Cancelar
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* News List */}
              <div className="grid gap-4">
                {news.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row">
                      {item.image && (
                        <div className="md:w-48 h-48 md:h-auto bg-gray-100">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                item.published 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-gray-100 text-gray-700'
                              }`}>
                                {item.published ? 'Publicado' : 'Rascunho'}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(item.date).toLocaleDateString('pt-BR')}
                              </div>
                              <span>•</span>
                              <span>{item.category}</span>
                              <span>•</span>
                              <span>{item.author}</span>
                            </div>
                            <p className="text-gray-600 line-clamp-2">{item.content}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingNews(item);
                              setNewsImagePreview(item.image);
                            }}
                            className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-all"
                          >
                            <Edit2 className="w-4 h-4" />
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteNews(item.id)}
                            className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                            Deletar
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'drawings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Gerenciar Desenhos</h2>
                  <p className="text-gray-600 mt-1">Total: {drawings.length} desenhos</p>
                </div>
                <button
                  onClick={() => setIsCreatingDrawing(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
                >
                  <Plus className="w-5 h-5" />
                  Novo Desenho
                </button>
              </div>

              {/* FILTRO DE ORDENAÇÃO */}
              {!isCreatingDrawing && !editingDrawing && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BarChart3 className="w-4 h-4" />
                      <span>Ordenar por:</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setDrawingSortOption('recent')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          drawingSortOption === 'recent'
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Mais Recentes
                      </button>
                      <button
                        onClick={() => setDrawingSortOption('impressions')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          drawingSortOption === 'impressions'
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Mais Impressos
                      </button>
                      <button
                        onClick={() => setDrawingSortOption('likes')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          drawingSortOption === 'likes'
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Mais Curtidas
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* FORMULÁRIO DE CRIAR/EDITAR DESENHO */}
              {(isCreatingDrawing || editingDrawing) && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {editingDrawing ? 'Editar Desenho' : 'Novo Desenho'}
                  </h3>
                  <div className="space-y-4">
                    {/* Título */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Título *
                      </label>
                      <input
                        type="text"
                        value={editingDrawing ? editingDrawing.title : drawingForm.title}
                        onChange={(e) => editingDrawing 
                          ? setEditingDrawing({...editingDrawing, title: e.target.value})
                          : setDrawingForm({...drawingForm, title: e.target.value})
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Ex: Homem Aranha Voador"
                      />
                    </div>

                    {/* Descrição */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição *
                      </label>
                      <textarea
                        value={editingDrawing ? editingDrawing.description : drawingForm.description}
                        onChange={(e) => editingDrawing
                          ? setEditingDrawing({...editingDrawing, description: e.target.value})
                          : setDrawingForm({...drawingForm, description: e.target.value})
                        }
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Descreva o desenho para ajudar os usuários a encontrá-lo"
                      />
                    </div>

                    {/* Upload de Imagem */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Imagem do Desenho *
                      </label>
                      <div
                        onDragOver={handleDrawingDragOver}
                        onDragLeave={handleDrawingDragLeave}
                        onDrop={handleDrawingDrop}
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                          isDraggingDrawing 
                            ? 'border-purple-500 bg-purple-50' 
                            : 'border-gray-300 hover:border-purple-400'
                        }`}
                      >
                        {(drawingImagePreview || (editingDrawing && editingDrawing.image)) ? (
                          <div className="space-y-4">
                            <img
                              src={drawingImagePreview || editingDrawing.image}
                              alt="Preview"
                              className="max-h-64 mx-auto rounded-lg border-2 border-gray-200"
                            />
                            <button
                              onClick={() => {
                                setDrawingImagePreview('');
                                if (editingDrawing) {
                                  setEditingDrawing({...editingDrawing, image: ''});
                                } else {
                                  setDrawingForm({...drawingForm, image: ''});
                                }
                              }}
                              className="text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                              Remover imagem
                            </button>
                          </div>
                        ) : (
                          <div>
                            <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                            <p className="text-gray-600 mb-2">
                              Arraste e solte a imagem do desenho aqui ou
                            </p>
                            <label className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 cursor-pointer transition-all">
                              <Upload className="w-4 h-4" />
                              Escolher arquivo
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleDrawingFileInput}
                                className="hidden"
                              />
                            </label>
                            <p className="text-xs text-gray-500 mt-2">
                              PNG, JPG, GIF até 5MB
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Categoria e Subcategoria */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Categoria
                        </label>
                        <select
                          value={editingDrawing ? editingDrawing.category : drawingForm.category}
                          onChange={(e) => {
                            const newCategory = e.target.value;
                            const firstSubcategory = drawingCategories[newCategory][0];
                            if (editingDrawing) {
                              setEditingDrawing({
                                ...editingDrawing, 
                                category: newCategory,
                                subcategory: firstSubcategory
                              });
                            } else {
                              setDrawingForm({
                                ...drawingForm, 
                                category: newCategory,
                                subcategory: firstSubcategory
                              });
                            }
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          {Object.keys(drawingCategories).map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subcategoria
                        </label>
                        <select
                          value={editingDrawing ? editingDrawing.subcategory : drawingForm.subcategory}
                          onChange={(e) => editingDrawing
                            ? setEditingDrawing({...editingDrawing, subcategory: e.target.value})
                            : setDrawingForm({...drawingForm, subcategory: e.target.value})
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          {drawingCategories[editingDrawing ? editingDrawing.category : drawingForm.category].map(sub => (
                            <option key={sub} value={sub}>{sub}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Dificuldade e Faixa Etária */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Dificuldade
                        </label>
                        <select
                          value={editingDrawing ? editingDrawing.difficulty : drawingForm.difficulty}
                          onChange={(e) => editingDrawing
                            ? setEditingDrawing({...editingDrawing, difficulty: e.target.value})
                            : setDrawingForm({...drawingForm, difficulty: e.target.value})
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          {difficulties.map(diff => (
                            <option key={diff} value={diff}>{diff}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Faixa Etária
                        </label>
                        <select
                          value={editingDrawing ? editingDrawing.ageGroup : drawingForm.ageGroup}
                          onChange={(e) => editingDrawing
                            ? setEditingDrawing({...editingDrawing, ageGroup: e.target.value})
                            : setDrawingForm({...drawingForm, ageGroup: e.target.value})
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          {ageGroups.map(age => (
                            <option key={age} value={age}>{age} anos</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Botões */}
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={editingDrawing ? handleUpdateDrawing : handleCreateDrawing}
                        className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
                      >
                        <Save className="w-4 h-4" />
                        {editingDrawing ? 'Atualizar' : 'Adicionar Desenho'}
                      </button>
                      <button
                        onClick={handleCancelDrawing}
                        className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-all"
                      >
                        <X className="w-4 h-4" />
                        Cancelar
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* LISTA DE DESENHOS */}
              <div className="grid gap-4">
                {[...drawings].sort((a, b) => {
                  if (drawingSortOption === 'recent') return new Date(b.dateAdded) - new Date(a.dateAdded);
                  if (drawingSortOption === 'impressions') return b.downloads - a.downloads;
                  if (drawingSortOption === 'likes') return b.likes - a.likes;
                  if (drawingSortOption === 'rating') return b.rating - a.rating;
                  return 0;
                }).map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row">
                      {item.image && (
                        <div className="md:w-48 h-48 md:h-auto bg-gray-100">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                                {item.category}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3 flex-wrap">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(item.dateAdded).toLocaleDateString('pt-BR')}
                              </span>
                              <span>•</span>
                              <span>{item.subcategory}</span>
                              <span>•</span>
                              <span>{item.difficulty}</span>
                              <span>•</span>
                              <span>{item.ageGroup} anos</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Printer className="w-4 h-4" />
                                {item.downloads} Impressos
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Heart className="w-4 h-4" />
                                {item.likes} curtidas
                              </span>
                            </div>
                            <p className="text-gray-600 line-clamp-2">{item.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingDrawing(item);
                              setDrawingImagePreview(item.image);
                            }}
                            className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-all"
                          >
                            <Edit2 className="w-4 h-4" />
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteDrawing(item.id)}
                            className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                            Deletar
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {drawings.length === 0 && (
                  <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                    <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg mb-2">Nenhum desenho cadastrado</p>
                    <p className="text-gray-400 text-sm">Clique em "Novo Desenho" para começar</p>
                  </div>
                )}
              </div>
            </div>
          )}
        {activeTab === 'testimonials' && (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Gerenciar Depoimentos</h2>
            <p className="text-gray-600 mt-1">Total: {testimonials.length} depoimentos</p>
          </div>
          <button
            onClick={() => setIsCreatingTestimonial(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Novo Depoimento
          </button>
        </div>

        {/* Create/Edit Testimonial Form */}
        {(isCreatingTestimonial || editingTestimonial) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {editingTestimonial ? 'Editar Depoimento' : 'Novo Depoimento'}
            </h3>
            <div className="space-y-4">
              {/* Nome */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  value={editingTestimonial ? editingTestimonial.name : testimonialForm.name}
                  onChange={(e) => editingTestimonial 
                    ? setEditingTestimonial({...editingTestimonial, name: e.target.value})
                    : setTestimonialForm({...testimonialForm, name: e.target.value})
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ex: Maria Silva"
                />
              </div>

              {/* Função/Relação */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Função/Relação *
                </label>
                <input
                  type="text"
                  value={editingTestimonial ? editingTestimonial.role : testimonialForm.role}
                  onChange={(e) => editingTestimonial 
                    ? setEditingTestimonial({...editingTestimonial, role: e.target.value})
                    : setTestimonialForm({...testimonialForm, role: e.target.value})
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ex: Mãe de 2 crianças"
                />
              </div>

              {/* Depoimento */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Depoimento *
                </label>
                <textarea
                  value={editingTestimonial ? editingTestimonial.text : testimonialForm.text}
                  onChange={(e) => editingTestimonial
                    ? setEditingTestimonial({...editingTestimonial, text: e.target.value})
                    : setTestimonialForm({...testimonialForm, text: e.target.value})
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Digite o depoimento..."
                />
              </div>

              {/* Avatar URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL do Avatar (Opcional)
                </label>
                <input
                  type="text"
                  value={editingTestimonial ? editingTestimonial.avatar : testimonialForm.avatar}
                  onChange={(e) => editingTestimonial 
                    ? setEditingTestimonial({...editingTestimonial, avatar: e.target.value})
                    : setTestimonialForm({...testimonialForm, avatar: e.target.value})
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://exemplo.com/avatar.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Se deixar vazio, será gerado automaticamente
                </p>
              </div>

              {/* Avaliação */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avaliação (1-5 estrelas)
                </label>
                <select
                  value={editingTestimonial ? editingTestimonial.rating : testimonialForm.rating}
                  onChange={(e) => editingTestimonial
                    ? setEditingTestimonial({...editingTestimonial, rating: parseInt(e.target.value)})
                    : setTestimonialForm({...testimonialForm, rating: parseInt(e.target.value)})
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value={5}>★★★★★ (5 estrelas)</option>
                  <option value={4}>★★★★☆ (4 estrelas)</option>
                  <option value={3}>★★★☆☆ (3 estrelas)</option>
                  <option value={2}>★★☆☆☆ (2 estrelas)</option>
                  <option value={1}>★☆☆☆☆ (1 estrela)</option>
                </select>
              </div>

              {/* Botões */}
              <div className="flex gap-3">
                <button
                  onClick={editingTestimonial ? handleUpdateTestimonial : handleCreateTestimonial}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {editingTestimonial ? 'Atualizar' : 'Criar'}
                </button>
                <button
                  onClick={handleCancelTestimonial}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Cancelar
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Lista de Depoimentos */}
        <div className="grid gap-4">
          {testimonials.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Nenhum depoimento cadastrado ainda.</p>
            </div>
          ) : (
            testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <img
                      src={testimonial.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.name}`}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full border-4 border-purple-100"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < testimonial.rating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{testimonial.role}</p>
                      <p className="text-gray-700 italic">"{testimonial.text}"</p>
                      <p className="text-xs text-gray-500 mt-2">{new Date(testimonial.date).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingTestimonial(testimonial)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteTestimonial(testimonial.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    )}
        </main>
      </div>
    </div>
  );
};
export default AdminDashboard;