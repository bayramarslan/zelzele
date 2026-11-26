"use client";

import { DateTime } from "luxon";
import { useEffect, useMemo } from "react";

import Day from "@/components/day";
import Filter from "@/components/filter";
import Row from "@/components/row";
import RowSkeleton from "@/components/row-skeleton";
import { createItems, groupByDay } from "@/lib/items";
import store from "@/stores/list";

const SKELETON_ROWS = Array.from({ length: 10 }, (_, index) => index);

export default function List() {
  const fetchData = store(state => state.fetchData);
  const setFilter = store(state => state.setFilter);
  const filter = store(state => state.filter);
  const loading = store(state => state.loading);
  const data = store(state => state.data.data);

  // Veri veya filtre değişmedikçe yeniden hesaplanmaz.
  const items = useMemo(() => createItems(data), [data]);
  const grouped = useMemo(() => groupByDay(items, filter), [items, filter]);

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
        <div>
          <Day date={DateTime.now().toISO()} />
          {SKELETON_ROWS.map(index => (
            <RowSkeleton key={index} />
          ))}
        </div>
      ) : hasData ? (
        Object.entries(grouped).map(([key, rows]) => (
          <div key={key}>
            {rows.length > 0 && <Day date={key} />}
            {rows.map(row => (
              <Row key={row.id} item={row} />
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
