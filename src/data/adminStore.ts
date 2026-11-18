import type { DishType } from '@/types';
import { dishes as initialDishes, type ShabuDish, type MenuCategory } from './mock';
import { readOrders as readCustomerOrders, type DemoOrder, type Fulfillment } from './local';

export type OrderStatus = 'pending' | 'cooking' | 'delivering' | 'completed' | 'cancelled';

export interface AdminOrder extends DemoOrder {
  status: OrderStatus;
  updatedAt?: string;
  tableNo?: string;
}

export interface AdminReservation {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  note?: string;
  status: 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface StoreSettings {
  isOpen: boolean;
  storeName: string;
  branch: string;
  phone: string;
  address: string;
  openTime: string;
  closeTime: string;
  standardDeliveryFee: number;
  freeDeliveryThreshold: number;
}

const STORAGE_KEYS = {
  ORDERS: 'shabu-admin-orders-v2',
  MENU: 'shabu-admin-menu-v2',
  RESERVATIONS: 'shabu-admin-reservations-v2',
  SETTINGS: 'shabu-admin-settings-v2',
};

// Default Sample Orders for rich Dashboard experience
const makeDishItem = (id: number, qty: number): DishType => {
  const found = initialDishes.find((d) => d.id === id);
  if (found) {
    return { ...found, quantity: qty };
  }
  return {
    id,
    name: 'ເມນູອາຫານ',
    price: 150,
    rating: 4.9,
    description: '',
    category: 'beef',
    type: 'food',
    cookingTime: 20,
    weight: '150 ກຣາມ',
    isAvailable: true,
    image: '/images/menu-grid.webp',
    quantity: qty,
  };
};

// Default Sample Orders for rich Dashboard experience
const sampleOrders: AdminOrder[] = [
  {
    id: 'NB-8A109F21',
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    name: 'ທ່ານ ສົມພອນ ໄຊຍະວົງ',
    phone: '020 55123456',
    address: 'ບ້ານ ໂພນສີນວນ, ເມືອງ ສີສັດຕະນາກ, ນະຄອນຫຼວງວຽງຈັນ',
    note: 'ຂໍນ້ຳຈິ້ມງາຂາວເພີ່ມ 2 ຖ້ວຍ, ບໍ່ໃສ່ຜັກຊີ',
    mode: 'delivery',
    payment: 'bcel_qr',
    status: 'cooking',
    items: [
      makeDishItem(101, 2),
      makeDishItem(111, 1),
      makeDishItem(112, 1),
    ],
    subtotal: 686,
    discount: 50,
    delivery: 0,
    total: 636,
  },
  {
    id: 'NB-7C442D19',
    createdAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    name: 'ນາງ ມະນີວັນ ແກ້ວມະນີ',
    phone: '020 99887766',
    address: 'ບ້ານ ໜອງບອນ, ເມືອງ ໄຊເສດຖາ, ນະຄອນຫຼວງວຽງຈັນ',
    note: 'ໂທຫາກ່ອນມາຮອດ',
    mode: 'delivery',
    payment: 'cash',
    status: 'delivering',
    items: [
      makeDishItem(108, 1),
      makeDishItem(107, 1),
    ],
    subtotal: 1218,
    discount: 100,
    delivery: 0,
    total: 1118,
  },
  {
    id: 'NB-4B991E02',
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    name: 'ທ່ານ ຄຳຫຼ້າ ວົງວິໄລ',
    phone: '020 77112233',
    address: 'ຮັບທີ່ໜ້າຮ້ານ · ສາຂາວຽງຈັນ',
    note: 'ມາຮັບເອງປະມານ 12:30',
    mode: 'pickup',
    payment: 'bcel_qr',
    status: 'pending',
    items: [
      makeDishItem(102, 2),
      makeDishItem(105, 1),
      makeDishItem(104, 1),
    ],
    subtotal: 516,
    discount: 0,
    delivery: 0,
    total: 516,
  },
  {
    id: 'NB-1F882C77',
    createdAt: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    name: 'ນາງ ວິໄລພອນ ສຸລິຍາ',
    phone: '020 22334455',
    address: 'ບ້ານ ທາດຫຼວງ, ນະຄອນຫຼວງວຽງຈັນ',
    note: '',
    mode: 'delivery',
    payment: 'bcel_qr',
    status: 'completed',
    items: [
      makeDishItem(103, 1),
      makeDishItem(110, 1),
    ],
    subtotal: 428,
    discount: 0,
    delivery: 49,
    total: 477,
  },
];

// Default Sample Reservations
const sampleReservations: AdminReservation[] = [
  {
    id: 'RES-001',
    name: 'ທ່ານ ສົມສັກ ຈະເລີນໄຊ',
    phone: '020 55443322',
    date: new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Vientiane' }).format(new Date()),
    time: '18:30',
    guests: 4,
    note: 'ຂໍໂຕະໃກ້ປ່ອງຢ້ຽມ ຈັດງານວັນເກີດ',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
  },
  {
    id: 'RES-002',
    name: 'ນາງ ພິມພາ ແສງມະນີ',
    phone: '020 99112233',
    date: new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Vientiane' }).format(new Date()),
    time: '19:00',
    guests: 6,
    note: 'ມີເດັກນ້ອຍ 1 ຄົນ ຂໍຕັ່ງເດັກນ້ອຍ',
    status: 'seated',
    createdAt: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
  },
  {
    id: 'RES-003',
    name: 'ທ່ານ ອາລຸນ ເດດວົງສາ',
    phone: '020 55889900',
    date: new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Vientiane' }).format(new Date(Date.now() + 86400000)),
    time: '12:00',
    guests: 2,
    note: 'ຄູ່ຮັກ ຂໍໂຕະມຸມສະຫງົບ',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
];

const defaultSettings: StoreSettings = {
  isOpen: true,
  storeName: 'Shabu.',
  branch: 'ສາຂາວຽງຈັນ (Vientiane Central)',
  phone: '020 5512 8899',
  address: 'ຖະໜົນ ໄກສອນ ພົມວິຫານ, ບ້ານ ໜອງບອນ, ເມືອງ ໄຊເສດຖາ, ນະຄອນຫຼວງວຽງຈັນ',
  openTime: '11:00',
  closeTime: '22:00',
  standardDeliveryFee: 49,
  freeDeliveryThreshold: 999,
};

// ----------------- ORDERS -----------------

export function getAdminOrders(): AdminOrder[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    let list: AdminOrder[] = [];
    if (raw) {
      list = JSON.parse(raw);
    } else {
      list = sampleOrders;
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(list));
    }

    // Merge any customer storefront orders that aren't in admin yet
    const customerOrders = readCustomerOrders();
    const existingIds = new Set(list.map(o => o.id));
    let hasNew = false;
    for (const co of customerOrders) {
      if (!existingIds.has(co.id)) {
        list.unshift({
          ...co,
          status: 'pending',
        });
        hasNew = true;
      }
    }
    if (hasNew) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(list));
    }

    return list;
  } catch {
    return sampleOrders;
  }
}

