import React, { useRef } from "react";
import { YMaps, Map, Placemark, ZoomControl } from "react-yandex-maps";
import { useDispatch, useSelector } from "react-redux";

import {
  getCrewsRequest,
  selectCrew,
  clearCrews
} from "../../store/actions/crews";
import { StoreType } from "../../store";
import { ICrewsState } from "../../types/store/crews";
import {
  CoordsType,
  GetCoordsType,
  GetAddressType,
  GetPlaceMarkIdType,
  InstancePlaceMarkType,
  IGetCoordinates
} from "../../types/ymaps";
import { setLocation, updateAddress } from "../../store/actions/location";
import { ILocationState } from "../../types/store/location";

export default () => {
  const { data, select_crew, not_found } = useSelector<StoreType, ICrewsState>(
    state => state.crews
  );
  const { coords } = useSelector<StoreType, ILocationState>(
    state => state.location
  );
  const dispatch = useDispatch();
  const instanceYmaps = useRef<any>();
  const instancePlaceMark = useRef<InstancePlaceMarkType>();

  const checkValidAddress = (address: Array<string>, coords: CoordsType) => {
    const placeMark = instancePlaceMark.current;
    if (placeMark) {
      if (
        typeof address[0] === "undefined" ||
        typeof address[1] === "undefined"
      ) {
        placeMark.properties.set({
          iconCaption: "Адрес не найден!"
        });
        dispatch(updateAddress(""));
        dispatch(clearCrews());
      } else {
        dispatch(updateAddress(address.join(", ")));
        dispatch(getCrewsRequest(coords));
      }
    }
  };

  const handleGetAddress = (coords: CoordsType) => {
    instanceYmaps.current.geocode(coords).then((result: any) => {
      const firstGeoObject = result.geoObjects.get(0);

      if (instancePlaceMark.current && typeof coords === "string") {
        const map = instancePlaceMark.current.getMap();
        const bounds = firstGeoObject.properties.get("boundedBy");
        const stateMap = instanceYmaps.current.util.bounds.getCenterAndZoom(
          bounds,
          map && map.container.getSize()
        );

        if (map) {
          map.setCenter(stateMap.center, stateMap.zoom);
          instancePlaceMark.current.geometry.setCoordinates(stateMap.center);
          dispatch(getCrewsRequest(coords));
        }
      } else {
        const address: Array<string> = [
          firstGeoObject.getThoroughfare(),
          firstGeoObject.getPremiseNumber()
        ];
        checkValidAddress(address, coords);
      }
    });
  };

  return (
    <YMaps
      query={{
        apikey: "f1e5e6c7-a738-4d2b-b815-9afd5b41f76d",
        load: "util.bounds"
      }}
    >
      <Map
        defaultState={{ center: [56.84976, 53.20448], zoom: 13 }}
        width={750}
        height={450}
        onClick={(event: GetCoordsType) =>
          dispatch(setLocation(event.get("coords")))
        }
        onLoad={ymapsInstance => (instanceYmaps.current = ymapsInstance)}
      >
        {coords.length !== 0 && (
          <Placemark
            key={typeof coords !== "string" ? coords.join(",") : coords}
            geometry={typeof coords !== "string" ? coords : undefined}
            options={{
              iconColor: !not_found ? "#ffbe3e" : "#ff3e3e",
              draggable: true
            }}
            onDragEnd={(event: IGetCoordinates) => {
              handleGetAddress(event.get("target").geometry.getCoordinates());
            }}
            onLoad={() => handleGetAddress(coords)}
            instanceRef={instancePlaceMark}
            modules={["geocode"]}
          />
        )}
        {data.length !== 0 &&
          data.map(crew => {
            const { crew_id, car_mark, car_model, lat, lon, distance } = crew;
            return (
              <Placemark
                key={crew_id}
                geometry={[lat, lon]}
                properties={{
                  id: crew_id,
                  hintContent: `${car_mark} ${car_model}, ${distance}м`,
                  iconCaption:
                    crew_id === select_crew && `${car_mark} ${car_model}`
                }}
                options={{
                  iconColor: "#00d600"
                }}
                onClick={(event: GetPlaceMarkIdType) =>
                  dispatch(selectCrew(event.get("target").properties.get("id")))
                }
                modules={["geoObject.addon.hint"]}
              />
            );
          })}

        <ZoomControl options={{ float: "right" }} />
      </Map>
    </YMaps>
  );
};
