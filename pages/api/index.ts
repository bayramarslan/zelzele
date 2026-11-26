import { DateTime } from "luxon";
import type { NextApiRequest, NextApiResponse } from "next";

import type { ItemProps } from "@/lib/types";

const AFAD_URL = "https://deprem.afad.gov.tr/apiv2/event/filter";
const MAX_ITEMS = 100;
const REQUEST_TIMEOUT_MS = 8000;

interface AfadEvent {
  eventID?: string | number;
  id?: string | number;
  date: string;
  depth: string | number;
  latitude: string | number;
  longitude: string | number;
  magnitude: string | number;
  location?: string;
  province?: string;
  district?: string;
  type?: string;
}

/**
 * AFAD sayısal alanları string döndürüyor ve olay kimliği `eventID` adıyla
 * geliyor. İstemciye temiz, tipli ve daha küçük bir yük göndermek için
 * normalize edilir.
 */
function toItem(event: AfadEvent): ItemProps {
  return {
    id: Number(event.eventID ?? event.id),
    date: event.date,
    depth: Number(event.depth),
    latitude: Number(event.latitude),
    longitude: Number(event.longitude),
    magnitude: Number(event.magnitude),
    location: event.location ?? "",
    province: event.province ?? "",
    district: event.district ?? "",
    type: event.type ?? ""
  };
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const format = "yyyy-MM-dd'T'HH:mm:ss";
  const date = DateTime.now();
  const start = date.minus({ days: 2 }).toFormat(format);
  const end = date.toFormat(format);

  const url = new URL(AFAD_URL);
  url.searchParams.set("start", start);
  url.searchParams.set("end", end);
  url.searchParams.set("orderby", "timedesc");
  url.searchParams.set("minmag", "3");

  // AFAD yanıt vermezse serverless fonksiyonun asılı kalmasını engeller.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url.toString(), {
      signal: controller.signal,
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      return res.status(502).json({
        error: `AFAD API HTTP ${response.status}`
      });
    }

    const data = await response.json();
    const items = Array.isArray(data)
      ? (data as AfadEvent[]).slice(0, MAX_ITEMS).map(toItem)
      : [];

    // 60 sn taze veri, sonrasında arka planda yenilenerek 5 dk bayat veri.
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=300"
    );

    return res.status(200).json({
      lastUpdate: new Date().toISOString(),
      data: items
    });
  } catch {
    return res.status(502).json({
      error: "AFAD API verileri alınamadı."
    });
  } finally {
    clearTimeout(timeout);
  }
}
