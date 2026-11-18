import {useMemo, useState} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import {categories, type MenuCategory} from '@/data/mock';
import {useGetDishes} from '@/hooks/useGetDishes';
import {MenuCard} from './MenuCard';
import {EmptyState} from './Storefront';
import {Icon} from './Icon';

export function MenuBrowser({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [params, setParams] = useSearchParams();
  const [localCategory, setLocalCategory] =
    useState<MenuCategory>('all');
  const {dishes} = useGetDishes();
  const categoryParam = params.get('category') ?? 'all';
  const category = compact
    ? localCategory
    : categories.some((item) => item.id === categoryParam)
      ? categoryParam
      : 'all';
  const query = compact ? '' : (params.get('q') ?? '');
  const sort = params.get('sort') ?? 'recommended';
  const changeParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, {replace: true});
  };
  const filtered = useMemo(() => {
    let result = dishes.filter(
      (dish) =>
        (category === 'all' ||
          dish.category === category) &&
        `${dish.name} ${dish.english} ${dish.description}`
          .toLowerCase()
          .includes(query.toLowerCase().trim()),
    );
    if (!compact && sort === 'price-low')
      result = [...result].sort(
        (a, b) => a.price - b.price,
      );
    else if (!compact && sort === 'price-high')
      result = [...result].sort(
        (a, b) => b.price - a.price,
      );
    return compact ? result.slice(0, 8) : result;
  }, [dishes, category, query, sort, compact]);
  return (
    <>
      {!compact && (
        <div className="menu-toolbar">
          <label className="search-field">
            <Icon name="search" size={20} />
            <input
              type="search"
              aria-label="ຄົ້ນຫາເມນູ"
              placeholder="ຄົ້ນຫາເມນູທີ່ຢາກກິນ ເຊັ່ນ ວາກິວ, ຊຸດຊາບູ…"
              value={query}
              onChange={(event) =>
                changeParam('q', event.target.value)
              }
            />
          </label>
          <label className="sort-field">
            <span>ລຽງຕາມ</span>
            <select
              aria-label="ລຽງລຳດັບເມນູ"
              value={sort}
              onChange={(event) =>
                changeParam('sort', event.target.value)
              }
            >
              <option value="recommended">ເມນູແນະນຳ</option>
              <option value="price-low">
                ລາຄາຕ່ຳຫາສູງ
              </option>
              <option value="price-high">
                ລາຄາສູງຫາຕ່ຳ
              </option>
            </select>
          </label>
        </div>
      )}
      <div
        className="category-tabs"
        role="group"
        aria-label="ໝວດໝູ່ອາຫານ"
      >
        {categories.map((item) => (
          <button
            key={item.id}
            className={
              category === item.id ? 'selected' : ''
            }
            aria-pressed={category === item.id}
            onClick={() =>
              compact
                ? setLocalCategory(item.id)
                : changeParam(
                    'category',
                    item.id === 'all' ? '' : item.id,
                  )
            }
          >
            <Icon name={item.icon} size={22} />
            <span>{item.name}</span>
          </button>
        ))}
      </div>
      {!compact && (
        <div className="menu-result-label">
          <span>
            {
              categories.find(
                (item) => item.id === category,
              )?.name
            }
            <b>{filtered.length} ເມນູ</b>
          </span>
          {query && (
            <button
              className="text-link"
              onClick={() => changeParam('q', '')}
            >
              ລ້າງການຄົ້ນຫາ <Icon name="close" size={14} />
            </button>
          )}
        </div>
      )}
      {filtered.length ? (
        <div className="menu-grid">
          {filtered.map((dish) => (
            <MenuCard key={dish.id} dish={dish} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="search"
          title="ຍັງບໍ່ພົບເມນູທີ່ຄົ້ນຫາ"
          description="ລອງໃຊ້ຄຳຄົ້ນອື່ນ ຫຼື ເລືອກເບິ່ງໝວດອື່ນໄດ້ເລີຍ"
        />
      )}
      {compact && (
        <div className="view-all-row">
          <Link
            className="button secondary"
            to={
              category === 'all'
                ? '/shop'
                : `/shop?category=${category}`
            }
          >
            ເບິ່ງເມນູທັງໝົດ <Icon name="arrow" size={18} />
          </Link>
        </div>
      )}
    </>
  );
}
