import { DateTime } from "luxon";

export type Filter = {
  hide: number;
  city?: string | null;
};

export type Data = {
  lastUpdate: string;
  data: ItemProps[];
};

export type DataByDay = Record<string, Item[]>; // YYYY-MM-DD

export interface ItemProps {
  date: string;
  depth: number;
  id: number;
  latitude: number;
  location: string;
  province: string;
  district: string;
  longitude: number;
  magnitude: number;
  type: string;
}

const DATE_OPTIONS = {
  zone: "Europe/Istanbul",
  locale: "tr"
} as const;

export class Item {
  public date: string;
  public depth: number;
  public id: number;
  public latitude: number;
  public location: string;
  public province: string;
  public district: string;
  public longitude: number;
  public magnitude: number;
  public type: string;

  // Türetilmiş değerler bir kez hesaplanır; render sırasında tekrar
  // hesaplanması hem CPU hem de çöp toplama maliyeti oluşturuyordu.
  public readonly magnitudeFloor: string;
  public readonly dateTimeObj: DateTime;
  public readonly dayKey: string;

  constructor({
    date,
    depth,
    id,
    latitude,
    location,
    province,
    district,
    longitude,
    magnitude,
    type
  }: ItemProps) {
    this.date = date;
    this.depth = depth;
    this.id = id;
    this.latitude = latitude;
    this.location = location;
    this.province = province;
    this.district = district;
    this.longitude = longitude;
    this.magnitude = magnitude;
    this.type = type;

    this.magnitudeFloor = Math.floor(this.magnitude).toString();
    this.dateTimeObj = DateTime.fromISO(this.date, DATE_OPTIONS);
    this.dayKey = this.dateTimeObj.startOf("day").toISODate() ?? "";
  }
}
