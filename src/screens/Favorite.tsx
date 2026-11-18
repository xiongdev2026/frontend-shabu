import {useAppSelector} from '@/store';
import {dishes} from '@/data/mock';
import {
  PageHeading,
  EmptyState,
} from '@/components/shabu/Storefront';
import {MenuCard} from '@/components/shabu/MenuCard';

export function Favorite() {
  const ids = useAppSelector((state) =>
    state.wishlist.list.map((item) => item.id),
  );
  const favorites = dishes.filter((dish) =>
    ids.includes(dish.id),
  );
  return (
    <div className="container page-content">
      <PageHeading
        eyebrow="SAVED WITH LOVE"
        title="ເມນູໂປດຂອງທ່ານ"
        description="ເກັບຄວາມແຊບທີ່ມັກ ໄວ້ສຳລັບມື້ຖັດໄປ"
      />
      {favorites.length ? (
        <div className="menu-grid">
          {favorites.map((dish) => (
            <MenuCard key={dish.id} dish={dish} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="heart"
          title="ເມນູທີ່ຖືກໃຈ ເກັບໄວ້ໄດ້ເລີຍ"
          description="ແຕະຫົວໃຈເທິງເມນູທີ່ມັກ ແລ້ວກັບມາເລືອກຄວາມແຊບໄດ້ງ່າຍຂຶ້ນ"
        />
      )}
    </div>
  );
}