export function updateOrderStatus(orderId: string, status: OrderStatus): AdminOrder[] {
  const orders = getAdminOrders();
  const next = orders.map(ord => ord.id === orderId ? { ...ord, status, updatedAt: new Date().toISOString() } : ord);
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent('shabu-admin-orders-changed'));
  return next;
}

export function deleteAdminOrder(orderId: string): AdminOrder[] {
  const orders = getAdminOrders().filter(o => o.id !== orderId);
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  window.dispatchEvent(new CustomEvent('shabu-admin-orders-changed'));
  return orders;
}

// ----------------- MENU / DISHES -----------------

export function getAdminDishes(): ShabuDish[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MENU);
    if (raw) {
      return JSON.parse(raw);
    }
    localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(initialDishes));
    return initialDishes;
  } catch {
    return initialDishes;
  }
}

export function saveAdminDishes(dishes: ShabuDish[]): void {
  localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(dishes));
  window.dispatchEvent(new CustomEvent('shabu-admin-menu-changed'));
}

export function toggleDishAvailability(dishId: number): ShabuDish[] {
  const dishes = getAdminDishes();
  const next = dishes.map(d => d.id === dishId ? { ...d, isAvailable: !d.isAvailable } : d);
  saveAdminDishes(next);
  return next;
}

