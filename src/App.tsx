import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import {
  Storefront,
  EmptyState,
} from '@/components/shabu/Storefront';
import { Home } from '@/screens/Home';
import { Shop } from '@/screens/Shop';
import { DishDescription } from '@/screens/DishDescription';
import { Order } from '@/screens/Order';
import { Checkout } from '@/screens/Checkout';
import { CheckoutSuccess } from '@/screens/CheckoutSuccess';
import { Favorite } from '@/screens/Favorite';
import { AllOffers } from '@/screens/AllOffers';
import { OrderHistory } from '@/screens/OrderHistory';
import { Profile } from '@/screens/Profile';
import { Reservation } from '@/screens/Reservation';

// Admin imports
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminDashboard } from '@/screens/admin/AdminDashboard';
import { AdminOrders } from '@/screens/admin/AdminOrders';
import { AdminMenu } from '@/screens/admin/AdminMenu';
import { AdminReservations } from '@/screens/admin/AdminReservations';
import { AdminSettings } from '@/screens/admin/AdminSettings';

export default function App() {
  const location = useLocation();
  return (
    <Routes>
      {/* Admin / Dashboard Routes */}
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="reservations" element={<AdminReservations />} />
        <Route path="menu" element={<AdminMenu />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Customer Storefront Routes */}
      <Route element={<Storefront />}>
        <Route index element={<Home />} />
        <Route
          path="home"
          element={<Navigate to="/" replace />}
        />
        <Route path="shop" element={<Shop />} />
        <Route
          path="shop-category"
          element={<Navigate to="/shop" replace />}
        />
        <Route
          path="dish-description/:id"
          element={
            <DishDescription key={location.pathname} />
          }
        />
        <Route path="order" element={<Order />} />
        <Route
          path="cart-empty"
          element={<Navigate to="/order" replace />}
        />
        <Route path="checkout" element={<Checkout />} />
        <Route
          path="checkout-success"
          element={<CheckoutSuccess />}
        />
        <Route path="favorite" element={<Favorite />} />
        <Route
          path="favorite-empty"
          element={<Navigate to="/favorite" replace />}
        />
        <Route path="all-offers" element={<AllOffers />} />
        <Route
          path="my-promocodes"
          element={<Navigate to="/all-offers" replace />}
        />
        <Route
          path="order-history"
          element={<OrderHistory />}
        />
        <Route
          path="reservation"
          element={<Reservation />}
        />
        <Route path="profile" element={<Profile />} />
        <Route
          path="sign-up"
          element={<Navigate to="/profile" replace />}
        />
        <Route
          path="*"
          element={
            <EmptyState
              icon="pot"
              title="ໜ້ານີ້ອາດຖືກຍ້າຍແລ້ວ"
              description="ກັບມາເລືອກມື້ແຊບໆ ກັບ Shabu ໄດ້ເລີຍ"
              action="ກັບໜ້າຫຼັກ"
              to="/"
            />
          }
        />
      </Route>
    </Routes>
  );
}
