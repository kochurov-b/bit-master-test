export type CoordsType = [number, number];

export interface GetCoordsType {
  get: (arg0: string) => CoordsType;
}

export interface GetAddressType {
  geocode: (
    arg0: number[]
  ) => {
    then: (
      arg0: (result: {
        geoObjects: {
          get: (
            arg0: number
          ) => {
            properties: {
              get: (parameter: string) => Array<CoordsType>;
            };
            getThoroughfare: () => string;
            getPremiseNumber: () => string;
          };
        };
      }) => void
    ) => void;
  };
}

export interface GetPlaceMarkIdType {
  get: (arg0: string) => { properties: { get: (arg0: string) => number } };
}

interface IPropertiesSet {
  iconCaption: string;
}

export interface InstancePlaceMarkType {
  properties: {
    set: ({ iconCaption }: IPropertiesSet) => void;
  };
  geometry: {
    setCoordinates: (coords: CoordsType) => void;
  };
  getMap: () => {
    container: {
      getSize: () => [number, number];
    };
    setCenter: (center: CoordsType, zoom: number) => void;
    getCenter: () => CoordsType;
  };
}

export interface IGetCoordinates {
  get: (arg0: string) => { geometry: { getCoordinates: () => CoordsType } };
}
