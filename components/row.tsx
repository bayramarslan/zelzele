import { memo } from "react";

import { Item } from "@/lib/types";
import { cx } from "@/lib/utils";
import store from "@/stores/list";

const STYLE_CONTAINER = {
  "1": "from-zinc-100 bg-gradient-to-l text-zinc-900 dark:from-zinc-800/70 dark:text-zinc-100", // 1-1,9
  "2": "from-zinc-100 bg-gradient-to-l text-zinc-900 dark:from-zinc-800/90 dark:text-zinc-100", // 2-2,9
  "3": "from-zinc-100 bg-gradient-to-l text-zinc-900 dark:from-zinc-800/80 dark:text-zinc-100", // 3-3,9
  "4": "from-yellow-100 bg-gradient-to-l text-yellow-900 dark:from-yellow-900/60 dark:text-yellow-100", // 4-4,9
  "5": "from-orange-100 bg-gradient-to-l text-orange-900 dark:from-orange-900/70 dark:text-orange-100", // 5-5,9
  "6": "from-red-100 bg-gradient-to-l text-red-900 dark:from-red-900/80 dark:text-red-100", // 6-6,9
  "7": "from-pink-100 bg-gradient-to-l text-pink-900 dark:from-pink-900/80 dark:text-pink-100" // 7+
} as const;

interface Props {
  item: Item;
  index?: number;
}

function Row({ item, index = 0 }: Props) {
  // Sadece kararlı `setCity` aksiyonuna abone olunur; filtre değiştiğinde
  // tüm satırların yeniden render edilmesi önlenir.
  const setCity = store(state => state.setCity);
  const dateTime = item.dateTimeObj;

  return (
    <div className="pt-1">
      <div
        className={cx(
          "p-4 md:p-5",
          STYLE_CONTAINER[item.magnitudeFloor as keyof typeof STYLE_CONTAINER]
        )}
      >
        <div
          className={cx(
            "mx-auto flex max-w-screen-md items-baseline gap-4 md:gap-5",
            "animate-fade-in motion-reduce:animate-none"
          )}
          style={{ animationDelay: `${index * 140}ms` }}
        >
          {/**/}

          {/* magnitude */}
          <div className="rounded-xl bg-black/5 px-2 py-1 dark:bg-white/10">
            <span className="text-xl font-bold tabular-nums md:text-2xl">
              {Number(item.magnitude).toFixed(1)}
            </span>
          </div>

          {/* body */}
          <div className="flex flex-col">
            {/**/}

            {/* province */}
            <button
              className="text-xl font-bold md:text-2xl"
              onClick={() => setCity(item.province || item.location)}
            >
              {item.province || item.location}
            </button>

            {/* district */}
            <h5 className="text-xl opacity-60">{item.district || "-"}</h5>

            {/* meta */}
            <div className="flex items-center gap-1 opacity-60 md:mt-0.5">
              <span>{item.depth} km</span>
              <span className="opacity-40">•</span>
              <time dateTime={item.date}>{dateTime.toFormat("HH:mm")}</time>
              <span className="opacity-40">•</span>
              <span>{dateTime.toRelative()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Row);
