import { action } from "typesafe-actions";

import { ELocationTypes } from "../../types/store/location";
import { CoordsType } from "../../types/ymaps";

export interface ISetLocationArgsType {
  coords: CoordsType | string;
  address?: string;
}

export const setLocation = ({ coords, address }: ISetLocationArgsType) =>
  action(ELocationTypes.SET_LOCATION, {
    coords,
    address
  });
