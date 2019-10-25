import React, { useState } from "react";
import { YMaps, Map, Placemark, ZoomControl } from "react-yandex-maps";
import { useDispatch, useSelector } from "react-redux";

import { getCrewsRequest, selectCrew } from "../../store/actions/crews";
import { StoreType } from "../../store";
import { ICrew } from "../../types/store/crews";
import {
  CoordsType,
  GetCoordsType,
  GetAddressType,
  GetPlaceMarkId
} from "../../types/ymaps";
import { setLocation } from "../../store/actions/location";

export default () => {
  const [coords, setCoords] = useState<CoordsType | []>([]);
  const crews = useSelector<StoreType, Array<ICrew>>(state => state.crews.data);
  const locationNotFound = useSelector<StoreType, boolean>(
    state => state.location.notFound
  );
  const dispatch = useDispatch();

  const handleGetCoords = (event: GetCoordsType) => {
    setCoords(event.get("coords"));
  };

  const handleGetAddress = (placeMark: GetAddressType, coords: CoordsType) => {
    placeMark.geocode(coords).then(result => {
      const firstGeoObject = result.geoObjects.get(0);

      const address: Array<string> = [
        firstGeoObject.getThoroughfare(),
        firstGeoObject.getPremiseNumber()
      ];

      if (typeof address[0] !== "undefined") {
        dispatch(setLocation(coords, false));
        dispatch(getCrewsRequest(coords));
      } else {
        dispatch(setLocation(coords, true));
      }
    });
  };

  return (
    <YMaps
      query={{
        apikey: "f1e5e6c7-a738-4d2b-b815-9afd5b41f76d"
      }}
    >
      <Map
        onClick={(event: GetCoordsType) => handleGetCoords(event)}
        defaultState={{ center: [56.84976, 53.20448], zoom: 13 }}
        width={700}
        height={450}
      >
        {coords.length !== 0 && (
          <Placemark
            key={coords.join(",")}
            geometry={coords}
            properties={{
              iconCaption: locationNotFound && "Адрес не найден!"
            }}
            options={{
              iconColor: !locationNotFound ? "#ffbe3e" : "#ff3e3e"
            }}
            onLoad={(placeMark: GetAddressType) =>
              handleGetAddress(placeMark, coords)
            }
            modules={["geocode"]}
          />
        )}
        {crews.length !== 0 &&
          !locationNotFound &&
          crews.map(crew => {
            const { crew_id, lat, lon } = crew;
            return (
              <Placemark
                key={crew_id}
                geometry={[lat, lon]}
                options={{
                  preset: "islands#greenStretchyIcon"
                }}
                properties={{
                  id: crew_id
                }}
                onClick={(event: GetPlaceMarkId) =>
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
