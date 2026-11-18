import { useState, useEffect } from 'react';
import { Icon } from '@/components/shabu/Icon';
import { money } from '@/data/mock';
import {
  getAdminOrders,
  updateOrderStatus,
  deleteAdminOrder,
  type AdminOrder,
  type OrderStatus,
} from '@/data/adminStore';

export function AdminOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);

  useEffect(() => {
    const refresh = () => setOrders(getAdminOrders());
    refresh();
    window.addEventListener('shabu-admin-orders-changed', refresh);
    return () => window.removeEventListener('shabu-admin-orders-changed', refresh);
  }, []);

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    const updated = updateOrderStatus(orderId, status);
    setOrders(updated);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status });
    }
  };

  const handleDelete = (orderId: string) => {
    if (window.confirm(`ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບອໍເດີ ${orderId}?`)) {
      const updated = deleteAdminOrder(orderId);
      setOrders(updated);
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(null);
      }
    }
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesTab = activeTab === 'all' || order.status === activeTab;
    const matchesQuery =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery);
    return matchesTab && matchesQuery;
  });

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'ລໍຖ້າຮັບອໍເດີ';
      case 'cooking':
        return 'ກຳລັງປຸງແຕ່ງ';
      case 'delivering':
        return 'ກຳລັງຈັດສົ່ງ';
      case 'completed':
        return 'ຈັດສົ່ງສຳເລັດ';
      case 'cancelled':
        return 'ຍົກເລີກແລ້ວ';
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="admin-page-header">
        <div className="admin-page-title-group">
          <h1>ຈັດການອໍເດີອາຫານ (POS & Orders)</h1>
          <p>ຕິດຕາມສະຖານະອໍເດີ, ຮັບອໍເດີເຂົ້າຄົວ, ກວດສອບທີ່ຢູ່ຈັດສົ່ງ ແລະ ພິມໃບບິນ</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-filter-bar">
        <div className="admin-tabs">
          <button
            className={`admin-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            ທັງໝົດ ({orders.length})
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            ລໍຖ້າຮັບ ({orders.filter((o) => o.status === 'pending').length})
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'cooking' ? 'active' : ''}`}
            onClick={() => setActiveTab('cooking')}
          >
            ກຳລັງປຸງແຕ່ງ ({orders.filter((o) => o.status === 'cooking').length})
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'delivering' ? 'active' : ''}`}
            onClick={() => setActiveTab('delivering')}
          >
            ກຳລັງຈັດສົ່ງ ({orders.filter((o) => o.status === 'delivering').length})
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            ສຳເລັດ ({orders.filter((o) => o.status === 'completed').length})
          </button>
          <button
            className={`admin-tab-btn ${activeTab === 'cancelled' ? 'active' : ''}`}
            onClick={() => setActiveTab('cancelled')}
          >
            ຍົກເລີກ ({orders.filter((o) => o.status === 'cancelled').length})
          </button>
        </div>

        <div className="admin-search-input">
          <Icon name="search" size={18} style={{ color: 'var(--adm-text-muted)', flexShrink: 0 }} />
          <input
            type="text"
            placeholder="ຄົ້ນຫາຊື່, ເບີໂທ, ລະຫັດອໍເດີ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="admin-search-clear-btn"
              onClick={() => setSearchQuery('')}
              title="ລຶບຂໍ້ຄວາມຄົ້ນຫາ"
            >
              <Icon name="close" size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Orders Table */}
      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ລະຫັດ & ເວລາ</th>
                <th>ລູກຄ້າ</th>
                <th>ຮູບແບບຮັບ</th>
                <th>ລາຍການເມນູ</th>
                <th>ຍອດຊຳລະ</th>
                <th>ສະຖານະປັດຈຸບັນ</th>
                <th>ປ່ຽນສະຖານະດ່ວນ</th>
                <th>ການຈັດການ</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>{order.id}</strong>
                    <small style={{ color: 'var(--adm-text-muted)' }}>
                      {new Date(order.createdAt).toLocaleDateString('lo-LA', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </small>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700 }}>{order.name}</div>
                    <small style={{ color: 'var(--adm-text-muted)', display: 'block' }}>
                      📞 {order.phone}
                    </small>
                    {order.note && (
                      <span
                        style={{
                          display: 'inline-block',
                          fontSize: '0.75rem',
                          background: '#fef3c7',
                          color: '#92400e',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          marginTop: '4px',
                          maxWidth: '220px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                        title={order.note}
                      >
                        ໝາຍເຫດ: {order.note}
                      </span>
                    )}
                  </td>
                  <td>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontWeight: 600,
                        fontSize: '0.825rem',
                      }}
                    >
                      <Icon name={order.mode === 'delivery' ? 'truck' : 'bag'} size={16} />
                      {order.mode === 'delivery' ? 'ຈັດສົ່ງເຖິງບ້ານ' : 'ຮັບໜ້າຮ້ານ'}
                    </span>
                    <small
                      style={{
                        display: 'block',
                        color: 'var(--adm-text-muted)',
                        fontSize: '0.75rem',
                        marginTop: '2px',
                      }}
                    >
                      {order.payment === 'bcel_qr' ? 'BCEL One QR' : 'ເງິນສົດ'}
                    </small>
                  </td>
                  <td>
                    <div style={{ maxWidth: '220px' }}>
                      <strong style={{ fontSize: '0.85rem' }}>
                        {order.items.reduce((acc, cur) => acc + (cur.quantity || 1), 0)} ລາຍການ
                      </strong>
                      <div
                        style={{
                          fontSize: '0.775rem',
                          color: 'var(--adm-text-muted)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {order.items.map((i) => i.name).join(', ')}
                      </div>
                    </div>
                  </td>
                  <td>
                    <strong style={{ fontSize: '1rem', color: 'var(--adm-primary)' }}>
                      {money(order.total)}
                    </strong>
                    {order.discount > 0 && (
                      <small style={{ display: 'block', color: 'var(--adm-success)', fontSize: '0.75rem' }}>
                        ສ່ວນຫຼຸດ -{money(order.discount)}
                      </small>
                    )}
                  </td>
                  <td>
                    <span className={`status-badge ${order.status}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      style={{
                        padding: '0.35rem 0.6rem',
                        borderRadius: '6px',
                        border: '1px solid var(--adm-border)',
                        fontSize: '0.8rem',
                        background: '#fff',
                        cursor: 'pointer',
                        fontWeight: 500,
                      }}
                    >
                      <option value="pending">ລໍຖ້າຮັບ (Pending)</option>
                      <option value="cooking">ກຳລັງປຸງ (Cooking)</option>
                      <option value="delivering">ກຳລັງສົ່ງ (Delivering)</option>
                      <option value="completed">ສຳເລັດ (Completed)</option>
                      <option value="cancelled">ຍົກເລີກ (Cancelled)</option>
                    </select>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <button
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowReceipt(true);
                        }}
                        title="ເບິ່ງໃບບິນ & ພິມ"
                      >
                        <Icon name="printer" size={15} />
                      </button>
                      <button
                        className="admin-btn admin-btn-danger admin-btn-sm"
                        onClick={() => handleDelete(order.id)}
                        title="ລຶບອໍເດີ"
                      >
                        <Icon name="trash" size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '3rem' }}>
                    <Icon
                      name="bag"
                      size={36}
                      style={{ color: 'var(--adm-border)', margin: '0 auto 0.5rem', display: 'block' }}
                    />
                    <strong style={{ color: 'var(--adm-text-muted)' }}>ບໍ່ພົບອໍເດີໃນໝວດໝູ່ນີ້</strong>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail & Receipt Print Modal */}
      {showReceipt && selectedOrder && (
        <div className="admin-modal-backdrop" onClick={() => setShowReceipt(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>ໃບບິນອໍເດີ #{selectedOrder.id}</h3>
              <button
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => setShowReceipt(false)}
              >
                <Icon name="close" size={20} />
              </button>
            </div>
            <div className="admin-modal-body">
              <div className="receipt-box" id="printable-receipt">
                <div className="receipt-header">
                  <h4>SHABU. VIENTIANE</h4>
                  <p style={{ margin: '2px 0', fontSize: '0.8rem' }}>ສາຂາວຽງຈັນ · ຖະໜົນ ໄກສອນ ພົມວິຫານ</p>
                  <p style={{ margin: '2px 0', fontSize: '0.8rem' }}>ໂທ: 020 5512 8899</p>
                  <div className="receipt-divider" />
                  <div className="receipt-line">
                    <span>ເລກທີອໍເດີ:</span>
                    <strong>{selectedOrder.id}</strong>
                  </div>
                  <div className="receipt-line">
                    <span>ວັນທີສັ່ງ:</span>
                    <span>{new Date(selectedOrder.createdAt).toLocaleString('lo-LA')}</span>
                  </div>
                  <div className="receipt-line">
                    <span>ຮູບແບບ:</span>
                    <strong>{selectedOrder.mode === 'delivery' ? '🛵 ຈັດສົ່ງເຖິງບ້ານ' : '🏪 ຮັບທີ່ໜ້າຮ້ານ'}</strong>
                  </div>
                  <div className="receipt-line">
                    <span>ຊຳລະດ້ວຍ:</span>
                    <span>{selectedOrder.payment === 'bcel_qr' ? 'BCEL One QR' : 'ເງິນສົດ'}</span>
                  </div>
                </div>

                <div style={{ marginBottom: '1rem', fontSize: '0.85rem' }}>
                  <div><strong>ລູກຄ້າ:</strong> {selectedOrder.name}</div>
                  <div><strong>ເບີໂທ:</strong> {selectedOrder.phone}</div>
                  <div><strong>ທີ່ຢູ່:</strong> {selectedOrder.address}</div>
                  {selectedOrder.note && (
                    <div style={{ color: '#b45309', marginTop: '4px' }}>
                      <strong>ໝາຍເຫດພິເສດ:</strong> {selectedOrder.note}
                    </div>
                  )}
                </div>

                <div className="receipt-divider" />

                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    <span>ລາຍການ</span>
                    <span>ລາຄາ</span>
                  </div>
                  {selectedOrder.items.map((item, idx) => (
                    <div className="receipt-line" key={idx}>
                      <span>{item.name} × {item.quantity || 1}</span>
                      <span>{money((item.price) * (item.quantity || 1))}</span>
                    </div>
                  ))}
                </div>

                <div className="receipt-divider" />

                <div className="receipt-line">
                  <span>ຍອດລວມສິນຄ້າ:</span>
                  <span>{money(selectedOrder.subtotal)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="receipt-line" style={{ color: 'green' }}>
                    <span>ສ່ວນຫຼຸດໂປຣໂມຊັນ:</span>
                    <span>-{money(selectedOrder.discount)}</span>
                  </div>
                )}
                {selectedOrder.delivery > 0 && (
                  <div className="receipt-line">
                    <span>ຄ່າຈັດສົ່ງ:</span>
                    <span>{money(selectedOrder.delivery)}</span>
                  </div>
                )}
                <div className="receipt-divider" />
                <div className="receipt-line" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                  <span>ຍອດຊຳລະສຸດທິ:</span>
                  <span style={{ color: 'var(--adm-primary)' }}>{money(selectedOrder.total)}</span>
                </div>

                <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8rem', color: '#64748b' }}>
                  ** ຂອບໃຈທີ່ເລືອກ Shabu. ຂໍໃຫ້ມີຄວາມສຸກກັບມື້ອາຫານ! **
                </div>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button
                className="admin-btn admin-btn-secondary"
                onClick={() => window.print()}
              >
                <Icon name="printer" size={16} />
                <span>ພິມໃບບິນ</span>
              </button>
              <button
                className="admin-btn admin-btn-primary"
                onClick={() => setShowReceipt(false)}
              >
                ປິດໜ້າຕ່າງ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
