import React, { useState } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";

import { CoordsType, GetCoordsType } from "../../types/YMaps";

export default () => {
  const [coords, setCoords] = useState<CoordsType | []>([]);

  const handleGetCoords = (event: GetCoordsType) => {
    setCoords(event.get("coords"));
  };

  return (
    <YMaps
      query={{
        apikey: "f1e5e6c7-a738-4d2b-b815-9afd5b41f76d"
      }}
    >
      <Map
        onClick={(event: GetCoordsType) => handleGetCoords(event)}
        defaultState={{ center: [56.84976, 53.20448], zoom: 12 }}
        width={700}
        height={450}
      >
        <Placemark key={coords.join(",")} geometry={coords} />
      </Map>
    </YMaps>
  );
};
