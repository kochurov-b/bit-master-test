import React from "react";

import YMaps from "../YMaps";
import Crews from "../Crews";

import "./styles.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="app__header"></div>
      <div className="app__content">
        <div className="app__ymaps">
          <YMaps />
        </div>
        <div className="app__crews">
          <Crews />
        </div>
      </div>
    </div>
  );
};

export default App;
