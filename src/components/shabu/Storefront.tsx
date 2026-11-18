import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
} from 'react-router-dom';
import { useAppSelector } from '@/store';
import { Icon } from './Icon';

const ToastContext = createContext<
  (message: string) => void
>(() => { });
export const useToast = () => useContext(ToastContext);
export const Brand = () => (
  <span className="brand">
    <span className="brand-mark">
      <Icon name="pot" size={32} />
    </span>
    <span>
      <strong>
        Shabu<span className="brand-dot">.</span>
      </strong>
      <small>SHABU & HAPPINESS</small>
    </span>
  </span>
);

export function Storefront() {
  const { pathname, search } = useLocation();
  const quantity = useAppSelector((state) =>
    state.cart.list.reduce(
      (sum, item) => sum + (item.quantity ?? 1),
      0,
    ),
  );
  const [toast, setToast] = useState('');
  const timer = useRef<
    ReturnType<typeof setTimeout> | undefined
  >(undefined);
  const announce = (message: string) => {
    setToast(message);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(''), 3500);
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, search]);
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <ToastContext.Provider value={announce}>
      <a className="skip-link" href="#main-content">
        ຂ້າມໄປຫາເນື້ອຫາ
      </a>
      <div className="announcement">
        <span>HAPPINESS IN EVERY POT</span>
        <i /> ຊາບູແຊບໆ ທີ່ຢາກໃຫ້ທ່ານໄດ້ລອງ{' '}
        <Icon name="pot" size={15} />
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" aria-label="Shabu ໜ້າຫຼັກ">
            <Brand />
          </Link>
          <nav
            className="desktop-nav"
            aria-label="ເມນູຫຼັກ"
          >
            <NavLink to="/" end>
              ໜ້າຫຼັກ
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive && !search ? 'active' : ''
              }
            >
              ເມນູອາຫານ
            </NavLink>
            <Link
              className={
                pathname === '/shop' &&
                  search.includes('sets')
                  ? 'active'
                  : ''
              }
              to="/shop?category=sets"
            >
              ຊຸດສຸດຄຸ້ມ
            </Link>
            <NavLink to="/all-offers">
              ໂປຣໂມຊັນ <span className="nav-dot" />
            </NavLink>
          </nav>
          <div className="header-actions">
            <Link
              className="reservation-link"
              to="/reservation"
            >
              <Icon name="calendar" size={18} />
              ຈອງໂຕະ
            </Link>
            <Link
              className="icon-button desktop-favorite"
              to="/favorite"
              aria-label="ລາຍການໂປດ"
            >
              <Icon name="heart" />
            </Link>
            <Link
              className="icon-button cart-button"
              to="/order"
              aria-label={`ກະຕ່າ ${quantity} ລາຍການ`}
            >
              <Icon name="bag" />
              {quantity > 0 && (
                <span className="cart-count">
                  {quantity > 99 ? '99+' : quantity}
                </span>
              )}
            </Link>
            <Link
              className="user-avatar"
              to="/profile"
              aria-label="ບັນຊີຂອງຂ້ອຍ"
            >
              <Icon name="user" size={19} />
            </Link>
          </div>
        </div>
      </header>
      <div className="store-info">
        <div className="container store-info-inner">
          <span>
            <Icon name="pin" size={15} /> ສາຂາວຽງຈັນ{' '}
            <span className="small-divider">|</span>{' '}
            ວຽງຈັນ
          </span>
          <span className="open-status">
            <i /> ເປີດທຸກມື້ <span>11:00 – 22:00</span>
          </span>
          <span className="store-delivery">
            <Icon name="truck" size={16} />{' '}
            ສົ່ງຄວາມແຊບເຖິງບ້ານທ່ານ
          </span>
        </div>
      </div>
      <main
        id="main-content"
        className="main-content"
        tabIndex={-1}
      >
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container footer-top">
          <Link to="/">
            <Brand />
          </Link>
          <p>
            ວັດຖຸດິບດີ ນ້ຳຊຸບແຊບ ແລະ ຄົນຂ້າງກາຍທີ່ຖືກໃຈ
            <br />
            ເພາະຄວາມສຸກ ເລີ່ມຕົ້ນທີ່ໝໍ້ດຽວກັນ
          </p>
          <div className="footer-links">
            <Link to="/shop">ເມນູອາຫານ</Link>
            <Link to="/reservation">ຈອງໂຕະ</Link>
            <Link to="/order-history">
              ປະຫວັດການສັ່ງອາຫານ
            </Link>
          </div>
          <div className="footer-hours">
            <span>ແວ່ມາຫາພວກເຮົາໄດ້ທຸກມື້</span>
            <strong>11:00 – 22:00</strong>
            <small>ສາຂາວຽງຈັນ · ສປປ ລາວ</small>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} Shabu. Happiness.
          </span>
          <span className="demo-label">
            ລະບົບສັ່ງອາຫານອອນລາຍ
          </span>
        </div>
      </footer>
      <nav className="mobile-nav" aria-label="ເມນູມືຖື">
        <NavLink to="/" end>
          <Icon name="home" />
          <span>ໜ້າຫຼັກ</span>
        </NavLink>
        <NavLink to="/shop">
          <Icon name="pot" />
          <span>ເມນູ</span>
        </NavLink>
        <NavLink to="/favorite">
          <Icon name="heart" />
          <span>ລາຍການໂປດ</span>
        </NavLink>
        <NavLink to="/order">
          <span className="mobile-cart">
            <Icon name="bag" />
            {quantity > 0 && <b>{quantity > 99 ? '99+' : quantity}</b>}
          </span>
          <span>ກະຕ່າ</span>
        </NavLink>
      </nav>
      <div
        className={`toast ${toast ? 'visible' : ''}`}
        role="status"
        aria-live="polite"
      >
        {toast && (
          <>
            <Icon name="check" size={19} />
            {toast}
          </>
        )}
      </div>
    </ToastContext.Provider>
  );
}

export function PageHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {description && (
          <p className="muted">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
export function EmptyState({
  icon = 'bag',
  title,
  description,
  action = 'ເລືອກເມນູແຊບ',
  to = '/shop',
}: {
  icon?: string;
  title: string;
  description: string;
  action?: string;
  to?: string;
}) {
  return (
    <div className="empty-state">
      <span className="empty-icon">
        <Icon name={icon} size={42} />
      </span>
      <h2>{title}</h2>
      <p>{description}</p>
      <Link className="button primary" to={to}>
        {action}
        <Icon name="arrow" size={18} />
      </Link>
    </div>
  );
}
