import type {DishType} from '@/types';

export type MenuCategory =
  | 'all'
  | 'sets'
  | 'beef'
  | 'pork'
  | 'seafood'
  | 'vegetables'
  | 'soup'
  | 'drinks';
export const categories: {
  id: MenuCategory;
  name: string;
  english: string;
  icon: string;
}[] = [
  {
    id: 'all',
    name: 'ທັງໝົດ',
    english: 'All menu',
    icon: 'grid',
  },
  {
    id: 'sets',
    name: 'ຊຸດຊາບູ',
    english: 'Shabu sets',
    icon: 'pot',
  },
  {
    id: 'beef',
    name: 'ຊີ້ນຊັ້ນດີ',
    english: 'Premium beef',
    icon: 'beef',
  },
  {
    id: 'pork',
    name: 'ຊີ້ນໝູ',
    english: 'Pork',
    icon: 'beef',
  },
  {
    id: 'seafood',
    name: 'ອາຫານທະເລ',
    english: 'Seafood',
    icon: 'shrimp',
  },
  {
    id: 'vegetables',
    name: 'ຜັກ ແລະ ຂອງກິນຫຼິ້ນ',
    english: 'Veggies & sides',
    icon: 'leaf',
  },
  {
    id: 'soup',
    name: 'ນ້ຳຊຸບ',
    english: 'Broths',
    icon: 'pot',
  },
  {
    id: 'drinks',
    name: 'ເຄື່ອງດື່ມ',
    english: 'Drinks',
    icon: 'cup',
  },
];
export type ShabuDish = DishType & {
  category: MenuCategory;
  english: string;
  sprite?: number;
  badge?: string;
  originalPrice?: number;
  serves?: string;
  allergens: string[];
};
const base = {
  rating: 4.9,
  type: 'food' as const,
  cookingTime: 25,
  isAvailable: true,
  image: '/images/menu-grid.webp',
  allergens: [] as string[],
};
export const dishes: ShabuDish[] = [
  {
    ...base,
    id: 101,
    name: 'ຊີ້ນວາກິວຊອຍບາງ',
    english: 'Wagyu Beef',
    description:
      'ຊີ້ນວາກິວລາຍຫິນອ່ອນ ຊອຍບາງພໍດີ ນຸ່ມລະມຸນທຸກຄຳ. ແນະນຳໃຫ້ລວກໃນນ້ຳຊຸບຄອມບຸເພື່ອລິ້ມລອງລົດຊາດຊີ້ນຢ່າງເຕັມທີ່.',
    price: 259,
    category: 'beef',
    weight: '150 ກຣາມ',
    sprite: 0,
    badge: 'ຂາຍດີ',
    isPopular: true,
    isRecommended: true,
    ingredients: ['ຊີ້ນວາກິວຊອຍບາງ', 'ໃບຊິໂຊະ'],
  },
  {
    ...base,
    id: 102,
    name: 'ໝູຄຸໂຣບຸຕະຊອຍບາງ',
    english: 'Kurobuta Pork',
    description:
      'ໝູຄຸໂຣບຸຕະຄັດສັນພິເສດ ຊີ້ນນຸ່ມ ຫອມຫວານຕາມທຳມະຊາດ ເຂົ້າກັນດີກັບນ້ຳຈິ້ມງາສູດພິເສດຂອງເຮົາ.',
    price: 159,
    category: 'pork',
    weight: '150 ກຣາມ',
    sprite: 1,
    badge: 'ເຊັບແນະນຳ',
    isRecommended: true,
    ingredients: ['ໝູຄຸໂຣບຸຕະ', 'ໃບຊິໂຊະ'],
  },
  {
    ...base,
    id: 103,
    name: 'ຊຸດຊາບູອຸ່ນໃຈ',
    english: 'Signature Shabu Set',
    description:
      'ຄົບຄວາມແຊບໃນຊຸດດຽວ: ໝູຄຸໂຣບຸຕະ, ຊີ້ນຊອຍ, ຜັກສົດ, ເຕົ້າຫູ້ ແລະ ເສັ້ນອຸດົ້ງ ພ້ອມນ້ຳຊຸບ ແລະ ນ້ຳຈິ້ມ 2 ສູດ ສຳລັບມື້ພິເສດຂອງທ່ານ.',
    price: 599,
    originalPrice: 699,
    category: 'sets',
    weight: 'ຊຸດສຳລັບ 2 ຄົນ',
    image: '/images/shabu-hero.webp',
    badge: 'ປະຢັດ ₭100,000',
    isRecommended: true,
    isPopular: true,
    serves: '2 ຄົນ',
    ingredients: [
      'ໝູຄຸໂຣບຸຕະ 150 ກຣາມ',
      'ຊີ້ນຊອຍ 150 ກຣາມ',
      'ຊຸດຜັກລວມ',
      'ເຕົ້າຫູ້',
      'ເສັ້ນອຸດົ້ງ',
      'ນ້ຳຊຸບຄອມບຸ',
      'ນ້ຳຈິ້ມພອນຊຶ ແລະ ງາ',
    ],
    allergens: ['ຖົ່ວເຫຼືອງ', 'ງາ', 'ກລູເຕນ'],
  },
  {
    ...base,
    id: 104,
    name: 'ອາຫານທະເລລວມ',
    english: 'Seafood Platter',
    description:
      'ຍົກທະເລມາໃສ່ໝໍ້ ດ້ວຍກຸ້ງສົດ, ປາໝຶກ ແລະ ຫອຍແມງພູ່ ຄັດສັນຄວາມສົດໃໝ່ສຳລັບທຸກມື້ພິເສດ.',
    price: 289,
    category: 'seafood',
    weight: '250 ກຣາມ',
    sprite: 2,
    badge: 'ສົດໃໝ່ທຸກມື້',
    isRecommended: true,
    ingredients: ['ກຸ້ງ', 'ປາໝຶກ', 'ຫອຍແມງພູ່', 'ໝາກນາວ'],
    allergens: ['ສັດນ້ຳມີເປືອກ', 'ຫອຍ'],
  },
  {
    ...base,
    id: 105,
    name: 'ຊຸດຜັກສົດແບບຍີ່ປຸ່ນ',
    english: 'Garden Vegetable Set',
    description:
      'ຜັກກາດຂາວ, ຜັກກວາງຕຸ້ງ, ເຫັດຫອມ, ເຫັດເຂັມທອງ, ແຄຣອດ ແລະ ເຕົ້າຫູ້—ຄວາມສົດກອບທີ່ຂາດບໍ່ໄດ້ໃນທຸກໝໍ້.',
    price: 129,
    category: 'vegetables',
    weight: '300 ກຣາມ',
    sprite: 3,
    isPopular: true,
    ingredients: [
      'ຜັກກາດຂາວ',
      'ຜັກກວາງຕຸ້ງ',
      'ເຫັດຫອມ',
      'ເຫັດເຂັມທອງ',
      'ແຄຣອດ',
      'ເຕົ້າຫູ້',
    ],
    allergens: ['ຖົ່ວເຫຼືອງ'],
  },
  {
    ...base,
    id: 106,
    name: 'ນ້ຳຊຸບສຸກີ້ຍາກີ້',
    english: 'Sukiyaki Broth',
    description:
      'ນ້ຳຊຸບແບບຍີ່ປຸ່ນ ຫອມໂຊຢຸ ລົດຫວານເຄັມກົມກ່ອມ ເຄີ່ຍວຢ່າງພິຖີພິຖັນ ເຂົ້າກັນດີກັບຊີ້ນວາກິວ.',
    price: 89,
    category: 'soup',
    weight: '1,000 ມລ.',
    sprite: 4,
    ingredients: ['ໂຊຢຸ', 'ຄອມບຸ', 'ເຫັດຫອມ'],
    allergens: ['ຖົ່ວເຫຼືອງ', 'ກລູເຕນ'],
  },
  {
    ...base,
    id: 107,
    name: 'ມັດຊະ ແລະ ຢຸຊຸໂຊດາ',
    english: 'Matcha & Yuzu Pair',
    description:
      'ແພັກຄູ່ຄວາມສົດຊື່ນ: ຊາຂຽວມັດຊະຫອມນຸ່ມ ແລະ ຢຸຊຸໂຊດາລົດສົ້ມຫວານ ຕັດລົດຊາບູໄດ້ພໍດີ.',
    price: 119,
    category: 'drinks',
    type: 'drink',
    weight: '2 ແກ້ວ / 350 ມລ.',
    sprite: 5,
    ingredients: ['ຊາຂຽວມັດຊະ', 'ຢຸຊຸ', 'ໂຊດາ'],
  },
  {
    ...base,
    id: 108,
    name: 'ຊຸດຊາບູສຳລັບຄອບຄົວ',
    english: 'Family Shabu Set',
    description:
      'ຄວາມສຸກໝໍ້ໃຫຍ່ສຳລັບທັງຄອບຄົວ ລວມຊີ້ນວາກິວ, ໝູຄຸໂຣບຸຕະ, ອາຫານທະເລ, ຊຸດຜັກ ແລະ ນ້ຳຊຸບ 2 ລົດ ພ້ອມນ້ຳຈິ້ມຄົບຊຸດ.',
    price: 1099,
    originalPrice: 1299,
    category: 'sets',
    weight: 'ຊຸດສຳລັບ 4 ຄົນ',
    image: '/images/shabu-hero.webp',
    badge: 'ຄຸ້ມສຳລັບຄອບຄົວ',
    serves: '4 ຄົນ',
    ingredients: [
      'ຊີ້ນວາກິວ',
      'ໝູຄຸໂຣບຸຕະ',
      'ອາຫານທະເລລວມ',
      'ຊຸດຜັກລວມ',
      'ນ້ຳຊຸບ 2 ລົດ',
      'ນ້ຳຈິ້ມ 2 ສູດ',
    ],
    allergens: [
      'ຖົ່ວເຫຼືອງ',
      'ງາ',
      'ກລູເຕນ',
      'ສັດນ້ຳມີເປືອກ',
      'ຫອຍ',
    ],
  },
  {
    ...base,
    id: 109,
    name: 'ຊີ້ນຄໍຊອຍບາງ',
    english: 'Beef Chuck Roll',
    description:
      'ຊີ້ນຄໍຄັດສັນຄຸນນະພາບ ຊອຍບາງນຸ່ມພໍດີ ລົດຊາດຊີ້ນເຂັ້ມຂຸ້ນ ເໝາະກັບນ້ຳຊຸບທຸກຊະນິດ.',
    price: 189,
    category: 'beef',
    weight: '150 ກຣາມ',
    sprite: 0,
    ingredients: ['ຊີ້ນຄໍຊອຍບາງ'],
  },
  {
    ...base,
    id: 110,
    name: 'ໝູສາມຊັ້ນຊອຍບາງ',
    english: 'Pork Belly',
    description:
      'ໝູສາມຊັ້ນຊອຍບາງ ຊັ້ນຊີ້ນ ແລະ ໄຂມັນສົມດຸນ ລວກແລ້ວນຸ່ມຊຸ່ມ ຈິ້ມນ້ຳພອນຊຶເພີ່ມຄວາມສົດຊື່ນ.',
    price: 129,
    category: 'pork',
    weight: '150 ກຣາມ',
    sprite: 1,
    ingredients: ['ໝູສາມຊັ້ນຊອຍບາງ'],
  },
  {
    ...base,
    id: 111,
    name: 'ນ້ຳຊຸບຄອມບຸ',
    english: 'Kombu Dashi Broth',
    description:
      'ນ້ຳຊຸບໃສຈາກສາຫຼ່າຍຄອມບຸ ລົດອູມາມິອ່ອນນຸ່ມ ຊ່ວຍດຶງລົດຊາດວັດຖຸດິບໂດຍບໍ່ກົບຄວາມຫວານທຳມະຊາດ.',
    price: 69,
    category: 'soup',
    weight: '1,000 ມລ.',
    sprite: 4,
    ingredients: ['ສາຫຼ່າຍຄອມບຸ', 'ເຫັດຫອມ'],
  },
  {
    ...base,
    id: 112,
    name: 'ຜັກ ແລະ ເຫັດລວມພິເສດ',
    english: 'Mushroom Garden',
    description:
      'ຜັກກອບ ແລະ ເຫັດຫຼາຍຊະນິດ ພ້ອມເຕົ້າຫູ້ນຸ່ມ ເພີ່ມຄວາມສົມດຸນ ແລະ ລົດຫວານໃຫ້ໝໍ້ຊາບູ.',
    price: 99,
    category: 'vegetables',
    weight: '200 ກຣາມ',
    sprite: 3,
    ingredients: [
      'ເຫັດຫອມ',
      'ເຫັດເຂັມທອງ',
      'ຜັກກວາງຕຸ້ງ',
      'ເຕົ້າຫູ້',
    ],
    allergens: ['ຖົ່ວເຫຼືອງ'],
  },
];
export const money = (amount: number) =>
  `₭${(amount * 1_000).toLocaleString('en-US', {
    maximumFractionDigits: 2,
  })}`;
export const categoryName = (category: string) =>
  categories.find((item) => item.id === category)?.name ??
  'ເມນູອາຫານ';
