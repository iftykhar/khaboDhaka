export interface BarikoiPlace {
  id: number;
  address: string;
  area: string;
  city: string;
  latitude: string;
  longitude: string;
  pcode?: number;
  uCode?: string;
  type?: string;
}

export interface BarikoiSearchResponse {
  places: BarikoiPlace[];
  message: string;
  status: number;
}
