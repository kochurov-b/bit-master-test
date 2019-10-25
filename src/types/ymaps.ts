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
export type GetPlaceMarkIdType = {
  get: (arg0: string) => { properties: { get: (arg0: string) => number } };
};
