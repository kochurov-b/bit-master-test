import { action } from "typesafe-actions";

import { ELocationTypes } from "../../types/store/location";
import { CoordsType } from "../../types/ymaps";

export const setLocation = (coords: CoordsType, notFound: boolean) =>
  action(ELocationTypes.SET_LOCATION, {
    coords,
    notFound
  });
