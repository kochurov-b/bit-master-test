export enum ECrewsTypes {
  GET_CREWS_REQUEST = "GET_CREWS_REQUEST",
  GET_CREWS_SUCCESS = "GET_CREWS_SUCCESS",
  GET_CREWS_FAILURE = "GET_CREWS_FAILURE"
}

export interface ICrew {
  crew_id: number;
  car_mark: string;
  car_model: string;
  car_color: string;
  car_number: string;
  driver_name: string;
  driver_phone: string;
  lat: number;
  lon: number;
  distance: number;
}

export interface ICrewsState {
  loading: boolean;
  error: string;
  data: Array<ICrew>;
}
