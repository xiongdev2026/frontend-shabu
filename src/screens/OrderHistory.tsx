import {Link} from 'react-router-dom';
import {readOrders, displayDate} from '@/data/local';
import {money} from '@/data/mock';
import {
  PageHeading,
  EmptyState,
} from '@/components/shabu/Storefront';
import {FoodImage} from '@/components/shabu/MenuCard';
import {Icon} from '@/components/shabu/Icon';

export function OrderHistory() {
  const orders = readOrders();
  return (
    <div className="container page-content">
      <PageHeading
        eyebrow="YOUR HAPPY MOMENTS"
        title="ປະຫວັດການສັ່ງອາຫານ"
        description="ລາຍການອາຫານທີ່ທ່ານໄດ້ສັ່ງໄວ້ທັງໝົດ"
      />
      {orders.length ? (
        <div className="order-history-list">
          {orders.map((order) => (
            <article
              className="panel history-card"
              key={order.id}
            >
              <div className="history-heading">
                <div>
                  <strong>{order.id}</strong>
                  <p>{displayDate(order.createdAt)}</p>
                </div>
                <span className="demo-label">
                  ສັ່ງສຳເລັດແລ້ວ
                </span>
              </div>
              <div className="history-item-list">
                {order.items.map((item) => (
                  <div key={item.id}>
                    <FoodImage dish={item} />
                    <span>
                      <strong>{item.name}</strong>
                      <small>
                        {item.quantity ?? 1} ×{' '}
                        {money(item.price)}
                      </small>
                    </span>
                    <b>
                      {money(
                        item.price * (item.quantity ?? 1),
                      )}
                    </b>
                  </div>
                ))}
              </div>
              <div className="history-bottom">
                <span>
                  <Icon
                    name={
                      order.mode === 'delivery'
                        ? 'truck'
                        : 'bag'
                    }
                    size={18}
                  />
                  {order.mode === 'delivery'
                    ? 'ຈັດສົ່ງເຖິງບ້ານ'
                    : 'ຮັບທີ່ໜ້າຮ້ານ'}
                </span>
                <strong>ລວມ {money(order.total)}</strong>
                <Link
                  className="text-link"
                  to={`/checkout-success?order=${order.id}`}
                >
                  ເບິ່ງລາຍລະອຽດ
                  <Icon name="arrow" size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="clock"
          title="ຍັງບໍ່ມີປະຫວັດການສັ່ງອາຫານ"
          description="ເລືອກສັ່ງເມນູແຊບໆ ຈາກ Shabu ແລ້ວລາຍການຈະສະແດງຢູ່ນີ້"
        />
      )}
    </div>
  );
}
