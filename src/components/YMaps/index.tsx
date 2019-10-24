import React from "react";
import { YMaps, Map } from "react-yandex-maps";

export default () => {
  return (
    <YMaps
      query={{
        apikey: "f1e5e6c7-a738-4d2b-b815-9afd5b41f76d"
      }}
    >
      <Map
        defaultState={{ center: [56.84976, 53.20448], zoom: 12 }}
        width={700}
        height={450}
      />
    </YMaps>
  );
};
