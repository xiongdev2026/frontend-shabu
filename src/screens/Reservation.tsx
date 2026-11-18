import {useState, type FormEvent} from 'react';
import {Link} from 'react-router-dom';
import {
  PageHeading,
  useToast,
} from '@/components/shabu/Storefront';
import {Icon} from '@/components/shabu/Icon';

export function Reservation() {
  const [reservation, setReservation] = useState<{
    name: string;
    date: string;
    time: string;
    guests: string;
  } | null>(null);
  const toast = useToast();
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Vientiane',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next = {
      name: String(data.get('name')).trim(),
      date: String(data.get('date')),
      time: String(data.get('time')),
      guests: String(data.get('guests')),
    };
    const now = new Date();
    if (
      new Date(
        `${next.date}T${next.time}:00+07:00`,
      ).getTime() <= now.getTime()
    ) {
      toast('ກະລຸນາເລືອກວັນ ແລະ ເວລາທີ່ຍັງບໍ່ຜ່ານໄປ');
      return;
    }
    try {
      localStorage.setItem(
        'nabe-demo-reservation',
        JSON.stringify(next),
      );
      setReservation(next);
    } catch {
      toast(
        'ບັນທຶກບໍ່ໄດ້. ກະລຸນາອະນຸຍາດພື້ນທີ່ຈັດເກັບຂອງບຣາວເຊີ.',
      );
    }
  };
  return (
    <div className="container page-content">
      <PageHeading
        eyebrow="SAVE A SEAT FOR HAPPINESS"
        title="ຈອງໂຕະສຳລັບຊ່ວງເວລາດີໆ"
        description="ເລືອກວັນ ຊວນຄົນໂປດ ແລ້ວມາລ້ອມວົງຄວາມແຊບດ້ວຍກັນ"
      />
      <div className="reservation-layout">
        <div className="reservation-photo">
          <img
            src="/images/shabu-hero.webp"
            alt="ຊາບູມື້ພິເສດສຳລັບທ່ານ ແລະ ຄົນທີ່ຮັກ"
          />
          <div>
            <Icon name="pot" size={34} />
            <h2>
              ມີໝໍ້ອຸ່ນໆ<br />
              ລໍຖ້າທ່ານຢູ່ສະເໝີ
            </h2>
            <p>
              Shabu ສາຂາວຽງຈັນ
              <br />
              ເປີດທຸກມື້ 11:00 – 22:00
            </p>
          </div>
        </div>
        {reservation ? (
          <div className="panel reservation-success">
            <div className="success-check">
              <Icon name="check" size={32} />
            </div>
            <h2>ຈອງໂຕະສຳເລັດແລ້ວ!</h2>
            <p>
              ທ່ານ {reservation.name} · {reservation.guests}{' '}
              ຄົນ
            </p>
            <strong>
              {new Date(
                `${reservation.date}T12:00:00+07:00`,
              ).toLocaleDateString('lo-LA', {
                dateStyle: 'long',
                timeZone: 'Asia/Vientiane',
              })}{' '}
              ເວລາ {reservation.time}
            </strong>
            <p className="demo-explanation">
              ຮ້ານໄດ້ຮັບຂໍ້ມູນການຈອງໂຕະຂອງທ່ານຮຽບຮ້ອຍແລ້ວ
              <br />
              ພະນັກງານຈະຕິດຕໍ່ຢືນຢັນກ່ອນເວລານັດໝາຍ 30 ນາທີ
            </p>
            <button
              className="button primary"
              onClick={() => setReservation(null)}
            >
              ຈອງໂຕະໃໝ່
            </button>
            <Link className="text-link" to="/shop">
              ເລືອກເບິ່ງເມນູກ່ອນໄດ້ເລີຍ{' '}
              <Icon name="arrow" size={18} />
            </Link>
          </div>
        ) : (
          <form
            className="panel form-panel reservation-form"
            onSubmit={submit}
          >
            <h2>ລາຍລະອຽດການຈອງ</h2>
            <div className="form-grid">
              <label>
                ຊື່ຜູ້ຈອງ <span>*</span>
                <input
                  name="name"
                  placeholder="ຊື່ຂອງທ່ານ"
                  autoComplete="name"
                  minLength={2}
                  maxLength={100}
                  required
                />
              </label>
              <label>
                ເບີໂທລະສັບ <span>*</span>
                <input
                  name="phone"
                  type="tel"
                  placeholder="020 XX XXX XXX"
                  pattern="[0-9 +()-]{8,20}"
                  title="ກະລຸນາກອກເບີໂທລະສັບທີ່ຖືກຕ້ອງ"
                  autoComplete="tel"
                  required
                />
              </label>
              <label>
                ວັນທີ <span>*</span>
                <input
                  type="date"
                  name="date"
                  min={today}
                  defaultValue={today}
                  required
                />
              </label>
              <label>
                ເວລາ <span>*</span>
                <select name="time" defaultValue="18:00">
                  {Array.from(
                    {length: 21},
                    (_, i) =>
                      `${11 + Math.floor(i / 2)}:${i % 2 ? '30' : '00'}`,
                  ).map((time) => (
                    <option key={time}>{time}</option>
                  ))}
                </select>
              </label>
              <label>
                ຈຳນວນຜູ້ຮ່ວມໂຕະ <span>*</span>
                <select name="guests" defaultValue="2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(
                    (number) => (
                      <option key={number} value={number}>
                        {number} ຄົນ
                      </option>
                    ),
                  )}
                </select>
              </label>
              <label>
                ສາຂາ
                <select name="branch">
                  <option>ວຽງຈັນ · ສປປ ລາວ</option>
                </select>
              </label>
              <label className="full-field">
                ໝາຍເຫດ <small>(ບໍ່ຈຳເປັນ)</small>
                <textarea
                  name="note"
                  placeholder="ເຊັ່ນ ມີເດັກນ້ອຍມາດ້ວຍ ຫຼື ຕ້ອງການຕັ່ງເດັກ"
                  maxLength={300}
                  rows={2}
                />
              </label>
            </div>
            <p className="demo-explanation">
              ກະລຸນາມາຮອດກ່ອນເວລານັດໝາຍ 10–15 ນາທີ
              ເພື່ອຄວາມສະດວກໃນການຈັດຕຽມໂຕະ
            </p>
            <button
              className="button primary full-width"
              type="submit"
            >
              ຢືນຢັນການຈອງໂຕະ <Icon name="arrow" size={18} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
