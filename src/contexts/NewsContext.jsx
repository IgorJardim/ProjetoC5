import React, { createContext, useContext, useState, useEffect } from 'react';

const NewsContext = createContext();

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within NewsProvider');
  }
  return context;
};

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- NOVA FUNÇÃO: Carrega as notícias do PHP ---
  const loadNews = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost/api-colorir/news/list.php');
      const result = await response.json();
      if (result.success) {
        setNews(result.data);
      }
    } catch (error) {
      console.error("Erro ao carregar notícias do banco:", error);
    } finally {
      setLoading(false);
    }
  };

  // Carrega as notícias assim que o app abrir
  useEffect(() => {
    loadNews();
  }, []);

  // --- FUNÇÃO ATUALIZADA: Salva no Banco via PHP ---
  const addNews = async (newsItem) => {
    try {
      const response = await fetch('http://localhost/api-colorir/news/create.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsItem)
      });
      
      const result = await response.json();
      
      if (result.success) {
        await loadNews(); // Recarrega a lista vinda do banco
        return { success: true };
      } else {
        alert("Erro no PHP: " + result.message);
        return { success: false };
      }
    } catch (error) {
      console.error("Erro ao conectar com a API:", error);
      return { success: false };
    }
  };

  // --- FUNÇÃO ATUALIZADA: Deleta no Banco ---
  const deleteNews = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta notícia?')) return;

    try {
      const response = await fetch(`http://localhost/api-colorir/news/delete.php?id=${id}`, {
        method: 'DELETE'
      });
      const result = await response.json();
      if (result.success) {
        setNews(prev => prev.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  const updateNews = async (id, updatedNews) => {
  try {
    const response = await fetch('http://localhost/api-colorir/news/update.php', {
      method: 'POST', // Usamos POST pois o PHP lida melhor com JSON/Base64 assim
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...updatedNews, id })
    });
    
    const result = await response.json();
    
    if (result.success) {
      await loadNews(); // Recarrega a lista do banco para refletir as mudanças
      return { success: true };
    }
    return { success: false, message: result.message };
  } catch (error) {
    console.error("Erro ao atualizar notícia:", error);
    return { success: false };
  }
};

  const getPublishedNews = () => {
    return news.filter(item => item.published === 1 || item.published === true);
  };

  const getNewsById = (id) => {
    return news.find(item => item.id === parseInt(id));
  };

  return (
    <NewsContext.Provider value={{
      news,
      loading,
      addNews,
      updateNews,
      deleteNews,
      getPublishedNews,
      getNewsById,
      refreshNews: loadNews // Caso precise atualizar manualmente
    }}>
      {children}
    </NewsContext.Provider>
  );
};