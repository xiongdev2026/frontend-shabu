import {Link, useSearchParams} from 'react-router-dom';
import {readOrders, displayDate} from '@/data/local';
import {money} from '@/data/mock';
import {Icon} from '@/components/shabu/Icon';
import {EmptyState} from '@/components/shabu/Storefront';

export function CheckoutSuccess() {
  const [params] = useSearchParams();
  const order = readOrders().find(
    (item) => item.id === params.get('order'),
  );
  if (!order)
    return (
      <EmptyState
        title="ຍັງບໍ່ມີຄຳສັ່ງຊື້ນີ້"
        description="ເບິ່ງລາຍການທີ່ບັນທຶກໄວ້ ຫຼື ເລີ່ມເລືອກຄວາມແຊບໃໝ່ໄດ້ເລີຍ"
        action="ເບິ່ງປະຫວັດການສັ່ງອາຫານ"
        to="/order-history"
      />
    );
  return (
    <div className="container page-content">
      <div className="success-card">
        <div className="success-check">
          <Icon name="check" size={38} />
        </div>
        <p className="eyebrow">
          A LITTLE HAPPINESS IS ON ITS WAY
        </p>
        <h1>ສັ່ງອາຫານສຳເລັດແລ້ວ!</h1>
        <p className="muted">
          ຂອບໃຈທີ່ເລືອກ Shabu ໃຫ້ເປັນມື້ພິເສດຂອງທ່ານ
        </p>
        <div className="success-order-id">
          {order.id}
          <span className="demo-label">
            ຢືນຢັນອໍເດີແລ້ວ
          </span>
        </div>
        <div className="success-details">
          <div>
            <span>ຊື່ຜູ້ຮັບ</span>
            <strong>{order.name}</strong>
          </div>
          <div>
            <span>ວິທີຮັບອາຫານ</span>
            <strong>
              {order.mode === 'delivery'
                ? 'ຈັດສົ່ງເຖິງບ້ານ'
                : 'ຮັບທີ່ໜ້າຮ້ານ'}
            </strong>
          </div>
          <div>
            <span>ເວລາສັ່ງຊື້</span>
            <strong>{displayDate(order.createdAt)}</strong>
          </div>
          <div>
            <span>ຍອດລວມ</span>
            <strong className="accent-text">
              {money(order.total)}
            </strong>
          </div>
        </div>
        <p className="demo-explanation">
          ຮ້ານໄດ້ຮັບອໍເດີຂອງທ່ານແລ້ວ ແລະ ກຳລັງກະກຽມວັດຖຸດິບສົດໃໝ່
          <br />
          ພະນັກງານຈະຕິດຕໍ່ຫາທ່ານຕາມເບີໂທລະສັບກ່ອນການຈັດສົ່ງອາຫານ
        </p>
        <div className="success-actions">
          <Link
            className="button primary"
            to="/order-history"
          >
            ເບິ່ງປະຫວັດການສັ່ງອາຫານ{' '}
            <Icon name="arrow" size={18} />
          </Link>
          <Link className="button secondary" to="/shop">
            ເລືອກເມນູຕໍ່
          </Link>
        </div>
      </div>
    </div>
  );
}
