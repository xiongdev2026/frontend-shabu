import {Link} from 'react-router-dom';
import {Icon} from '@/components/shabu/Icon';
import {MenuBrowser} from '@/components/shabu/MenuBrowser';
import {useToast} from '@/components/shabu/Storefront';

export function Home() {
  const toast = useToast();
  return (
    <>
      <section className="hero-section">
        <div className="container hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" /> MADE FOR
              GOOD MOMENTS
            </p>
            <h1>
              ຄວາມສຸກດີໆ<br />
              ເລີ່ມຕົ້ນທີ່<span>ໝໍ້ຊາບູ</span>
            </h1>
            <p className="hero-description">
              ວັດຖຸດິບທີ່ເຮົາຄັດສັນ ນ້ຳຊຸບທີ່ເຮົາໃສ່ໃຈ
              <br />
              ພ້ອມເສີບຄວາມແຊບ ໃຫ້ທຸກມື້ເປັນຊ່ວງເວລາດີໆ
            </p>
            <div className="hero-actions">
              <Link className="button primary" to="/shop">
                ເລືອກເມນູແຊບ{' '}
                <Icon name="arrow" size={19} />
              </Link>
              <Link
                className="button hero-booking"
                to="/reservation"
              >
                <Icon name="calendar" size={18} />
                ຈອງໂຕະທີ່ຮ້ານ
              </Link>
            </div>
            <div className="hero-proof">
              <div className="proof-stars">★★★★★</div>
              <span>
                <strong>4.9</strong> / 5 <i />{' '}
                ຄວາມແຊບທີ່ທຸກຄົນຫຼົງຮັກ
              </span>
            </div>
          </div>
          <div className="hero-photo">
            <img
              src="/images/shabu-hero.webp"
              alt="ໝໍ້ຊາບູສອງນ້ຳຊຸບ ພ້ອມຊີ້ນວາກິວ ຜັກສົດ ແລະ ນ້ຳຈິ້ມຍີ່ປຸ່ນ"
              fetchPriority="high"
            />
            <div className="hero-photo-overlay" />
            <div className="hero-stamp">
              <span>こだわりの味</span>
              <Icon name="pot" size={27} />
              <strong>ແຊບທຸກໝໍ້</strong>
              <small>HAPPINESS IN EVERY POT</small>
            </div>
            <div className="hero-image-caption">
              <span className="caption-dot" /> ສົດໃໝ່ ໃສ່ໃຈ
              ໃນທຸກມື້ <span>THE SHABU EXPERIENCE</span>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="quality-strip">
          <div>
            <span className="quality-icon">
              <Icon name="beef" size={29} />
            </span>
            <span>
              <strong>ຄັດສັນວັດຖຸດິບຊັ້ນດີ</strong>
              <small>ສົດໃໝ່ ແຊບຢ່າງໝັ້ນໃຈ</small>
            </span>
          </div>
          <div>
            <span className="quality-icon">
              <Icon name="pot" size={29} />
            </span>
            <span>
              <strong>ນ້ຳຊຸບເຄີ່ຍວດ້ວຍຄວາມໃສ່ໃຈ</strong>
              <small>ກົມກ່ອມ ຫອມແຊບທຸກໝໍ້</small>
            </span>
          </div>
          <div>
            <span className="quality-icon">
              <Icon name="heart" size={28} />
            </span>
            <span>
              <strong>ມື້ດີໆ ທີ່ຢາກແບ່ງປັນ</strong>
              <small>ພ້ອມແຊບທີ່ຮ້ານ ແລະ ທີ່ບ້ານ</small>
            </span>
          </div>
        </div>
      </div>
      <section className="container home-menu">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FIND YOUR FAVORITE</p>
            <h2>
              ເລືອກຄວາມແຊບໃນແບບຂອງທ່ານ
              <span className="accent-dot">.</span>
            </h2>
            <p className="muted">
              ບໍ່ວ່າຈະມາກິນດ່ຽວ ຫຼື ສັງສັນເປັນກຸ່ມ ກໍມີເມນູແຊບໆ ພ້ອມເສີບໃຫ້ສະເໝີ
            </p>
          </div>
          <Link
            className="text-link desktop-view-all"
            to="/shop"
          >
            ເບິ່ງເມນູທັງໝົດ <Icon name="arrow" size={18} />
          </Link>
        </div>
        <MenuBrowser compact />
      </section>
      <section className="container promo-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              A LITTLE EXTRA HAPPINESS
            </p>
            <h2>ຄວາມແຊບທີ່ຄຸ້ມກວ່າເກົ່າ</h2>
          </div>
          <Link className="text-link" to="/all-offers">
            ເບິ່ງໂປຣໂມຊັນ <Icon name="arrow" size={18} />
          </Link>
        </div>
        <div className="promo-grid">
          <article className="promo-card first-order">
            <div>
              <span className="promo-tag">
                WELCOME TO SHABU
              </span>
              <h3>
                ມື້ທຳອິດທີ່ໄດ້ພົບກັນ
                <br />
                ຮັບຄວາມສຸກເພີ່ມ <strong>10%</strong>
              </h3>
              <p>
                ເມື່ອສັ່ງຄົບ ₭500,000 ໃຊ້ລະຫັດໄດ້ທີ່ໜ້າກະຕ່າ
              </p>
              <button
                className="coupon-button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(
                      'SHABU10',
                    );
                    toast('ຄັດລອກລະຫັດ SHABU10 ແລ້ວ');
                  } catch {
                    toast(
                      'ໃຊ້ລະຫັດ SHABU10 ທີ່ໜ້າກະຕ່າໄດ້ເລີຍ',
                    );
                  }
                }}
              >
                <Icon name="ticket" size={18} />
                <strong>SHABU10</strong>
                <span>ຄັດລອກລະຫັດ</span>
                <Icon name="copy" size={15} />
              </button>
            </div>
            <div className="promo-art" aria-hidden="true">
              <span>
                10<small>%</small>
              </span>
              <Icon name="pot" size={72} />
            </div>
          </article>
          <article className="promo-card family-promo">
            <div>
              <span className="promo-tag">
                BETTER TOGETHER
              </span>
              <h3>
                ພ້ອມໜ້າ ພ້ອມໝໍ້
                <br />
                ອີ່ມສຸກທັງຄອບຄົວ
              </h3>
              <p>ຊຸດຊາບູ 4 ຄົນ ຈາກ ₭1,299,000 ເຫຼືອ ₭1,099,000</p>
              <Link
                className="text-link"
                to="/dish-description/108"
              >
                ເບິ່ງຊຸດສຳລັບຄອບຄົວ{' '}
                <Icon name="arrow" size={18} />
              </Link>
            </div>
            <img
              src="/images/shabu-hero.webp"
              alt="ຊຸດຊາບູສຳລັບຄອບຄົວ"
              loading="lazy"
            />
          </article>
        </div>
      </section>
      <section className="container story-strip">
        <span className="story-japanese" aria-hidden="true">
          鍋
        </span>
        <div>
          <p className="eyebrow">MORE THAN JUST SHABU</p>
          <h2>ແຊບດ້ວຍກັນ ອຸ່ນໃຈກວ່າສະເໝີ</h2>
          <p>
            ຊວນຄົນທີ່ທ່ານຮັກ ມາລ້ອມວົງຄວາມສຸກຮອບໝໍ້ຊາບູທີ່
            Shabu
          </p>
        </div>
        <Link
          className="button secondary"
          to="/reservation"
        >
          ຈອງຊ່ວງເວລາດີໆ <Icon name="arrow" size={18} />
        </Link>
      </section>
    </>
  );
}
