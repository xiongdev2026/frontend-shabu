import {PageHeading} from '@/components/shabu/Storefront';
import {MenuBrowser} from '@/components/shabu/MenuBrowser';

export function Shop() {
  return (
    <div className="container page-content">
      <PageHeading
        eyebrow="THE SHABU MENU"
        title="ເມນູໂປດ ສຳລັບໝໍ້ຂອງທ່ານ"
        description="ເລືອກວັດຖຸດິບທີ່ມັກ ແລ້ວໃຫ້ມື້ນີ້ແຊບໃນແບບຂອງທ່ານ"
      />
      <MenuBrowser />
    </div>
  );
}
