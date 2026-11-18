import { useState, useEffect } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { Icon } from '@/components/shabu/Icon';
import {
  getAdminOrders,
  getAdminReservations,
  getStoreSettings,
  saveStoreSettings,
  type StoreSettings,
} from '@/data/adminStore';
import '@/css/admin.css';

export function AdminLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState(getAdminOrders());
  const [reservations, setReservations] = useState(getAdminReservations());
  const [settings, setSettings] = useState<StoreSettings>(getStoreSettings());

  useEffect(() => {
    const handleOrderChange = () => setOrders(getAdminOrders());
    const handleResChange = () => setReservations(getAdminReservations());
    const handleSetChange = () => setSettings(getStoreSettings());

    window.addEventListener('shabu-admin-orders-changed', handleOrderChange);
    window.addEventListener('shabu-admin-reservations-changed', handleResChange);
    window.addEventListener('shabu-admin-settings-changed', handleSetChange);

    return () => {
      window.removeEventListener('shabu-admin-orders-changed', handleOrderChange);
      window.removeEventListener('shabu-admin-reservations-changed', handleResChange);
      window.removeEventListener('shabu-admin-settings-changed', handleSetChange);
    };
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const pendingOrdersCount = orders.filter((o) => o.status === 'pending' || o.status === 'cooking').length;
  const pendingResCount = reservations.filter((r) => r.status === 'pending').length;

  const toggleStoreStatus = () => {
    const next = { ...settings, isOpen: !settings.isOpen };
    setSettings(next);
    saveStoreSettings(next);
  };

  return (
    <div className="admin-shell">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="admin-modal-backdrop"
          style={{ zIndex: 99 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <Link to="/admin" className="admin-brand">
            <div className="admin-brand-icon">
              <Icon name="pot" size={24} />
            </div>
            <div className="admin-brand-info">
              <strong>Shabu. Admin</strong>
              <span>ລະບົບຈັດການຮ້ານ</span>
            </div>
          </Link>
          <button
            className="admin-menu-toggle"
            style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}
            onClick={() => setSidebarOpen(false)}
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <nav className="admin-sidebar-nav">
          <div className="admin-nav-section-title">ພາບລວມ & ງານຫຼັກ</div>

          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon name="chart" size={19} />
            <span>Dashboard ພາບລວມ</span>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon name="bag" size={19} />
            <span>ລາຍການອໍເດີ (POS)</span>
            {pendingOrdersCount > 0 && (
              <span className="admin-nav-badge active-alert">{pendingOrdersCount}</span>
            )}
          </NavLink>

          <NavLink
            to="/admin/reservations"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon name="calendar" size={19} />
            <span>ການຈອງໂຕະ</span>
            {pendingResCount > 0 && (
              <span className="admin-nav-badge active-alert">{pendingResCount}</span>
            )}
          </NavLink>

          <div className="admin-nav-section-title">ຈັດການຮ້ານຄ້າ</div>

          <NavLink
            to="/admin/menu"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon name="layers" size={19} />
            <span>ເມນູອາຫານ & ສິນຄ້າ</span>
          </NavLink>

          <NavLink
            to="/admin/settings"
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon name="settings" size={19} />
            <span>ຕັ້ງຄ່າຮ້ານຄ້າ</span>
          </NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-back-store" target="_blank" rel="noreferrer">
            <Icon name="store" size={18} />
            <span>ເບິ່ງໜ້າຮ້ານ (Storefront)</span>
          </Link>

          <div className="admin-user-pill">
            <div className="admin-avatar">AD</div>
            <div className="admin-user-details">
              <strong>ຜູ້ຈັດການຮ້ານ</strong>
              <small>admin@shabu.la</small>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              className="admin-menu-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="ເປີດເມນູ"
            >
              <Icon name="grid" size={20} />
            </button>
            <div className="admin-breadcrumb">
              <span>Shabu Control Panel</span>
              <span>/</span>
              <strong>
                {location.pathname.includes('/orders')
                  ? 'ຈັດການອໍເດີອາຫານ'
                  : location.pathname.includes('/reservations')
                  ? 'ການຈອງໂຕະ'
                  : location.pathname.includes('/menu')
                  ? 'ຈັດການເມນູອາຫານ'
                  : location.pathname.includes('/settings')
                  ? 'ຕັ້ງຄ່າລະບົບ'
                  : 'Dashboard ພາບລວມ'}
              </strong>
            </div>
          </div>

          <div className="admin-topbar-right">
            <button
              onClick={toggleStoreStatus}
              className={`admin-store-status-badge ${settings.isOpen ? 'open' : 'closed'}`}
              title="ຄລິກເພື່ອປ່ຽນສະຖານະຮ້ານ"
            >
              <span className="admin-pulse-dot" />
              <span>{settings.isOpen ? 'ຮ້ານກຳລັງເປີດ' : 'ຮ້ານປິດແລ້ວ'}</span>
            </button>

            <Link to="/admin/orders" className="admin-header-btn" title="ອໍເດີໃໝ່">
              <Icon name="bell" size={18} />
              {pendingOrdersCount > 0 && (
                <span
                  style={{
                    background: '#ef4444',
                    color: '#fff',
                    borderRadius: '50%',
                    padding: '2px 6px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                  }}
                >
                  {pendingOrdersCount}
                </span>
              )}
            </Link>

            <Link to="/" className="admin-header-btn">
              <Icon name="store" size={17} />
              <span>ໜ້າຮ້ານ</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Nested Content */}
        <main className="admin-page-container">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
