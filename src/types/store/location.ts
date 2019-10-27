import { CoordsType } from "../../types/ymaps";

export enum ELocationTypes {
  SET_LOCATION = "SET_LOCATION",
  UPDATE_ADDRESS = "UPDATE_ADDRESS"
}

export interface ILocationState {
  coords: CoordsType | [];
  address: string;
}
