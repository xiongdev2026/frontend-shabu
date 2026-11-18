import { useState, useEffect } from 'react';
import { getAdminDishes } from '@/data/adminStore';

export const useGetDishes = () => {
  const [dishes, setDishes] = useState(getAdminDishes());

  useEffect(() => {
    const handleUpdate = () => setDishes(getAdminDishes());
    window.addEventListener('shabu-admin-menu-changed', handleUpdate);
    return () => window.removeEventListener('shabu-admin-menu-changed', handleUpdate);
  }, []);

  return {
    dishes,
    loading: false,
  };
};
