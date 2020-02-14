import React from 'react';
import './App.css';
import Output from './output';
import Select from 'react-select'

const area_lib = require('area-under-curve/area_lib')
const algo = require('area-under-curve/algorithm')
const resizedTextbox = { width: "40px", height: "30px" };

class Area extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      constant: 0,
      linear: 0,
      quadratic: 0,
      cubic: 0,
      lower: 0,
      upper: 10,
      step: 0.1,
      selectedAlgorithm: null
    }
  }
  handleUpper = (event) => {
    let new_val = Number(event.target.value);
    this.setState(prevState => ((new_val > prevState.lower) ? { upper: new_val } : { upper: prevState.upper }));
  };

  handleLower = (event) => {
    let new_val = Number(event.target.value);
    this.setState(prevState => ((new_val < prevState.upper) ? { lower: new_val } : { lower: prevState.lower }));
  };

  handleConstant = (event) => this.setState({ constant: event.target.value });
  handleLinear = (event) => this.setState({ linear: event.target.value });
  handleQuadratic = (event) => this.setState({ quadratic: event.target.value });
  handleCubic = (event) => this.setState({ cubic: event.target.value });
  handleStep = (event) => this.setState({ step: event.target.value });

  evaluate() {
    const cmap = new Map([[0, Number(this.state.constant)], [1, Number(this.state.linear)], [2, Number(this.state.quadratic)], [3, Number(this.state.cubic)],]);
    const poly1 = new area_lib.Polynomial(cmap);
    const bounds1 = new area_lib.Bounds(Number(this.state.lower), Number(this.state.upper), Number(this.state.step));
    var data = {}
    data["polynomial"] = poly1.coefficientMap
    data["bounds"] = bounds1.toString()
    data["high_low"] = [poly1.evaluate(this.state.lower), poly1.evaluate(this.state.upper)].toString()
    algo.midpoint.name_alt = "midpoint";
    algo.trapezoid.name_alt = "trapezoid";
    algo.simpson.name_alt = "simpson";

    let eval_chosen_algo = algo.midpoint;
    console.log(this.state.selectedAlgorithm)
    if (this.state.selectedAlgorithm) {
      eval_chosen_algo = this.state.selectedAlgorithm.value
    }
    data["algorithm"] = eval_chosen_algo.name_alt;
    data["area"] = area_lib.areaUnderCurve(poly1, bounds1, eval_chosen_algo)
    return data;
  }

  handleAlgorithmChange = selectedAlgorithm => {
    this.setState(
      { selectedAlgorithm },
      () => console.log(`Option selected:`, this.state.selectedAlgorithm)
    );
  };

  render() {
    const { selectedAlgorithm } = this.state;
    const algorithmOptions = [{ value: algo.midpoint, label: "midpoint" },
    { value: algo.trapezoid, label: "trapezoid" },
    { value: algo.simpson, label: "simpson" }
  ]

    return (
      <div className="App">
        <h1>Area under curve</h1>
        <h2>Polynomial</h2>
        <p>Enter exponent coefficients: f(x) =
        <input style={resizedTextbox} type="number" min="-10" max="10" step="1" value={this.state.cubic} onChange={this.handleCubic} />x<sup>3</sup> +
        <input style={resizedTextbox} type="number" min="-10" max="10" step="1" value={this.state.quadratic} onChange={this.handleQuadratic} />x<sup>2</sup> +
        <input style={resizedTextbox} type="number" min="-10" max="10" step="1" value={this.state.linear} onChange={this.handleLinear} />x +
        <input style={resizedTextbox} type="number" min="-10" max="10" step="1" value={this.state.constant} onChange={this.handleConstant} />
        </p>
        <h2>Step Size</h2>
        <input style={resizedTextbox} type="number" min="0.1" max="1.0" step="0.1" value={this.state.step} onChange={this.handleStep} />
        <h2>Bounds</h2>
        <label for="upper">Upper</label> <input name="upper" style={resizedTextbox} type="number" min="-10" max="10" step="1" value={this.state.lower} onChange={this.handleLower} />
        <label for="lower">Lower</label> <input name="lower" style={resizedTextbox} type="number" min="-10" max="10" step="1" value={this.state.upper} onChange={this.handleUpper} />

        <h2>Algorithm</h2>
        <React.Fragment>

          <Select options={algorithmOptions}
            className='select'
            width='200px'
            value={selectedAlgorithm}
            onChange={this.handleAlgorithmChange} />
        </React.Fragment>
        <h2>Output</h2>
        <Output data={
          this.evaluate()} />
      </div>
    )
  }
}

export default Area;