export function updateDish(dish: ShabuDish): ShabuDish[] {
  const dishes = getAdminDishes();
  const index = dishes.findIndex(d => d.id === dish.id);
  let next: ShabuDish[];
  if (index >= 0) {
    next = [...dishes];
    next[index] = dish;
  } else {
    next = [dish, ...dishes];
  }
  saveAdminDishes(next);
  return next;
}

export function deleteDish(dishId: number): ShabuDish[] {
  const dishes = getAdminDishes().filter(d => d.id !== dishId);
  saveAdminDishes(nextDishes(dishes));
  return dishes;
}
function nextDishes(d: ShabuDish[]) {
  saveAdminDishes(d);
  return d;
}

// ----------------- RESERVATIONS -----------------

export function getAdminReservations(): AdminReservation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
    let list: AdminReservation[] = [];
    if (raw) {
      list = JSON.parse(raw);
    } else {
      list = sampleReservations;
      localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(list));
    }

    // Check if customer made a reservation via storefront
    const custRaw = localStorage.getItem('nabe-demo-reservation');
    if (custRaw) {
      try {
        const custRes = JSON.parse(custRaw);
        if (custRes?.name && custRes?.date && !list.some(r => r.name === custRes.name && r.date === custRes.date)) {
          list.unshift({
            id: `RES-${Math.floor(100 + Math.random() * 900)}`,
            name: custRes.name,
            phone: '020 (ລູກຄ້າໜ້າເວັບ)',
            date: custRes.date,
            time: custRes.time,
            guests: Number(custRes.guests) || 2,
            note: 'ຈອງຜ່ານລະບົບອອນລາຍ',
            status: 'confirmed',
            createdAt: new Date().toISOString(),
          });
          localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(list));
        }
      } catch {
        // ignore
      }
    }

    return list;
  } catch {
    return sampleReservations;
  }
}

export function updateReservationStatus(id: string, status: AdminReservation['status']): AdminReservation[] {
  const list = getAdminReservations();
  const next = list.map(r => r.id === id ? { ...r, status } : r);
  localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent('shabu-admin-reservations-changed'));
  return next;
}

export function addReservation(res: Omit<AdminReservation, 'id' | 'createdAt'>): AdminReservation[] {
  const list = getAdminReservations();
  const newRes: AdminReservation = {
    ...res,
    id: `RES-${Math.floor(100 + Math.random() * 900)}`,
    createdAt: new Date().toISOString(),
  };
  const next = [newRes, ...list];
  localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent('shabu-admin-reservations-changed'));
  return next;
}

// ----------------- SETTINGS -----------------

export function getStoreSettings(): StoreSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return raw ? JSON.parse(raw) : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export function saveStoreSettings(settings: StoreSettings): void {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  window.dispatchEvent(new CustomEvent('shabu-admin-settings-changed'));
}

export function resetDemoData(): void {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(sampleOrders));
  localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(initialDishes));
  localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(sampleReservations));
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(defaultSettings));
  window.dispatchEvent(new CustomEvent('shabu-admin-orders-changed'));
  window.dispatchEvent(new CustomEvent('shabu-admin-menu-changed'));
  window.dispatchEvent(new CustomEvent('shabu-admin-reservations-changed'));
}
