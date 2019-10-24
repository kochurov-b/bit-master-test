import React from "react";
import YMaps from "../YMaps";

import "./styles.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="app__header"></div>
      <div className="app__content">
        <div className="app_ymaps">
          <YMaps />
        </div>
      </div>
    </div>
  );
};

export default App;
