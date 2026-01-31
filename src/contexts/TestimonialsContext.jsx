import React, { createContext, useContext, useState, useEffect } from 'react';

const TestimonialsContext = createContext();

export const useTestimonials = () => {
  const context = useContext(TestimonialsContext);
  if (!context) {
    throw new Error('useTestimonials must be used within a TestimonialsProvider');
  }
  return context;
};

export const TestimonialsProvider = ({ children }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = 'http://localhost/api-colorir/testimonials';

  // Carregar depoimentos ao montar o componente
  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Buscar todos os depoimentos
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/list.php`);
      const json = await response.json();
      
      if (json.success) {
        setTestimonials(json.data);
      } else {
        console.error('Erro ao carregar depoimentos:', json.message);
      }
    } catch (error) {
      console.error('Erro ao buscar depoimentos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Adicionar novo depoimento
  const addTestimonial = async (testimonialData) => {
    try {
      const response = await fetch(`${API_BASE}/create.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testimonialData)
      });

      const json = await response.json();

      if (json.success) {
        // Adicionar o novo depoimento ao estado
        setTestimonials([json.data, ...testimonials]);
        return { success: true, data: json.data };
      } else {
        console.error('Erro ao criar depoimento:', json.message);
        return { success: false, message: json.message };
      }
    } catch (error) {
      console.error('Erro ao adicionar depoimento:', error);
      return { success: false, message: 'Erro ao conectar com o servidor' };
    }
  };

  // Atualizar depoimento existente
  const updateTestimonial = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_BASE}/update.php`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...updatedData })
      });

      const json = await response.json();

      if (json.success) {
        // Atualizar o depoimento no estado
        setTestimonials(testimonials.map(t => 
          t.id === id ? json.data : t
        ));
        return { success: true, data: json.data };
      } else {
        console.error('Erro ao atualizar depoimento:', json.message);
        return { success: false, message: json.message };
      }
    } catch (error) {
      console.error('Erro ao atualizar depoimento:', error);
      return { success: false, message: 'Erro ao conectar com o servidor' };
    }
  };

  // Deletar depoimento
  const deleteTestimonial = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/delete.php?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const json = await response.json();

      if (json.success) {
        // Remover o depoimento do estado
        setTestimonials(testimonials.filter(t => t.id !== id));
        return { success: true };
      } else {
        console.error('Erro ao deletar depoimento:', json.message);
        return { success: false, message: json.message };
      }
    } catch (error) {
      console.error('Erro ao deletar depoimento:', error);
      return { success: false, message: 'Erro ao conectar com o servidor' };
    }
  };

  // Buscar depoimento por ID
  const getTestimonialById = (id) => {
    return testimonials.find(t => t.id === parseInt(id));
  };

  return (
    <TestimonialsContext.Provider 
      value={{ 
        testimonials, 
        loading,
        addTestimonial, 
        updateTestimonial, 
        deleteTestimonial,
        getTestimonialById,
        refreshTestimonials: fetchTestimonials
      }}
    >
      {children}
    </TestimonialsContext.Provider>
  );
};