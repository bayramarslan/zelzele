import { DateTime } from "luxon";
import { memo } from "react";

import { cx } from "@/lib/utils";

interface Props {
  date: string;
  animate?: boolean;
  delay?: number;
}

function Day({ date, animate = false, delay = 0 }: Props) {
  const dateTime = DateTime.fromISO(date, {
    zone: "Europe/Istanbul",
    locale: "tr"
  });

  return (
    <div className="sticky top-0 z-20 bg-white px-4 py-2 shadow dark:bg-zinc-900">
      <div
        className={cx(
          "mx-auto max-w-screen-md",
          animate && "animate-fade-in motion-reduce:animate-none"
        )}
        style={animate ? { animationDelay: `${delay}ms` } : undefined}
      >
        <h5 className="font-medium uppercase leading-normal opacity-80">
          {dateTime.toFormat("dd LLLL yyyy")}
        </h5>
      </div>
    </div>
  );
}

export default memo(Day);
