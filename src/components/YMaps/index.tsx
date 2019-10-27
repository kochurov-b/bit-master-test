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
  InstancePlaceMarkType
} from "../../types/ymaps";
import { setLocation } from "../../store/actions/location";
import { ILocationState } from "../../types/store/location";

export default () => {
  const { data, select_crew, not_found } = useSelector<StoreType, ICrewsState>(
    state => state.crews
  );
  const { coords, address } = useSelector<StoreType, ILocationState>(
    state => state.location
  );
  const dispatch = useDispatch();
  const instanceYmaps = useRef<any>();
  const instancePlaceMark = useRef<InstancePlaceMarkType>();

  const handleGetAddress = (placeMark: GetAddressType, coords: CoordsType) => {
    placeMark.geocode(coords).then(result => {
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

        if (typeof address[0] !== "undefined") {
          dispatch(getCrewsRequest(coords));
        } else {
          instancePlaceMark.current &&
            instancePlaceMark.current.properties.set({
              iconCaption: "Адрес не найден!"
            });
          dispatch(clearCrews());
        }
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
          dispatch(setLocation({ coords: event.get("coords") }))
        }
        onLoad={ymapsInstance => (instanceYmaps.current = ymapsInstance)}
      >
        {coords.length !== 0 && (
          <Placemark
            key={typeof coords !== "string" ? coords.join(",") : coords}
            geometry={typeof coords !== "string" ? coords : undefined}
            options={{
              iconColor: !not_found ? "#ffbe3e" : "#ff3e3e"
            }}
            onLoad={(placeMark: GetAddressType) =>
              !address && handleGetAddress(placeMark, coords)
            }
            instanceRef={instancePlaceMark}
            modules={["geocode"]}
          />
        )}
        {data.length !== 0 &&
          data.map(crew => {
            const { crew_id, car_mark, car_model, lat, lon } = crew;
            return (
              <Placemark
                key={crew_id}
                geometry={[lat, lon]}
                properties={{
                  iconCaption:
                    crew_id === select_crew && `${car_mark} ${car_model}`,
                  id: crew_id
                }}
                options={{
                  iconColor: "#00d600"
                }}
                onClick={(event: GetPlaceMarkIdType) =>
                  dispatch(selectCrew(event.get("target").properties.get("id")))
                }
              />
            );
          })}

        <ZoomControl options={{ float: "right" }} />
      </Map>
    </YMaps>
  );
};
