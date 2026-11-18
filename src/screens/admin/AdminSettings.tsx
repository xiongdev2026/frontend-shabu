import { useState, type FormEvent } from 'react';
import { Icon } from '@/components/shabu/Icon';
import {
  getStoreSettings,
  saveStoreSettings,
  resetDemoData,
  type StoreSettings,
} from '@/data/adminStore';

export function AdminSettings() {
  const [settings, setSettings] = useState<StoreSettings>(getStoreSettings());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const next: StoreSettings = {
      isOpen: settings.isOpen,
      storeName: String(form.get('storeName')).trim(),
      branch: String(form.get('branch')).trim(),
      phone: String(form.get('phone')).trim(),
      address: String(form.get('address')).trim(),
      openTime: String(form.get('openTime')).trim(),
      closeTime: String(form.get('closeTime')).trim(),
      standardDeliveryFee: Number(form.get('standardDeliveryFee')) || 49,
      freeDeliveryThreshold: Number(form.get('freeDeliveryThreshold')) || 999,
    };
    saveStoreSettings(next);
    setSettings(next);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetData = () => {
    if (
      window.confirm(
        'ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການຣີເຊັດຂໍ້ມູນທັງໝົດ? ລະບົບຈະຄືນຄ່າອໍເດີ ແລະ ເມນູເລີ່ມຕົ້ນທັງໝົດ.',
      )
    ) {
      resetDemoData();
      setSettings(getStoreSettings());
      alert('ຣີເຊັດຂໍ້ມູນຕົວຢ່າງສຳເລັດແລ້ວ!');
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="admin-page-header">
        <div className="admin-page-title-group">
          <h1>ຕັ້ງຄ່າຮ້ານຄ້າ (Store Settings)</h1>
          <p>ຈັດການຂໍ້ມູນທົ່ວໄປ, ເວລາເປີດ-ປິດ, ຄ່າຈັດສົ່ງ ແລະ ລະບົບທົດສອບ</p>
        </div>
      </div>

      {savedSuccess && (
        <div
          style={{
            padding: '1rem 1.25rem',
            background: '#ecfdf5',
            color: '#065f46',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            border: '1px solid #a7f3d0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 600,
          }}
        >
          <Icon name="check" size={20} />
          ບັນທຶກການຕັ້ງຄ່າສຳເລັດຮຽບຮ້ອຍແລ້ວ!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="admin-card">
          <div className="admin-card-header">
            <h2>
              <Icon name="store" size={20} />
              <span>ຂໍ້ມູນທົ່ວໄປຂອງຮ້ານ</span>
            </h2>
          </div>
          <div className="admin-card-body">
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>ຊື່ຮ້ານອາຫານ *</label>
                <input type="text" name="storeName" defaultValue={settings.storeName} required />
              </div>
              <div className="admin-form-group">
                <label>ສາຂາ *</label>
                <input type="text" name="branch" defaultValue={settings.branch} required />
              </div>
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>ເບີໂທລະສັບຮ້ານ *</label>
                <input type="text" name="phone" defaultValue={settings.phone} required />
              </div>
              <div className="admin-form-group">
                <label>ທີ່ຢູ່ຮ້ານ *</label>
                <input type="text" name="address" defaultValue={settings.address} required />
              </div>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <h2>
              <Icon name="clock" size={20} />
              <span>ເວລາເປີດ-ປິດ ແລະ ການຈັດສົ່ງ</span>
            </h2>
          </div>
          <div className="admin-card-body">
            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>ເວລາເປີດຮ້ານ</label>
                <input type="time" name="openTime" defaultValue={settings.openTime} />
              </div>
              <div className="admin-form-group">
                <label>ເວລາປິດຮ້ານ</label>
                <input type="time" name="closeTime" defaultValue={settings.closeTime} />
              </div>
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label>ຄ່າຈັດສົ່ງມາດຕະຖານ (ພັນກີບ, ເຊັ່ນ 49 = 49,000₭)</label>
                <input
                  type="number"
                  name="standardDeliveryFee"
                  defaultValue={settings.standardDeliveryFee}
                  min="0"
                />
              </div>
              <div className="admin-form-group">
                <label>ຍອດສັ່ງຊື້ຂັ້ນຕ່ຳເພື່ອສົ່ງຟຣີ (ພັນກີບ, ເຊັ່ນ 999 = 999,000₭)</label>
                <input
                  type="number"
                  name="freeDeliveryThreshold"
                  defaultValue={settings.freeDeliveryThreshold}
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginBottom: '2.5rem' }}>
          <button type="submit" className="admin-btn admin-btn-primary" style={{ padding: '0.75rem 2rem' }}>
            <Icon name="check" size={18} />
            <span>ບັນທຶກການຕັ້ງຄ່າ</span>
          </button>
        </div>
      </form>

      {/* Demo Data Management */}
      <div className="admin-card" style={{ borderColor: '#fecaca' }}>
        <div className="admin-card-header" style={{ background: '#fef2f2' }}>
          <h2 style={{ color: '#b91c1c' }}>
            <Icon name="refresh" size={18} />
            <span>ຈັດການຂໍ້ມູນທົດສອບ (Demo Data Tools)</span>
          </h2>
        </div>
        <div className="admin-card-body">
          <p style={{ color: 'var(--adm-text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            ຫາກທ່ານຕ້ອງການທົດສອບລະບົບໃໝ່ ຫຼື ຕ້ອງການຣີເຊັດອໍເດີຕົວຢ່າງ ແລະ ເມນູເລີ່ມຕົ້ນ, ສາມາດກົດປຸ່ມດ້ານລຸ່ມນີ້.
          </p>
          <button
            type="button"
            className="admin-btn admin-btn-danger"
            onClick={handleResetData}
          >
            <Icon name="refresh" size={16} />
            <span>ຣີເຊັດຂໍ້ມູນຕົວຢ່າງ (Reset All Demo Data)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
