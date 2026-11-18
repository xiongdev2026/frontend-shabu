import {Link, useSearchParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '@/store';
import {cartActions} from '@/store/cartSlice';
import {money} from '@/data/mock';
import type {Fulfillment} from '@/data/local';
import {
  PageHeading,
  EmptyState,
} from '@/components/shabu/Storefront';
import {
  FoodImage,
  QuantityControl,
} from '@/components/shabu/MenuCard';
import {
  OrderSummary,
  FulfillmentChoice,
} from '@/components/shabu/OrderSummary';
import {Icon} from '@/components/shabu/Icon';

export function Order() {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [params, setParams] = useSearchParams();
  const mode: Fulfillment =
    params.get('mode') === 'pickup' ? 'pickup' : 'delivery';
  return (
    <div className="container page-content">
      <PageHeading
        eyebrow="YOUR HAPPY POT"
        title="ກະຕ່າຄວາມແຊບ"
        description="ອີກບໍ່ໜ້ອຍ ກໍພ້ອມສຳລັບມື້ດີໆ ຂອງທ່ານ"
      >
        <Link className="text-link" to="/shop">
          <Icon name="plus" size={17} />
          ເລືອກເມນູເພີ່ມ
        </Link>
      </PageHeading>
      {cart.list.length === 0 ? (
        <EmptyState
          title="ໝໍ້ນີ້ຍັງລໍຖ້າຄວາມແຊບຢູ່"
          description="ເລືອກເມນູທີ່ທ່ານມັກ ແລ້ວເລີ່ມຕົ້ນມື້ດີໆ ດ້ວຍກັນ"
        />
      ) : (
        <div className="checkout-layout">
          <div>
            <FulfillmentChoice
              mode={mode}
              onChange={(value) =>
                setParams({mode: value}, {replace: true})
              }
            />
            <section className="panel cart-panel">
              <div className="panel-heading">
                <h2>ເມນູທີ່ທ່ານເລືອກ</h2>
                <span>{cart.list.length} ເມນູ</span>
              </div>
              <div className="cart-items">
                {cart.list.map((dish) => (
                  <article
                    className="cart-item"
                    key={dish.id}
                  >
                    <Link
                      to={`/dish-description/${dish.id}`}
                    >
                      <FoodImage dish={dish} />
                    </Link>
                    <div className="cart-item-info">
                      <Link
                        to={`/dish-description/${dish.id}`}
                      >
                        <h3>{dish.name}</h3>
                      </Link>
                      <p>{dish.weight}</p>
                      <strong>{money(dish.price)}</strong>
                    </div>
                    <QuantityControl
                      dish={dish}
                      quantity={dish.quantity ?? 1}
                    />
                    <div className="cart-line-total">
                      {money(
                        dish.price * (dish.quantity ?? 1),
                      )}
                    </div>
                    <button
                      className="icon-button remove-item"
                      aria-label={`ນຳ ${dish.name} ອອກຈາກກະຕ່າ`}
                      onClick={() =>
                        dispatch(
                          cartActions.deleteFromCart(
                            dish.id,
                          ),
                        )
                      }
                    >
                      <Icon name="trash" size={18} />
                    </button>
                  </article>
                ))}
              </div>
            </section>
            <div className="subtle-note">
              <Icon name="leaf" size={21} />
              <span>
                ເຮົາກຽມວັດຖຸດິບສົດໃໝ່ສຳລັບທຸກຄຳສັ່ງຊື້
                <br />
                <small>
                  ຊຸດຊາບູຈັດສົ່ງເປັນວັດຖຸດິບພ້ອມປຸງ
                  ແຍກນ້ຳຊຸບ ແລະ ນ້ຳຈິ້ມ
                </small>
              </span>
            </div>
          </div>
          <OrderSummary mode={mode} />
        </div>
      )}
    </div>
  );
}
