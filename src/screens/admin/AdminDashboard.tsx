import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@/components/shabu/Icon';
import { money } from '@/data/mock';
import {
  getAdminOrders,
  getAdminReservations,
  getAdminDishes,
  type AdminOrder,
  type AdminReservation,
} from '@/data/adminStore';

export function AdminDashboard() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [reservations, setReservations] = useState<AdminReservation[]>([]);
  const [dishesCount, setDishesCount] = useState<number>(0);

  useEffect(() => {
    const refreshData = () => {
      setOrders(getAdminOrders());
      setReservations(getAdminReservations());
      setDishesCount(getAdminDishes().length);
    };

    refreshData();
    window.addEventListener('shabu-admin-orders-changed', refreshData);
    window.addEventListener('shabu-admin-reservations-changed', refreshData);
    window.addEventListener('shabu-admin-menu-changed', refreshData);

    return () => {
      window.removeEventListener('shabu-admin-orders-changed', refreshData);
      window.removeEventListener('shabu-admin-reservations-changed', refreshData);
      window.removeEventListener('shabu-admin-menu-changed', refreshData);
    };
  }, []);

  // Compute metrics
  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const pendingOrders = orders.filter((o) => o.status === 'pending' || o.status === 'cooking');
  const completedOrders = orders.filter((o) => o.status === 'completed');

  const todayStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Vientiane' }).format(new Date());
  const todayReservations = reservations.filter((r) => r.date === todayStr);

  // Mock 7-day revenue trend for beautiful visual bar chart
  const weeklyData = [
    { day: 'ຈັນ', amount: 890, height: '45%' },
    { day: 'ອັງຄານ', amount: 1250, height: '65%' },
    { day: 'ພຸດ', amount: 980, height: '50%' },
    { day: 'ພະຫັດ', amount: 1450, height: '75%' },
    { day: 'ສຸກ', amount: 2100, height: '95%' },
    { day: 'ເສົາ', amount: 2350, height: '100%' },
    { day: 'ອາທິດ', amount: 1980, height: '85%' },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="admin-page-header">
        <div className="admin-page-title-group">
          <h1>Dashboard ພາບລວມຮ້ານ Shabu</h1>
          <p>ຍິນດີຕ້ອນຮັບສູ່ສູນຄວບຄຸມ ແລະ ຕິດຕາມສະຖານະການຂາຍແບບ Real-time</p>
        </div>
        <div className="admin-actions-group">
          <Link to="/admin/orders" className="admin-btn admin-btn-primary">
            <Icon name="bag" size={17} />
            <span>ເບິ່ງອໍເດີ ({pendingOrders.length})</span>
          </Link>
          <Link to="/admin/reservations" className="admin-btn admin-btn-secondary">
            <Icon name="calendar" size={17} />
            <span>ຈັດການຈອງໂຕະ</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="admin-kpi-grid">
        <div className="admin-kpi-card">
          <div className="admin-kpi-header">
            <span className="admin-kpi-title">ຍອດຂາຍລວມທັງໝົດ</span>
            <div className="admin-kpi-icon-wrap primary">
              <Icon name="star" size={22} />
            </div>
          </div>
          <div className="admin-kpi-value">{money(totalRevenue)}</div>
          <div className="admin-kpi-sub">
            <span className="trend-up">↑ +18.4%</span>
            <span>ທຽບກັບອາທິດຜ່ານມາ</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-header">
            <span className="admin-kpi-title">ອໍເດີທັງໝົດ</span>
            <div className="admin-kpi-icon-wrap info">
              <Icon name="bag" size={22} />
            </div>
          </div>
          <div className="admin-kpi-value">{orders.length}</div>
          <div className="admin-kpi-sub">
            <strong style={{ color: pendingOrders.length > 0 ? '#f59e0b' : '#10b981' }}>
              {pendingOrders.length} ລາຍການກຳລັງດຳເນີນງານ
            </strong>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-header">
            <span className="admin-kpi-title">ການຈອງໂຕະມື້ນີ້</span>
            <div className="admin-kpi-icon-wrap success">
              <Icon name="calendar" size={22} />
            </div>
          </div>
          <div className="admin-kpi-value">{todayReservations.length}</div>
          <div className="admin-kpi-sub">
            <span>ລວມ {reservations.length} ການຈອງໃນລະບົບ</span>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div className="admin-kpi-header">
            <span className="admin-kpi-title">ເມນູອາຫານທັງໝົດ</span>
            <div className="admin-kpi-icon-wrap purple">
              <Icon name="pot" size={22} />
            </div>
          </div>
          <div className="admin-kpi-value">{dishesCount}</div>
          <div className="admin-kpi-sub">
            <Link to="/admin/menu" style={{ color: 'var(--adm-primary)', fontWeight: 600, textDecoration: 'none' }}>
              ຈັດການເມນູ &gt;
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grid: Revenue Trend + Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Weekly Revenue Graph Card */}
        <div className="admin-card" style={{ marginBottom: 0 }}>
          <div className="admin-card-header">
            <h2>
              <Icon name="chart" size={18} />
              <span>ຍອດຂາຍປະຈຳອາທິດ (ພັນກີບ)</span>
            </h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--adm-text-muted)' }}>7 ວັນລ່າສຸດ</span>
          </div>
          <div className="admin-card-body">
            <div className="admin-bar-chart">
              {weeklyData.map((item, idx) => (
                <div className="admin-bar-col" key={idx}>
                  <div
                    className="admin-bar-fill"
                    style={{ height: item.height }}
                    title={`${item.day}: ₭${(item.amount * 1000).toLocaleString('en-US')}`}
                  />
                  <span className="admin-bar-label">{item.day}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--adm-border)', paddingTop: '1rem', marginTop: '0.5rem', fontSize: '0.85rem' }}>
              <span>ຍອດຂາຍສະເລ່ຍຕໍ່ວັນ: <strong>₭1,570,000</strong></span>
              <span style={{ color: 'var(--adm-success)', fontWeight: 600 }}>ວັນເສົາ ຂາຍດີທີ່ສຸດ 🔥</span>
            </div>
          </div>
        </div>

        {/* Quick Operations & Status Overview */}
        <div className="admin-card" style={{ marginBottom: 0 }}>
          <div className="admin-card-header">
            <h2>
              <Icon name="grid" size={18} />
              <span>ສະຖານະງານດ່ວນ (Active Status)</span>
            </h2>
          </div>
          <div className="admin-card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', background: '#fffbeb', borderRadius: '8px', border: '1px solid #fef3c7' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon name="clock" size={20} style={{ color: '#d97706' }} />
                  <div>
                    <strong style={{ display: 'block', color: '#92400e', fontSize: '0.9rem' }}>ອໍເດີລໍຖ້າດຳເນີນການ</strong>
                    <small style={{ color: '#b45309' }}>ຕ້ອງການໃຫ້ຄົວເລີ່ມປຸງແຕ່ງ</small>
                  </div>
                </div>
                <strong style={{ fontSize: '1.25rem', color: '#b45309' }}>
                  {orders.filter((o) => o.status === 'pending').length}
                </strong>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', background: '#eff6ff', borderRadius: '8px', border: '1px solid #dbeafe' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon name="pot" size={20} style={{ color: '#2563eb' }} />
                  <div>
                    <strong style={{ display: 'block', color: '#1e40af', fontSize: '0.9rem' }}>ກຳລັງປຸງແຕ່ງໃນໝໍ້/ຄົວ</strong>
                    <small style={{ color: '#3b82f6' }}>ກຽມຈັດສົ່ງ ຫຼື ໃຫ້ລູກຄ້າຮັບ</small>
                  </div>
                </div>
                <strong style={{ fontSize: '1.25rem', color: '#1d4ed8' }}>
                  {orders.filter((o) => o.status === 'cooking').length}
                </strong>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', background: '#f5f3ff', borderRadius: '8px', border: '1px solid #ede9fe' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon name="truck" size={20} style={{ color: '#7c3aed' }} />
                  <div>
                    <strong style={{ display: 'block', color: '#5b21b6', fontSize: '0.9rem' }}>ໄຣເດີກຳລັງຈັດສົ່ງ</strong>
                    <small style={{ color: '#6d28d9' }}>ກຳລັງເດີນທາງຫາລູກຄ້າ</small>
                  </div>
                </div>
                <strong style={{ fontSize: '1.25rem', color: '#6d28d9' }}>
                  {orders.filter((o) => o.status === 'delivering').length}
                </strong>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <Link to="/admin/orders" className="admin-btn admin-btn-primary" style={{ flex: 1 }}>
                  ຈັດການອໍເດີທັງໝົດ
                </Link>
                <Link to="/admin/menu" className="admin-btn admin-btn-secondary" style={{ flex: 1 }}>
                  ເພີ່ມເມນູໃໝ່
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2>
            <Icon name="bag" size={18} />
            <span>ອໍເດີລ່າສຸດ (Recent Orders)</span>
          </h2>
          <Link to="/admin/orders" className="admin-btn admin-btn-secondary admin-btn-sm">
            ເບິ່ງທັງໝົດ
            <Icon name="arrow" size={14} />
          </Link>
        </div>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ລະຫັດອໍເດີ</th>
                <th>ລູກຄ້າ</th>
                <th>ຮູບແບບ</th>
                <th>ລາຍການອາຫານ</th>
                <th>ຍອດລວມ</th>
                <th>ສະຖານະ</th>
                <th>ວັນທີ/ເວລາ</th>
                <th>ການຈັດການ</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id}>
                  <td>
                    <strong>{order.id}</strong>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{order.name}</div>
                    <small style={{ color: 'var(--adm-text-muted)' }}>{order.phone}</small>
                  </td>
                  <td>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                      }}
                    >
                      <Icon name={order.mode === 'delivery' ? 'truck' : 'bag'} size={15} />
                      {order.mode === 'delivery' ? 'ຈັດສົ່ງ' : 'ຮັບໜ້າຮ້ານ'}
                    </span>
                  </td>
                  <td>
                    <div style={{ maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {order.items.map((i) => `${i.name} (x${i.quantity || 1})`).join(', ')}
                    </div>
                  </td>
                  <td>
                    <strong style={{ color: 'var(--adm-primary)' }}>{money(order.total)}</strong>
                  </td>
                  <td>
                    <span className={`status-badge ${order.status}`}>
                      {order.status === 'pending'
                        ? 'ລໍຖ້າຮັບ'
                        : order.status === 'cooking'
                        ? 'ກຳລັງປຸງ'
                        : order.status === 'delivering'
                        ? 'ກຳລັງສົ່ງ'
                        : order.status === 'completed'
                        ? 'ສຳເລັດ'
                        : 'ຍົກເລີກ'}
                    </span>
                  </td>
                  <td>
                    <small style={{ color: 'var(--adm-text-muted)' }}>
                      {new Date(order.createdAt).toLocaleTimeString('lo-LA', { hour: '2-digit', minute: '2-digit' })}
                    </small>
                  </td>
                  <td>
                    <Link to="/admin/orders" className="admin-btn admin-btn-secondary admin-btn-sm">
                      <Icon name="eye" size={14} />
                      ກວດສອບ
                    </Link>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '2rem' }}>
                    ບໍ່ມີລາຍການອໍເດີໃນຂະນະນີ້
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
