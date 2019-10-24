import React, { useState } from "react";
import { YMaps, Map, Placemark, ZoomControl } from "react-yandex-maps";
import { useDispatch, useSelector } from "react-redux";

import { getCrewsRequest } from "../../store/actions/crews";
import { StoreType } from "../../store";
import { ICrew } from "../../types/store/crews";
import { CoordsType, GetCoordsType, GetAddressType } from "../../types/ymaps";

export default () => {
  const [coords, setCoords] = useState<CoordsType | []>([]);
  const [notFound, setNotFound] = useState<string>("");
  const crews = useSelector<StoreType, Array<ICrew>>(state => state.crews.data);
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
        dispatch(getCrewsRequest(coords));
        setNotFound("");
      } else {
        setNotFound("Адрес не найден!");
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
              iconCaption: notFound
            }}
            options={{
              iconColor: !notFound ? "#ffbe3e" : "#ff3e3e"
            }}
            onLoad={(placeMark: GetAddressType) =>
              handleGetAddress(placeMark, coords)
            }
            modules={["geocode"]}
          />
        )}

        {crews.length !== 0 &&
          !notFound &&
          crews.map(crew => (
            <Placemark
              key={crew.crew_id}
              geometry={[crew.lat, crew.lon]}
              options={{
                preset: "islands#greenStretchyIcon"
              }}
            />
          ))}

        <ZoomControl options={{ float: "right" }} />
      </Map>
    </YMaps>
  );
};
