import {Link} from 'react-router-dom';
import {PageHeading} from '@/components/shabu/Storefront';
import {Icon} from '@/components/shabu/Icon';

export function Profile() {
  return (
    <div className="container page-content">
      <PageHeading
        eyebrow="WELCOME TO THE SHABU FAMILY"
        title="ມຸມຄວາມສຸກຂອງທ່ານ"
        description="ເຂົ້າເຖິງເມນູໂປດ ແລະ ປະຫວັດການສັ່ງອາຫານຂອງທ່ານໄດ້ງ່າຍໆ"
      />
      <div className="profile-layout">
        <div className="membership-card">
          <div className="membership-top">
            <div className="membership-icon-wrapper">
              <Icon name="pot" size={32} />
            </div>
            <span className="membership-tag">SHABU FRIENDS</span>
          </div>
          <h2>
            ຍິນດີຕ້ອນຮັບ
            <br />
            ເພື່ອນຄົນພິເສດຂອງເຮົາ
          </h2>
          <p>ເພີດເພີນກັບລົດຊາດຄວາມແຊບ ໂດຍບໍ່ຕ້ອງສະໝັກສະມາຊິກ</p>
          <div className="membership-note">
            <small>
              ສະມາຊິກ Shabu Friends · ຮັບສິດທິພິເສດສະເພາະທ່ານ
            </small>
          </div>
        </div>
        <div className="profile-menu">
          {[
            {
              to: '/order-history',
              icon: 'clock',
              title: 'ປະຫວັດການສັ່ງອາຫານ',
              detail: 'ເບິ່ງລາຍການອາຫານທີ່ເຄີຍສັ່ງໄວ້',
            },
            {
              to: '/favorite',
              icon: 'heart',
              title: 'ເມນູໂປດ',
              detail: 'ລວມລາຍການເມນູທີ່ທ່ານມັກທີ່ສຸດ',
            },
            {
              to: '/reservation',
              icon: 'calendar',
              title: 'ຈອງໂຕະ',
              detail: 'ຈອງຊ່ວງເວລາພິເສດ ແລະ ບ່ອນນັ່ງທີ່ຮ້ານ',
            },
            {
              to: '/all-offers',
              icon: 'ticket',
              title: 'ໂປຣໂມຊັນພິເສດ',
              detail: 'ເພີ່ມຄວາມຄຸ້ມຄ່າດ້ວຍຂໍ້ສະເໜີ ແລະ ສ່ວນຫຼຸດ',
            },
            {
              to: '/admin',
              icon: 'chart',
              title: 'ລະບົບຈັດການຮ້ານ (Admin Dashboard)',
              detail: 'ສຳລັບຜູ້ຈັດການ: ດູແລອໍເດີ, ເມນູ ແລະ ການຈອງໂຕະ',
            },
          ].map((item) => (
            <Link to={item.to} key={item.to} className="profile-menu-item">
              <span className="profile-item-icon">
                <Icon name={item.icon} size={24} />
              </span>
              <span className="profile-item-content">
                <strong>{item.title}</strong>
                <small>{item.detail}</small>
              </span>
              <span className="profile-item-chevron">
                <Icon name="chevron" size={20} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
