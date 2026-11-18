import {Link} from 'react-router-dom';
import {
  PageHeading,
  useToast,
} from '@/components/shabu/Storefront';
import {Icon} from '@/components/shabu/Icon';

export function AllOffers() {
  const toast = useToast();
  return (
    <div className="container page-content">
      <PageHeading
        eyebrow="GOOD FOOD, BETTER DEALS"
        title="ເຕີມຄວາມສຸກ ໃຫ້ຄຸ້ມກວ່າເກົ່າ"
        description="ຄວາມແຊບ ແລະ ຂໍ້ສະເໜີພິເສດທີ່ເຮົາກຽມໄວ້ໃຫ້ທ່ານ"
      />
      <div className="offers-list">
        <article className="offer-detail">
          <div className="offer-visual red-offer">
            <span>
              WELCOME
              <br />
              TO SHABU
            </span>
            <strong>
              10<small>% OFF</small>
            </strong>
            <Icon name="pot" size={85} />
          </div>
          <div>
            <span className="pill">ສຳລັບມື້ທຳອິດ</span>
            <h2>ມື້ທຳອິດທີ່ໄດ້ພົບກັນ ຮັບສ່ວນຫຼຸດ 10%</h2>
            <p>
              ໃຫ້ມື້ທຳອິດຂອງທ່ານພິເສດກວ່າເກົ່າ ໃຊ້ລະຫັດ SHABU10
              ທີ່ໜ້າກະຕ່າເມື່ອສັ່ງອາຫານຄົບ ₭500,000
            </p>
            <ul className="offer-conditions">
              <li>
                ສ່ວນຫຼຸດ 10% ຈາກຄ່າອາຫານ ບໍ່ລວມຄ່າຈັດສົ່ງ
              </li>
              <li>ໃຊ້ໄດ້ທັງແບບຈັດສົ່ງ ແລະ ຮັບທີ່ໜ້າຮ້ານ</li>
              <li>ຈຳກັດ 1 ສິດ / 1 ໃບບິນ ສຳລັບສະມາຊິກ Shabu</li>
            </ul>
            <button
              className="button primary"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(
                    'SHABU10',
                  );
                  toast('ຄັດລອກລະຫັດ SHABU10 ແລ້ວ');
                } catch {
                  toast(
                    'ໃສ່ລະຫັດ SHABU10 ທີ່ໜ້າກະຕ່າໄດ້ເລີຍ',
                  );
                }
              }}
            >
              <Icon name="copy" size={18} />
              ຄັດລອກລະຫັດ SHABU10
            </button>
          </div>
        </article>
        <article className="offer-detail">
          <img
            className="offer-visual"
            src="/images/shabu-hero.webp"
            alt="ຊຸດຊາບູສຳລັບຄອບຄົວ 4 ຄົນ"
          />
          <div>
            <span className="pill">ຄວາມສຸກສຳລັບ 4 ຄົນ</span>
            <h2>ຊຸດພ້ອມໜ້າ ແຊບຄົບທັງຄອບຄົວ</h2>
            <p>
              ຊີ້ນວາກິວ, ໝູຄຸໂຣບຸຕະ, ອາຫານທະເລ, ຊຸດຜັກ ແລະ ນ້ຳຊຸບ
              2 ລົດ ຄົບໃນຊຸດດຽວ ຈາກ ₭1,299,000 ເຫຼືອພຽງ
              ₭1,099,000
            </p>
            <ul className="offer-conditions">
              <li>ພ້ອມນ້ຳຈິ້ມພອນຊຶ ແລະ ນ້ຳຈິ້ມງາ</li>
              <li>
                ຮັບສິດຈັດສົ່ງຟຣີເມື່ອຍອດອາຫານຄົບ ₭999,000
              </li>
              <li>ເມນູພິເສດມີຈຳນວນຈຳກັດຕໍ່ມື້ ເພື່ອຄວາມສົດໃໝ່</li>
            </ul>
            <Link
              className="button primary"
              to="/dish-description/108"
            >
              ເບິ່ງຊຸດສຳລັບຄອບຄົວ <Icon name="arrow" size={18} />
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
