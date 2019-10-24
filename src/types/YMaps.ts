import { SET_SELECTED_ADDRESS } from "../store/constants/ymaps";

export type CoordsType = [number, number];
export type GetCoordsType = { get: (arg0: string) => CoordsType };
export type GetAddressType = {
  geocode: (
    arg0: number[]
  ) => {
    then: (
      arg0: (result: {
        geoObjects: {
          get: (
            arg0: number
          ) => {
            getThoroughfare: () => string;
            getPremiseNumber: () => string;
          };
        };
      }) => void
    ) => void;
  };
};

// Store
export interface IYMapsState {
  current_address: string;
}

export interface ISetSelectedAddress {
  type: SET_SELECTED_ADDRESS;
  payload: string;
}

export type YMapsActions = ISetSelectedAddress;
