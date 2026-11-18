import { useState, useEffect, type FormEvent } from 'react';
import { Icon } from '@/components/shabu/Icon';
import {
  getAdminReservations,
  updateReservationStatus,
  addReservation,
  type AdminReservation,
} from '@/data/adminStore';

export function AdminReservations() {
  const [reservations, setReservations] = useState<AdminReservation[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const todayStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Vientiane' }).format(new Date());

  useEffect(() => {
    const refresh = () => setReservations(getAdminReservations());
    refresh();
    window.addEventListener('shabu-admin-reservations-changed', refresh);
    return () => window.removeEventListener('shabu-admin-reservations-changed', refresh);
  }, []);

  const handleStatusChange = (id: string, status: AdminReservation['status']) => {
    const updated = updateReservationStatus(id, status);
    setReservations(updated);
  };

  const handleAddWalkIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const updated = addReservation({
      name: String(form.get('name')).trim(),
      phone: String(form.get('phone')).trim(),
      date: String(form.get('date')),
      time: String(form.get('time')),
      guests: Number(form.get('guests')) || 2,
      note: String(form.get('note')).trim(),
      status: 'confirmed',
    });
    setReservations(updated);
    setIsModalOpen(false);
  };

  const filtered = reservations.filter((r) => {
    const matchesTab = activeTab === 'all' || r.status === activeTab;
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.includes(searchQuery);
    return matchesTab && matchesSearch;
  });

  const getStatusText = (status: AdminReservation['status']) => {
    switch (status) {
      case 'pending':
        return 'ລໍຖ້າຢືນຢັນ';
      case 'confirmed':
        return 'ຢືນຢັນແລ້ວ';
      case 'seated':
        return 'ເຂົ້ານັ່ງໂຕະແລ້ວ';
      case 'completed':
        return 'ສຳເລັດ';
      case 'cancelled':
        return 'ຍົກເລີກ';
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="admin-page-header">
        <div className="admin-page-title-group">
          <h1>ຈັດການການຈອງໂຕະ (Table Reservations)</h1>
          <p>ຄວບຄຸມບ່ອນນັ່ງ, ຢືນຢັນການຈອງຂອງລູກຄ້າ ແລະ ບັນທຶກລູກຄ້າ Walk-in ທີ່ໜ້າຮ້ານ</p>
        </div>
        <div className="admin-actions-group">
          <button className="admin-btn admin-btn-primary" onClick={() => setIsModalOpen(true)}>
            <Icon name="plus" size={16} />
            <span>ບັນທຶກການຈອງ / Walk-in</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-filter-bar">
        <div className="admin-tabs">
          <button
            className={`admin-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            ທັງໝົດ ({reservations.length})
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            ລໍຖ້າຢືນຢັນ ({reservations.filter((r) => r.status === 'pending').length})
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'confirmed' ? 'active' : ''}`}
            onClick={() => setActiveTab('confirmed')}
          >
            ຢືນຢັນແລ້ວ ({reservations.filter((r) => r.status === 'confirmed').length})
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'seated' ? 'active' : ''}`}
            onClick={() => setActiveTab('seated')}
          >
            ນັ່ງຢູ່ຮ້ານ ({reservations.filter((r) => r.status === 'seated').length})
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            ສຳເລັດ ({reservations.filter((r) => r.status === 'completed').length})
          </button>
        </div>

        <div className="admin-search-input">
          <Icon name="search" size={18} style={{ color: 'var(--adm-text-muted)', flexShrink: 0 }} />
          <input
            type="text"
            placeholder="ຄົ້ນຫາຊື່ຜູ້ຈອງ, ເບີໂທ..."
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

      {/* Table */}
      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ລະຫັດ</th>
                <th>ຊື່ຜູ້ຈອງ</th>
                <th>ເບີໂທ</th>
                <th>ວັນທີ & ເວລາ</th>
                <th>ຈຳນວນຄົນ</th>
                <th>ໝາຍເຫດພິເສດ</th>
                <th>ສະຖານະ</th>
                <th>ດຳເນີນການ</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((res) => {
                const isToday = res.date === todayStr;
                return (
                  <tr key={res.id}>
                    <td>
                      <strong>{res.id}</strong>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{res.name}</div>
                    </td>
                    <td>
                      <span>📞 {res.phone}</span>
                    </td>
                    <td>
                      <div>
                        <strong style={{ color: isToday ? 'var(--adm-primary)' : 'inherit' }}>
                          {res.date} {isToday ? '(ມື້ນີ້)' : ''}
                        </strong>
                        <div style={{ fontSize: '0.8rem', color: 'var(--adm-text-muted)' }}>
                          ⏰ ເວລາ {res.time}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        style={{
                          fontWeight: 700,
                          background: '#f1f5f9',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.85rem',
                        }}
                      >
                        👥 {res.guests} ທ່ານ
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.825rem', color: res.note ? '#475569' : '#94a3b8' }}>
                        {res.note || '-'}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${res.status}`}>
                        {getStatusText(res.status)}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                        {res.status === 'pending' && (
                          <button
                            className="admin-btn admin-btn-success admin-btn-sm"
                            onClick={() => handleStatusChange(res.id, 'confirmed')}
                            title="ຢືນຢັນໂຕະ"
                          >
                            <Icon name="check" size={14} />
                            ຢືນຢັນ
                          </button>
                        )}
                        {res.status === 'confirmed' && (
                          <button
                            className="admin-btn admin-btn-primary admin-btn-sm"
                            onClick={() => handleStatusChange(res.id, 'seated')}
                            title="ລູກຄ້າເຂົ້ານັ່ງໂຕະແລ້ວ"
                          >
                            <Icon name="pot" size={14} />
                            ເຂົ້ານັ່ງໂຕະ
                          </button>
                        )}
                        {res.status === 'seated' && (
                          <button
                            className="admin-btn admin-btn-secondary admin-btn-sm"
                            onClick={() => handleStatusChange(res.id, 'completed')}
                            title="ເຊັກບິນສຳເລັດ"
                          >
                            <Icon name="check" size={14} />
                            ສຳເລັດ
                          </button>
                        )}
                        {res.status !== 'cancelled' && res.status !== 'completed' && (
                          <button
                            className="admin-btn admin-btn-danger admin-btn-sm"
                            onClick={() => handleStatusChange(res.id, 'cancelled')}
                            title="ຍົກເລີກການຈອງ"
                          >
                            ຍົກເລີກ
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '3rem' }}>
                    <Icon name="calendar" size={36} style={{ color: '#cbd5e1', marginBottom: '0.5rem' }} />
                    <p style={{ color: 'var(--adm-text-muted)', margin: 0 }}>ບໍ່ພົບລາຍການຈອງໂຕະ</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Walk-in Modal */}
      {isModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleAddWalkIn}>
              <div className="admin-modal-header">
                <h3>ບັນທຶກການຈອງໂຕະ / Walk-in</h3>
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
                  <label>ຊື່ຜູ້ຈອງ / ລູກຄ້າ *</label>
                  <input type="text" name="name" placeholder="ເຊັ່ນ: ທ່ານ ສົມສັກ" required />
                </div>

                <div className="admin-form-group">
                  <label>ເບີໂທລະສັບຕິດຕໍ່ *</label>
                  <input type="tel" name="phone" placeholder="020 xxxx xxxx" required />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>ວັນທີຈອງ *</label>
                    <input type="date" name="date" defaultValue={todayStr} required />
                  </div>
                  <div className="admin-form-group">
                    <label>ເວລາ *</label>
                    <input type="time" name="time" defaultValue="18:30" required />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>ຈຳນວນຄົນ (ທ່ານ) *</label>
                  <input type="number" name="guests" defaultValue={4} min={1} max={30} required />
                </div>

                <div className="admin-form-group">
                  <label>ຄວາມຕ້ອງການພິເສດ (Note)</label>
                  <textarea name="note" rows={2} placeholder="ເຊັ່ນ: ຂໍໂຕະແຄມປ່ອງຢ້ຽມ, ຕັ່ງເດັກນ້ອຍ..." />
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
                  ບັນທຶກການຈອງ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
