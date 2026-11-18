import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store';
import { cartActions } from '@/store/cartSlice';
import { money } from '@/data/mock';
import { deliveryFee, type Fulfillment } from '@/data/local';
import { Icon } from './Icon';

export function OrderSummary({
  mode,
  checkout = false,
}: {
  mode: Fulfillment;
  checkout?: boolean;
}) {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [code, setCode] = useState(cart.promoCode);
  const [error, setError] = useState('');
  const fee = deliveryFee(cart.subtotal, mode);
  const apply = () => {
    if (code.trim().toUpperCase() !== 'SHABU10') {
      setError('ບໍ່ພົບລະຫັດນີ້ ລອງໃຊ້ SHABU10');
      return;
    }
    if (cart.subtotal < 500) {
      setError('ລະຫັດນີ້ໃຊ້ໄດ້ເມື່ອສັ່ງຄົບ ₭500,000');
      return;
    }
    dispatch(cartActions.setDiscount(10));
    dispatch(cartActions.setPromoCode('SHABU10'));
    setCode('SHABU10');
    setError('');
  };
  return (
    <aside className="order-summary">
      <h2>ສະຫຼຸບຄວາມແຊບ</h2>
      <div className="summary-lines">
        <div>
          <span>
            ຄ່າອາຫານ (
            {cart.list.reduce(
              (sum, item) => sum + (item.quantity ?? 1),
              0,
            )}{' '}
            ລາຍການ)
          </span>
          <span>{money(cart.subtotal)}</span>
        </div>
        {cart.discountAmount > 0 && (
          <div className="discount-line">
            <span>ສ່ວນຫຼຸດ {cart.promoCode}</span>
            <span>−{money(cart.discountAmount)}</span>
          </div>
        )}
        <div>
          <span>
            {mode === 'delivery'
              ? 'ຄ່າຈັດສົ່ງ'
              : 'ຮັບທີ່ໜ້າຮ້ານ'}
          </span>
          <span className={fee === 0 ? 'green-label' : ''}>
            {fee === 0 ? 'ຟຣີ' : money(fee)}
          </span>
        </div>
      </div>
      {mode === 'delivery' && cart.subtotal < 999 && (
        <div className="free-delivery">
          <Icon name="truck" size={18} />
          <span>
            ເພີ່ມອີກ{' '}
            <strong>{money(999 - cart.subtotal)}</strong>{' '}
            ເພື່ອຮັບສົ່ງຟຣີ
          </span>
          <div className="delivery-progress">
            <i
              style={{
                width: `${Math.min(100, (cart.subtotal / 999) * 100)}%`,
              }}
            />
          </div>
        </div>
      )}
      <div className="promo-entry">
        <label htmlFor="promo-code">
          <Icon name="ticket" size={18} />
          ລະຫັດສ່ວນຫຼຸດ
        </label>
        {cart.promoCode ? (
          <div className="applied-promo">
            <span>
              <Icon name="check" size={16} />
              {cart.promoCode} · ຫຼຸດ 10%
            </span>
            <button
              type="button"
              aria-label="ນຳລະຫັດສ່ວນຫຼຸດອອກ"
              onClick={() => {
                dispatch(cartActions.setDiscount(0));
                dispatch(cartActions.setPromoCode(''));
                setCode('');
              }}
            >
              <Icon name="close" size={16} />
            </button>
          </div>
        ) : (
          <>
            <div className="promo-input-row">
              <input
                id="promo-code"
                placeholder="ລອງໃຊ້ SHABU10"
                value={code}
                onChange={(event) => {
                  setCode(event.target.value);
                  setError('');
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    apply();
                  }
                }}
                aria-invalid={Boolean(error)}
                aria-describedby={
                  error ? 'promo-error' : undefined
                }
              />
              <button type="button" onClick={apply}>
                ໃຊ້ລະຫັດ
              </button>
            </div>
            {error && (
              <p
                className="field-error"
                id="promo-error"
                role="status"
              >
                {error}
              </p>
            )}
          </>
        )}
      </div>
      <div className="summary-total">
        <span>
          ຍອດລວມທັງໝົດ<small>ລາຄາລວມພາສີແລ້ວ</small>
        </span>
        <strong>{money(cart.total + fee)}</strong>
      </div>
      {checkout ? (
        <button
          className="button primary full-width"
          type="submit"
          form="checkout-form"
        >
          ຢືນຢັນຄຳສັ່ງຊື້{' '}
          <Icon name="arrow" size={18} />
        </button>
      ) : (
        <Link
          className="button primary full-width"
          to={`/checkout?mode=${mode}`}
        >
          ດຳເນີນການສັ່ງຊື້ <Icon name="arrow" size={18} />
        </Link>
      )}
      <p className="summary-note">
        <Icon name="shield" size={15} />
        ຮັບປະກັນວັດຖຸດິບສົດໃໝ່ ແລະ ປອດໄພ 100%
      </p>
    </aside>
  );
}
export function FulfillmentChoice({
  mode,
  onChange,
}: {
  mode: Fulfillment;
  onChange: (mode: Fulfillment) => void;
}) {
  return (
    <div
      className="fulfillment-choice"
      role="group"
      aria-label="ວິທີຮັບອາຫານ"
    >
      <button
        type="button"
        className={mode === 'delivery' ? 'selected' : ''}
        aria-pressed={mode === 'delivery'}
        onClick={() => onChange('delivery')}
      >
        <Icon name="truck" size={23} />
        <span>
          <strong>ຈັດສົ່ງເຖິງບ້ານ</strong>
          <small>ປະມານ 30 – 45 ນາທີ</small>
        </span>
        {mode === 'delivery' && (
          <Icon name="check" size={17} />
        )}
      </button>
      <button
        type="button"
        className={mode === 'pickup' ? 'selected' : ''}
        aria-pressed={mode === 'pickup'}
        onClick={() => onChange('pickup')}
      >
        <Icon name="bag" size={23} />
        <span>
          <strong>ຮັບທີ່ໜ້າຮ້ານ</strong>
          <small>ສາຂາວຽງຈັນ · ບໍ່ມີຄ່າສົ່ງ</small>
        </span>
        {mode === 'pickup' && (
          <Icon name="check" size={17} />
        )}
      </button>
    </div>
  );
}
