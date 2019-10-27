import { action } from "typesafe-actions";

import { ELocationTypes } from "../../types/store/location";
import { CoordsType } from "../../types/ymaps";

export interface ISetLocationArgsType {
  coords: CoordsType | string;
  address?: string;
}

export const setLocation = (coords: CoordsType | string) =>
  action(ELocationTypes.SET_LOCATION, coords);

export const updateAddress = (address: string) =>
  action(ELocationTypes.UPDATE_ADDRESS, address);
