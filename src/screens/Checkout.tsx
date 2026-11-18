import { useState, type FormEvent } from 'react';
import {
  Link,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { cartActions } from '@/store/cartSlice';
import {
  deliveryFee,
  saveOrder,
  type DemoOrder,
  type Fulfillment,
} from '@/data/local';
import {
  OrderSummary,
  FulfillmentChoice,
} from '@/components/shabu/OrderSummary';
import {
  EmptyState,
  PageHeading,
  useToast,
} from '@/components/shabu/Storefront';
import { Icon } from '@/components/shabu/Icon';

export function Checkout() {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [params, setParams] = useSearchParams();
  const mode: Fulfillment =
    params.get('mode') === 'pickup' ? 'pickup' : 'delivery';
  const [payment, setPayment] = useState('cash');
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fee = deliveryFee(cart.subtotal, mode);
    const order: DemoOrder = {
      id: `NB-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      name: String(form.get('name')).trim(),
      phone: String(form.get('phone')),
      address:
        mode === 'delivery'
          ? String(form.get('address')).trim()
          : 'ຮັບທີ່ໜ້າຮ້ານ · ສາຂາວຽງຈັນ',
      note: String(form.get('note') ?? '').trim(),
      mode,
      payment,
      items: cart.list.map((item) => ({ ...item })),
      subtotal: cart.subtotal,
      discount: cart.discountAmount,
      delivery: fee,
      total: cart.total + fee,
    };
    try {
      saveOrder(order);
      dispatch(cartActions.resetCart());
      navigate(`/checkout-success?order=${order.id}`, {
        replace: true,
      });
    } catch {
      toast(
        'ບັນທຶກບໍ່ໄດ້. ກະລຸນາອະນຸຍາດພື້ນທີ່ຈັດເກັບຂອງບຣາວເຊີ ແລ້ວລອງໃໝ່.',
      );
    }
  };
  if (!cart.list.length)
    return (
      <div className="container page-content">
        <EmptyState
          title="ເລືອກເມນູກ່ອນເລີ່ມສັ່ງຊື້"
          description="ຄວາມແຊບອີກຫຼາຍຢ່າງລໍໃຫ້ທ່ານເລືອກຢູ່"
        />
      </div>
    );
  return (
    <div className="container page-content">
      <Link
        className="back-link"
        to={`/order?mode=${mode}`}
      >
        <Icon name="left" size={16} />
        ກັບໄປທີ່ກະຕ່າ
      </Link>
      <PageHeading
        eyebrow="ALMOST A HAPPY MEAL"
        title="ກຽມສົ່ງຄວາມແຊບເຖິງທ່ານ"
        description="ກອກຂໍ້ມູນຂອງທ່ານເພື່ອດຳເນີນການສັ່ງອາຫານ"
      />
      <div className="checkout-layout">
        <form id="checkout-form" onSubmit={submit}>
          <FulfillmentChoice
            mode={mode}
            onChange={(value) =>
              setParams({ mode: value }, { replace: true })
            }
          />
          <section className="panel form-panel">
            <h2>
              <span className="step-number">1</span>ຂໍ້ມູນ
              {mode === 'delivery'
                ? 'ຜູ້ຮັບອາຫານ'
                : 'ຜູ້ຮັບທີ່ໜ້າຮ້ານ'}
            </h2>
            <div className="form-grid">
              <label>
                ຊື່ຜູ້ຮັບ <span>*</span>
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="ຊື່ ແລະ ນາມສະກຸນ"
                  required
                  minLength={2}
                  maxLength={100}
                />
              </label>
              <label>
                ເບີໂທລະສັບ <span>*</span>
                <input
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="020 XX XXX XXX"
                  required
                  pattern="[0-9 +()-]{8,20}"
                  title="ກະລຸນາກອກເບີໂທລະສັບທີ່ຖືກຕ້ອງ"
                />
              </label>
              {mode === 'delivery' ? (
                <label className="full-field">
                  ທີ່ຢູ່ຈັດສົ່ງ <span>*</span>
                  <textarea
                    name="address"
                    autoComplete="street-address"
                    placeholder="ເຮືອນເລກທີ, ຖະໜົນ, ບ້ານ, ເມືອງ, ແຂວງ ແລະ ລະຫັດໄປສະນີ"
                    required
                    minLength={12}
                    maxLength={500}
                    rows={3}
                  />
                </label>
              ) : (
                <div className="pickup-location full-field">
                  <Icon name="pin" size={22} />
                  <div>
                    <strong>Shabu ສາຂາວຽງຈັນ</strong>
                    <p>
                      ຮັບອາຫານປະມານ 30 – 45 ນາທີ
                      ຫຼັງຢືນຢັນຄຳສັ່ງຊື້
                    </p>
                    <small>
                      ສາຂາໃຫຍ່ວຽງຈັນ ເປີດບໍລິການ 11:00 – 22:00
                    </small>
                  </div>
                </div>
              )}
              <label className="full-field">
                ໝາຍເຫດເພີ່ມເຕີມ <small>(ບໍ່ຈຳເປັນ)</small>
                <textarea
                  name="note"
                  placeholder="ເຊັ່ນ ບໍ່ຮັບບ່ວງສ້ອມ ຫຼື ຈຸດສັງເກດສຳລັບຈັດສົ່ງ"
                  maxLength={300}
                  rows={2}
                />
              </label>
            </div>
          </section>
          <section className="panel form-panel">
            <h2>
              <span className="step-number">2</span>
              ວິທີຊຳລະເງິນ
            </h2>
            <div className="payment-options">
              <label
                className={
                  payment === 'cash' ? 'selected' : ''
                }
              >
                <input
                  type="radio"
                  name="payment"
                  checked={payment === 'cash'}
                  onChange={() => setPayment('cash')}
                />
                <span>
                  <strong>ຊຳລະເມື່ອຮັບອາຫານ</strong>
                  <small>
                    ຈ່າຍເງິນສົດ ຫຼື ເງິນໂອນເມື່ອອາຫານມາຮອດ
                  </small>
                </span>
              </label>
              <label
                className={
                  payment === 'promptpay' ? 'selected' : ''
                }
              >
                <input
                  type="radio"
                  name="payment"
                  checked={payment === 'promptpay'}
                  onChange={() => setPayment('promptpay')}
                />
                <span>
                  <strong>BCEL One / QR Pay</strong>
                  <small>
                    ສະແກນ QR ໂຄດເພື່ອຊຳລະເງິນໄດ້ສະດວກວ່ອງໄວ
                  </small>
                </span>
              </label>
            </div>
          </section>
          <p className="subtle-note demo-checkout">
            <Icon name="shield" size={19} />
            <span>
              ລະບົບຮັກສາຄວາມປອດໄພຂໍ້ມູນສ່ວນຕົວ ພະນັກງານຈະຕິດຕໍ່ຢືນຢັນອໍເດີກ່ອນການຈັດສົ່ງ
            </span>
          </p>
        </form>
        <OrderSummary mode={mode} checkout />
      </div>
    </div>
  );
}
