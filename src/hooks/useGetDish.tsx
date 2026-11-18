import { useState, useEffect } from 'react';
import { getAdminDishes } from '@/data/adminStore';

export const useGetDish = (id: number) => {
  const [dish, setDish] = useState(() => getAdminDishes().find((d) => d.id === id) ?? null);

  useEffect(() => {
    const handleUpdate = () => {
      setDish(getAdminDishes().find((d) => d.id === id) ?? null);
    };
    window.addEventListener('shabu-admin-menu-changed', handleUpdate);
    return () => window.removeEventListener('shabu-admin-menu-changed', handleUpdate);
  }, [id]);

  return {
    dish,
    isLoading: false,
  };
};
