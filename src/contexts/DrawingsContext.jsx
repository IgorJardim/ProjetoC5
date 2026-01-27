import React, { createContext, useContext, useState, useEffect } from 'react';

const DrawingsContext = createContext();

export const useDrawings = () => {
  const context = useContext(DrawingsContext);
  if (!context) {
    throw new Error('useDrawings must be used within DrawingsProvider');
  }
  return context;
};

const API_URL = 'http://localhost/api-colorir/drawings';

export const DrawingsProvider = ({ children }) => {
  const [drawings, setDrawings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDrawings();
  }, []);

  const loadDrawings = async () => {
    try {
      setLoading(true);
      console.log('🔄 [DRAWINGS] Iniciando carregamento...');
      console.log('📡 [DRAWINGS] URL da API:', `${API_URL}/list.php`);
      
      const response = await fetch(`${API_URL}/list.php`);
      console.log('📥 [DRAWINGS] Resposta recebida:', response);
      console.log('📊 [DRAWINGS] Status:', response.status);
      console.log('✅ [DRAWINGS] OK?', response.ok);
      
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('✅ [DRAWINGS] Dados processados:', result);
      
      if (result.success) {
        console.log('✅ [DRAWINGS] Total de desenhos:', result.total);
        setDrawings(result.data);
        setError(null);
      } else {
        console.error('❌ [DRAWINGS] Erro retornado pela API:', result.message);
        setError(result.message);
      }
    } catch (err) {
      console.error('❌ [DRAWINGS] Erro ao carregar:', err);
      console.error('❌ [DRAWINGS] Mensagem:', err.message);
      console.error('❌ [DRAWINGS] Stack:', err.stack);
      
      setError('Erro ao carregar desenhos: ' + err.message);
      
      // Fallback: usar dados de exemplo se API falhar
      console.warn('⚠️ [DRAWINGS] Usando dados de fallback');
      setDrawings([
        {
          id: 999,
          title: '⚠️ Desenho Local (API Offline)',
          description: 'Este é um desenho de exemplo. A API não está respondendo.',
          category: 'Entretenimento',
          subcategory: 'Desenhos Animados',
          difficulty: 'Médio',
          ageGroup: '6-8',
          image: 'https://images.unsplash.com/photo-1616815683456-cd7c482c2272',
          downloads: 0,
          rating: 5.0,
          dateAdded: new Date().toISOString().split('T')[0]
        }
      ]);
    } finally {
      setLoading(false);
      console.log('🏁 [DRAWINGS] Carregamento finalizado');
    }
  };

  const addDrawing = async (drawingData) => {
    try {
      console.log('➕ [DRAWINGS] Adicionando novo desenho:', drawingData);
      
      const response = await fetch(`${API_URL}/create.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(drawingData)
      });
      
      console.log('📥 [DRAWINGS] Resposta create:', response);
      
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('✅ [DRAWINGS] Resultado create:', result);
      
      if (result.success) {
        console.log('✅ [DRAWINGS] Desenho criado! ID:', result.id);
        await loadDrawings();
        return { success: true, message: result.message };
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      console.error('❌ [DRAWINGS] Erro ao adicionar:', err);
      return { success: false, message: err.message };
    }
  };

  const updateDrawing = async (id, updatedData) => {
    try {
      console.log('✏️ [DRAWINGS] Atualizando desenho ID:', id);
      console.log('📝 [DRAWINGS] Novos dados:', updatedData);
      
      const response = await fetch(`${API_URL}/update.php`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...updatedData })
      });
      
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('✅ [DRAWINGS] Resultado update:', result);
      
      if (result.success) {
        await loadDrawings();
        return { success: true, message: result.message };
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      console.error('❌ [DRAWINGS] Erro ao atualizar:', err);
      return { success: false, message: err.message };
    }
  };

  const deleteDrawing = async (id) => {
    try {
      console.log('🗑️ [DRAWINGS] Deletando desenho ID:', id);
      
      const response = await fetch(`${API_URL}/delete.php`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      });
      
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('✅ [DRAWINGS] Resultado delete:', result);
      
      if (result.success) {
        await loadDrawings();
        return { success: true, message: result.message };
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      console.error('❌ [DRAWINGS] Erro ao deletar:', err);
      return { success: false, message: err.message };
    }
  };

  const getDrawingById = (id) => {
    return drawings.find(item => item.id === parseInt(id));
  };

  const getDrawingsByCategory = (category) => {
    return drawings.filter(item => item.category === category);
  };

  const getDrawingsBySubcategory = (subcategory) => {
    return drawings.filter(item => item.subcategory === subcategory);
  };

  return (
    <DrawingsContext.Provider value={{
      drawings,
      loading,
      error,
      addDrawing,
      updateDrawing,
      deleteDrawing,
      getDrawingById,
      getDrawingsByCategory,
      getDrawingsBySubcategory,
      reloadDrawings: loadDrawings
    }}>
      {children}
    </DrawingsContext.Provider>
  );
};