import React from "react";
import { useSelector } from "react-redux";

import { StoreType } from "../../store";
import { ICrew } from "../../types/store/crews";
import Crew from "./Crew";

import "./styles.css";

export default () => {
  const crews = useSelector<StoreType, Array<ICrew>>(state => state.crews.data);
  const locationNotFound = useSelector<StoreType, boolean>(
    state => state.location.notFound
  );

  const selectCrew = useSelector<StoreType, number | null>(
    state => state.crews.select_crew
  );

  return (
    <div className="crews">
      <ul className="crews__list">
        {crews.length !== 0 &&
          !locationNotFound &&
          crews.map(crew => {
            const { crew_id, car_mark, car_model, car_color, distance } = crew;
            return (
              <li key={crew_id.toString()} className="crew__item">
                <Crew
                  className={selectCrew === crew_id ? "_selected-crew" : ""}
                  mark={car_mark}
                  model={car_model}
                  color={car_color}
                  distance={distance}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
};