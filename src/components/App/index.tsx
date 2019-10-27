import React from "react";
import { useSelector } from "react-redux";

import YMaps from "../YMaps";
import Crews from "../Crews";
import Autocomplete from "../Autocomplete";
import Button from "../Button";
import { StoreType } from "../../store";
import { ILocationState } from "../../types/store/location";
import { ICrewsState } from "../../types/store/crews";

import "./styles.css";

const App: React.FC = () => {
  const { address } = useSelector<StoreType, ILocationState>(
    state => state.location
  );
  const { select_crew, data } = useSelector<StoreType, ICrewsState>(
    state => state.crews
  );
  const checkValidForm = () => {
    if (!address || !select_crew || data.length === 0) {
      console.error("address");
    } else {
      const date = new Date();
      console.info({
        time: `${date.getDate()}${date.getMonth() +
          1}${date.getFullYear()}${date.getHours()}${date.getMinutes()}${date.getMilliseconds()}`,
        address,
        crew_id: select_crew
      });
    }
  };

  return (
    <div className="app">
      <div className="app__header">
        <Autocomplete />
      </div>
      <div className="app__content">
        <div className="app__ymaps">
          <YMaps />
        </div>
        <div className="app__crews">
          <Crews />
        </div>
      </div>
      <footer className="app__footer">
        <Button onClick={() => checkValidForm()}>Заказать</Button>
      </footer>
    </div>
  );
};

export default App;
