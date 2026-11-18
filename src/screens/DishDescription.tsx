import {useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '@/store';
import {cartActions} from '@/store/cartSlice';
import {wishlistActions} from '@/store/wishlistSlice';
import {useGetDish} from '@/hooks/useGetDish';
import {dishes, money, categoryName} from '@/data/mock';
import {
  FoodImage,
  MenuCard,
} from '@/components/shabu/MenuCard';
import {
  EmptyState,
  useToast,
} from '@/components/shabu/Storefront';
import {Icon} from '@/components/shabu/Icon';

export function DishDescription() {
  const {id} = useParams();
  const {dish} = useGetDish(Number(id));
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [quantity, setQuantity] = useState(1);
  const liked = useAppSelector((state) =>
    state.wishlist.list.some(
      (item) => item.id === Number(id),
    ),
  );
  if (!dish)
    return (
      <EmptyState
        icon="pot"
        title="ບໍ່ພົບເມນູນີ້"
        description="ເລືອກເບິ່ງເມນູແຊບອື່ນໆ ຂອງເຮົາໄດ້ເລີຍ"
      />
    );
  return (
    <div className="container page-content">
      <div className="breadcrumb">
        <Link to="/shop">ເມນູອາຫານ</Link>
        <Icon name="chevron" size={14} />
        <Link to={`/shop?category=${dish.category}`}>
          {categoryName(dish.category)}
        </Link>
        <Icon name="chevron" size={14} />
        <span>{dish.name}</span>
      </div>
      <div className="dish-detail">
        <div className="detail-image">
          <FoodImage dish={dish} />
          {dish.badge && (
            <span className="dish-badge badge-red">
              {dish.badge}
            </span>
          )}
        </div>
        <div className="detail-copy">
          <p className="eyebrow">
            {dish.english.toUpperCase()}
          </p>
          <h1>{dish.name}</h1>
          <div className="detail-meta">
            <span className="rating">
              <Icon name="star" size={17} />
              {dish.rating}
            </span>
            <span>{dish.weight}</span>
            <span className="green-label">ພ້ອມເສີບ</span>
          </div>
          <p className="detail-description">
            {dish.description}
          </p>
          <div className="detail-price price">
            {money(dish.price)}
            {dish.originalPrice && (
              <del>{money(dish.originalPrice)}</del>
            )}
          </div>
          <div className="ingredient-list">
            <h3>ຄວາມແຊບທີ່ທ່ານຈະໄດ້ຮັບ</h3>
            <ul>
              {dish.ingredients?.map((item) => (
                <li key={item}>
                  <Icon name="check" size={15} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {dish.allergens.length > 0 && (
            <p className="allergen-note">
              ຂໍ້ມູນຜູ້ແພ້ອາຫານ: {dish.allergens.join(', ')}
            </p>
          )}
          <div className="detail-add-row">
            <div className="quantity-control">
              <button
                aria-label="ຫຼຸດຈຳນວນ"
                disabled={quantity === 1}
                onClick={() =>
                  setQuantity((value) =>
                    Math.max(1, value - 1),
                  )
                }
              >
                <Icon name="minus" size={18} />
              </button>
              <span aria-live="polite">{quantity}</span>
              <button
                aria-label="ເພີ່ມຈຳນວນ"
                onClick={() =>
                  setQuantity((value) => value + 1)
                }
              >
                <Icon name="plus" size={18} />
              </button>
            </div>
            <button
              className="button primary"
              onClick={() => {
                for (let i = 0; i < quantity; i++)
                  dispatch(cartActions.addToCart(dish));
                toast(
                  `ເພີ່ມ ${dish.name} ${quantity} ລາຍການແລ້ວ`,
                );
              }}
            >
              <Icon name="bag" size={19} />
              ເພີ່ມໃສ່ກະຕ່າ{' '}
              <span>{money(dish.price * quantity)}</span>
            </button>
            <button
              className={`button secondary detail-favorite ${liked ? 'liked' : ''}`}
              aria-label={
                liked
                  ? 'ນຳອອກຈາກລາຍການໂປດ'
                  : 'ເພີ່ມລາຍການໂປດ'
              }
              aria-pressed={liked}
              onClick={() => {
                dispatch(
                  liked
                    ? wishlistActions.removeFromWishlist(
                        dish,
                      )
                    : wishlistActions.addToWishlist(dish),
                );
                toast(
                  liked
                    ? 'ນຳອອກຈາກລາຍການໂປດແລ້ວ'
                    : 'ບັນທຶກເມນູໂປດແລ້ວ',
                );
              }}
            >
              <Icon name="heart" />
            </button>
          </div>
          <p className="detail-delivery">
            <Icon name="truck" size={17} />
            ຈັດສົ່ງໃນ 30–45 ນາທີ · ສົ່ງຟຣີເມື່ອຄົບ ₭999,000
          </p>
          <p className="small muted">
            ຄັດສັນວັດຖຸດິບຄຸນນະພາບພຣີມຽມ ສົດໃໝ່ທຸກມື້
          </p>
        </div>
      </div>
      <section className="related-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">PERFECT TOGETHER</p>
            <h2>ເຕີມໝໍ້ນີ້ໃຫ້ແຊບຍິ່ງຂຶ້ນ</h2>
          </div>
        </div>
        <div className="menu-grid">
          {dishes
            .filter((item) => item.id !== dish.id)
            .slice(0, 4)
            .map((item) => (
              <MenuCard key={item.id} dish={item} />
            ))}
        </div>
      </section>
    </div>
  );
}
