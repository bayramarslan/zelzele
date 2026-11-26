"use client";

import { DateTime } from "luxon";
import { useEffect, useMemo } from "react";

import Day from "@/components/day";
import Filter from "@/components/filter";
import Row from "@/components/row";
import RowSkeleton from "@/components/row-skeleton";
import { createItems, groupByDay } from "@/lib/items";
import store from "@/stores/list";

const MAX_SKELETON_ROWS = 10;

export default function List() {
  const fetchData = store(state => state.fetchData);
  const setFilter = store(state => state.setFilter);
  const filter = store(state => state.filter);
  const loading = store(state => state.loading);
  const refreshCount = store(state => state.refreshCount);
  const data = store(state => state.data.data);

  // Veri veya filtre değişmedikçe yeniden hesaplanmaz.
  const items = useMemo(() => createItems(data), [data]);
  const grouped = useMemo(() => groupByDay(items, filter), [items, filter]);

  const visibleRowCount = useMemo(
    () =>
      Object.values(grouped).reduce((total, rows) => total + rows.length, 0),
    [grouped]
  );

  // Günler arasında kesintisiz bir sıra numarası tutulur; animasyon gecikmesi
  // listedeki ilk satırdan son satıra doğru artar.
  const rowOffsets = useMemo(() => {
    const offsets: Record<string, number> = {};
    let offset = 0;

    for (const [date, rows] of Object.entries(grouped)) {
      offsets[date] = offset;
      offset += rows.length;
    }

    return offsets;
  }, [grouped]);

  // İlk yüklemede varsayılan iskeletler gösterilir; yenilemede mevcut satır
  // sayısından fazla iskelet çizilmez.
  const skeletonCount =
    data.length === 0
      ? MAX_SKELETON_ROWS
      : Math.min(MAX_SKELETON_ROWS, visibleRowCount);

  useEffect(() => {
    const cacheFilter = localStorage.getItem("filter");

    if (cacheFilter) {
      try {
        setFilter(JSON.parse(cacheFilter));
      } catch {
        localStorage.removeItem("filter");
      }
    }

    fetchData();
  }, [fetchData, setFilter]);

  useEffect(() => {
    localStorage.setItem("filter", JSON.stringify(filter));
  }, [filter]);

  const hasData = Object.keys(grouped).length > 0;

  return (
    <div className="pb-40">
      {loading ? (
        <div className="max-h-[calc(100vh-10rem)] overflow-hidden">
          <Day date={DateTime.now().toISO()} />
          {Array.from({ length: skeletonCount }, (_, index) => (
            <RowSkeleton key={index} />
          ))}
        </div>
      ) : hasData ? (
        Object.entries(grouped).map(([key, rows]) => (
          <div key={key}>
            {rows.length > 0 && (
              <Day date={key} animate delay={rowOffsets[key] * 140} />
            )}
            {rows.map((row, index) => (
              <Row
                key={`${refreshCount}-${row.id}`}
                item={row}
                index={rowOffsets[key] + index}
              />
            ))}
          </div>
        ))
      ) : (
        <div className="py-20 text-center">
          <h4 className="text-lg font-medium">Çok şükür</h4>
          <p className="opacity-60">
            Son 100 kayıtta bu büyüklükte bir deprem bulunamadı.
          </p>
        </div>
      )}

      <Filter />
    </div>
  );
}
