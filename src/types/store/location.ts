import { CoordsType } from "../../types/ymaps";

export enum ELocationTypes {
  SET_LOCATION = "SET_LOCATION"
}

export interface ILocationState {
  coords: CoordsType | [];
  notFound: boolean;
}
