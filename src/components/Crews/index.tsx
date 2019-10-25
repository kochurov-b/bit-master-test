import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { StoreType } from "../../store";
import { ICrew } from "../../types/store/crews";
import Crew from "./Crew";
import { selectCrew } from "../../store/actions/crews";

import "./styles.css";

export default () => {
  const crews = useSelector<StoreType, Array<ICrew>>(state => state.crews.data);
  const locationNotFound = useSelector<StoreType, boolean>(
    state => state.location.notFound
  );
  const selectedCrew = useSelector<StoreType, number | null>(
    state => state.crews.select_crew
  );
  const dispatch = useDispatch();

  return (
    <div className="crews">
      {crews.length !== 0 && !locationNotFound ? (
        <ul className="crews__list">
          {crews.map(crew => {
            const { crew_id, car_mark, car_model, car_color, distance } = crew;
            return (
              <li key={crew_id.toString()} className="crews__item">
                <Crew
                  className={selectedCrew === crew_id ? "_selected-crew" : ""}
                  mark={car_mark}
                  model={car_model}
                  color={car_color}
                  distance={distance}
                  onClick={() => dispatch(selectCrew(crew_id))}
                />
              </li>
            );
          })}
        </ul>
      ) : crews.length === 0 && !locationNotFound ? (
        <span className="crews__prompt">
          Выберите место на карте или заполните поле "Откуда", чтобы увидеть
          подходящие автомобили!
        </span>
      ) : (
        <span className="crews__prompt">Нет подходящих автомобилей</span>
      )}
    </div>
  );
};
