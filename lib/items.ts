import { DateTime } from "luxon";

import { type DataByDay, type Filter, Item, type ItemProps } from "@/lib/types";

const DATE_OPTIONS = {
  zone: "Europe/Istanbul",
  locale: "tr"
} as const;

/**
 * Ham AFAD kayıtlarını bir kez `Item` nesnelerine dönüştürür.
 * Böylece aynı nesneler filtre değişimlerinde yeniden kullanılabilir ve
 * `React.memo` gereksiz satır render'larını engelleyebilir.
 */
export function createItems(rows: ItemProps[]): Item[] {
  return rows.map(row => {
    const date = DateTime.fromISO(row.date, DATE_OPTIONS).plus({ hours: 3 });

    return new Item({ ...row, date: date.toISO() });
  });
}

/** Depremleri güne göre gruplar ve aktif filtreyi uygular. */
export function groupByDay(items: Item[], filter: Filter): DataByDay {
  const groups: DataByDay = {};

  for (const item of items) {
    if (item.magnitude < filter.hide) continue;

    const city = item.province || item.location;
    if (filter.city && city !== filter.city) continue;

    const day = groups[item.dayKey];

    if (day) {
      day.push(item);
    } else {
      groups[item.dayKey] = [item];
    }
  }

  return groups;
}
