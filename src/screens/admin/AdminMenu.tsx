import { useState, useEffect, type FormEvent } from 'react';
import { Icon } from '@/components/shabu/Icon';
import { money, categories, type MenuCategory, type ShabuDish } from '@/data/mock';
import {
  getAdminDishes,
  toggleDishAvailability,
  updateDish,
  deleteDish,
} from '@/data/adminStore';

export function AdminMenu() {
  const [dishes, setDishes] = useState<ShabuDish[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<ShabuDish | null>(null);

  useEffect(() => {
    const refresh = () => setDishes(getAdminDishes());
    refresh();
    window.addEventListener('shabu-admin-menu-changed', refresh);
    return () => window.removeEventListener('shabu-admin-menu-changed', refresh);
  }, []);

  const handleToggle = (id: number) => {
    const updated = toggleDishAvailability(id);
    setDishes(updated);
  };

  const handleDelete = (dish: ShabuDish) => {
    if (window.confirm(`ທ່ານຕ້ອງການລຶບເມນູ "${dish.name}" ແທ້ບໍ່?`)) {
      const updated = deleteDish(dish.id);
      setDishes(updated);
    }
  };

  const handleOpenAdd = () => {
    setEditingDish(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (dish: ShabuDish) => {
    setEditingDish(dish);
    setIsModalOpen(true);
  };

  const handleSaveDish = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const priceNum = Number(form.get('price')) || 0;

    const newDish: ShabuDish = {
      id: editingDish ? editingDish.id : Date.now(),
      name: String(form.get('name')).trim(),
      english: String(form.get('english')).trim(),
      category: form.get('category') as MenuCategory,
      price: priceNum,
      weight: String(form.get('weight')).trim() || '150 ກຣາມ',
      badge: String(form.get('badge')).trim() || undefined,
      description: String(form.get('description')).trim(),
      image: editingDish?.image || '/images/menu-grid.webp',
      rating: editingDish?.rating ?? 4.9,
      type: (form.get('category') === 'drinks' ? 'drink' : 'food'),
      cookingTime: 20,
      isAvailable: editingDish ? editingDish.isAvailable : true,
      allergens: [],
      ingredients: [],
    };

    const updated = updateDish(newDish);
    setDishes(updated);
    setIsModalOpen(false);
  };

  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory = activeCategory === 'all' || dish.category === activeCategory;
    const matchesSearch =
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.english.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="admin-page-header">
        <div className="admin-page-title-group">
          <h1>ຈັດການເມນູອາຫານ (Menu Management)</h1>
          <p>ເພີ່ມ, ແກ້ໄຂລາຄາ, ເປີດ/ປິດສະຖານະພ້ອມເສີບ ຫຼື ສິນຄ້າໝົດ</p>
        </div>
        <div className="admin-actions-group">
          <button className="admin-btn admin-btn-primary" onClick={handleOpenAdd}>
            <Icon name="plus" size={16} />
            <span>ເພີ່ມເມນູໃໝ່</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-filter-bar">
        <div className="admin-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`admin-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name} ({dishes.filter((d) => cat.id === 'all' || d.category === cat.id).length})
            </button>
          ))}
        </div>

        <div className="admin-search-input">
          <Icon name="search" size={18} style={{ color: 'var(--adm-text-muted)', flexShrink: 0 }} />
          <input
            type="text"
            placeholder="ຄົ້ນຫາຊື່ເມນູ (ລາວ ຫຼື ອັງກິດ)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="admin-search-clear-btn"
              onClick={() => setSearchQuery('')}
              title="ລຶບຂໍ້ຄວາມຄົ້ນຫາ"
            >
              <Icon name="close" size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Dishes Cards Grid */}
      <div className="admin-dish-grid">
        {filteredDishes.map((dish) => (
          <div className="admin-dish-card" key={dish.id}>
            <div className="admin-dish-image-wrap">
              <img src={dish.image} alt={dish.name} />
              {dish.badge && <span className="admin-dish-badge">{dish.badge}</span>}
              <div
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: dish.isAvailable ? '#ecfdf5' : '#fef2f2',
                  color: dish.isAvailable ? '#047857' : '#b91c1c',
                  border: `1px solid ${dish.isAvailable ? '#a7f3d0' : '#fecaca'}`,
                  borderRadius: '9999px',
                  padding: '3px 8px',
                  fontSize: '11px',
                  fontWeight: 700,
                }}
              >
                {dish.isAvailable ? 'ພ້ອມເສີບ' : 'ສິນຄ້າໝົດ'}
              </div>
            </div>

            <div className="admin-dish-card-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 className="admin-dish-title">{dish.name}</h3>
                  <small style={{ color: 'var(--adm-text-muted)', display: 'block', marginBottom: '6px' }}>
                    {dish.english} · {dish.weight}
                  </small>
                </div>
              </div>

              <p className="admin-dish-desc">{dish.description}</p>

              <div className="admin-dish-card-footer">
                <div>
                  <div className="admin-dish-price">{money(dish.price)}</div>
                  {dish.originalPrice && (
                    <small style={{ textDecoration: 'line-through', color: '#94a3b8' }}>
                      {money(dish.originalPrice)}
                    </small>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  {/* Stock Toggle */}
                  <label className="admin-switch" title={dish.isAvailable ? 'ເປີດຂາຍຢູ່' : 'ປິດສິນຄ້າ'}>
                    <input
                      type="checkbox"
                      checked={dish.isAvailable}
                      onChange={() => handleToggle(dish.id)}
                    />
                    <span className="admin-slider" />
                  </label>

                  <button
                    className="admin-btn admin-btn-secondary admin-btn-sm"
                    onClick={() => handleOpenEdit(dish)}
                    title="ແກ້ໄຂເມນູ"
                  >
                    <Icon name="edit" size={15} />
                  </button>

                  <button
                    className="admin-btn admin-btn-danger admin-btn-sm"
                    onClick={() => handleDelete(dish)}
                    title="ລຶບເມນູ"
                  >
                    <Icon name="trash" size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDishes.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', background: '#fff', borderRadius: '12px' }}>
          <Icon name="pot" size={40} style={{ color: '#cbd5e1', marginBottom: '1rem' }} />
          <h3>ບໍ່ພົບເມນູອາຫານທີ່ຄົ້ນຫາ</h3>
          <p style={{ color: 'var(--adm-text-muted)' }}>ລອງຄົ້ນຫາດ້ວຍຄຳສັບອື່ນ ຫຼື ເພີ່ມເມນູໃໝ່ເຂົ້າສູ່ລະບົບ</p>
        </div>
      )}

      {/* Add / Edit Dish Modal */}
      {isModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSaveDish}>
              <div className="admin-modal-header">
                <h3>{editingDish ? 'ແກ້ໄຂເມນູອາຫານ' : 'ເພີ່ມເມນູອາຫານໃໝ່'}</h3>
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  onClick={() => setIsModalOpen(false)}
                >
                  <Icon name="close" size={20} />
                </button>
              </div>

              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label>ຊື່ເມນູ (ພາສາລາວ) *</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingDish?.name || ''}
                    placeholder="ຕົວຢ່າງ: ຊີ້ນວາກິວພິເສດ A5"
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>ຊື່ພາສາອັງກິດ (English Name) *</label>
                  <input
                    type="text"
                    name="english"
                    defaultValue={editingDish?.english || ''}
                    placeholder="Example: Premium Wagyu Beef A5"
                    required
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>ໝວດໝູ່ເມນູ *</label>
                    <select name="category" defaultValue={editingDish?.category || 'beef'}>
                      <option value="sets">ຊຸດຊາບູ (Shabu sets)</option>
                      <option value="beef">ຊີ້ນຊັ້ນດີ (Premium beef)</option>
                      <option value="pork">ຊີ້ນໝູ (Pork)</option>
                      <option value="seafood">ອາຫານທະເລ (Seafood)</option>
                      <option value="vegetables">ຜັກ ແລະ ຂອງກິນຫຼິ້ນ (Veggies)</option>
                      <option value="soup">ນ້ຳຊຸບ (Broths)</option>
                      <option value="drinks">ເຄື່ອງດື່ມ (Drinks)</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label>ລາຄາ (ຄິດເປັນພັນກີບ, ເຊັ່ນ 259 = 259,000₭) *</label>
                    <input
                      type="number"
                      name="price"
                      defaultValue={editingDish?.price || 150}
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>ປະລິມານ / ນ້ຳໜັກ</label>
                    <input
                      type="text"
                      name="weight"
                      defaultValue={editingDish?.weight || '150 ກຣາມ'}
                      placeholder="ເຊັ່ນ: 150 ກຣາມ ຫຼື 1 ໝໍ້"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>ປ້າຍກຳກັບ (Badge)</label>
                    <input
                      type="text"
                      name="badge"
                      defaultValue={editingDish?.badge || ''}
                      placeholder="ເຊັ່ນ: ຂາຍດີ, ພິເສດ, ແນະນຳ"
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>ຄຳອະທິບາຍເມນູ</label>
                  <textarea
                    name="description"
                    rows={3}
                    defaultValue={editingDish?.description || ''}
                    placeholder="ອະທິບາຍລົດຊາດ, ວັດຖຸດິບ ແລະ ວິທີກິນແຊບໆ..."
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  ຍົກເລີກ
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  {editingDish ? 'ບັນທຶກການແກ້ໄຂ' : 'ເພີ່ມເມນູ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
