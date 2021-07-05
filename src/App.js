import React, { useState } from "react";
import SingleColor from "./SingleColor";

import Values from "values.js";

function App() {
  const [color, setColor] = useState("");
  const [error, setError] = useState(false);
  const [shade, setShade] = useState(5);
  const [list, setList] = useState(new Values("#ff0000").all(shade));
  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      let colors = new Values(color).all(parseInt(shade));
      setList(colors);
    } catch (error) {
      setError(true);
    }
  };
  const changeColorList = (event) => {
    setShade(parseInt(event.target.value));
    let currentColor = color ? color : "#ff0000";
    let colors = new Values(currentColor).all(parseInt(event.target.value));
    setList(colors);
  };
  return (
    <>
      <section className="container">
        <h3>color generator</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={color}
            onChange={(event) => setColor(event.target.value)}
            placeholder="#ff0000/red"
            className={`${error ? "error" : null}`}
          />
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
        <div className="shadeDiv">
          <label for="shade" className="shadeLabel">
            Shade
          </label>
          <input
            type="range"
            id="shade"
            name="shade"
            min="1"
            max="100"
            className="slider"
            onChange={(event) => changeColorList(event)}
          />
          <h4>{shade}</h4>
        </div>
      </section>
      <section className="colors">
        {list.map((color, index) => {
          return (
            <SingleColor
              key={index}
              {...color}
              index={index}
              hexColor={color.hex}
              shade={shade}
            />
          );
        })}
      </section>
    </>
  );
}

export default App;
