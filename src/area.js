import React from 'react';
import './App.css';
import Output from './output';
import Select from 'react-select'
import 'rc-input-number/assets/index.css';
import InputNumber from 'rc-input-number';

// Separate npm package for actual integral calculations
const area_lib = require('area-under-curve/area_lib')
const algo = require('area-under-curve/algorithm')

//part of "yellow-notepad styling"
const selectStyle = {
  control: base => ({
    ...base,
    borderWidth: "2px",
    borderRadius: "4px",
    borderColor: "lightblue"

  })
};

/**
 * Main 'area under curve' component allowing the user
 * to specify a polynomial, boundaries, step size, and algorithm
 * and view output
 */
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

/**
 * Upper-bound number box handler
 */
  handleUpper = (value) => {
    let new_val = Number(value);
    this.setState(prevState => ((new_val > prevState.lower) ? { upper: new_val } : { upper: prevState.upper }));
  };

  /**
 * Lower-bound number box handler
 */
  handleLower = (value) => {
    let new_val = Number(value);
    this.setState(prevState => ((new_val < prevState.upper) ? { lower: new_val } : { lower: prevState.lower }));
  };

/**
 * Algorithm selection handler
 */
  handleAlgorithmChange = selectedAlgorithm => {
    this.setState(
      { selectedAlgorithm },
      () => console.log(`Option selected:`, this.state.selectedAlgorithm)
    );
  };

 // Polynomial term and step size handlers 
  handleConstant = (value) => this.setState({ constant: value });
  handleLinear = (value) => this.setState({ linear: value });
  handleQuadratic = (value) => this.setState({ quadratic: value });
  handleCubic = (value) => this.setState({ cubic: value });
  handleStep = (value) => {
    this.setState({ step: value });

  }
/**
 * Method to collect state inputs, create polynomial, and calculate area
 * using a chosen algorithm
 */
  evaluate() {
    const cmap = new Map([[0, Number(this.state.constant)], [1, Number(this.state.linear)], [2, Number(this.state.quadratic)], [3, Number(this.state.cubic)],]);
    const poly1 = new area_lib.Polynomial(cmap);
    let step = this.state.step
    if (isNaN(step) || step < 0.1) {
      step = .1
    }
    const bounds1 = new area_lib.Bounds(Number(this.state.lower), Number(this.state.upper), Number(step));
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
    //Main calculation in the operation
    data["area"] = area_lib.areaUnderCurve(poly1, bounds1, eval_chosen_algo)
    return data;
  }


 /**
 * Render UI controls and output when controls update data
 */
  render() {
    const { selectedAlgorithm } = this.state;
    const algorithmOptions = [{ value: algo.midpoint, label: "midpoint" },
    { value: algo.trapezoid, label: "trapezoid" },
    { value: algo.simpson, label: "simpson" }
    ]
    return (
      <div className="App">
        <link href='https://fonts.googleapis.com/css?family=Ubuntu' rel='stylesheet' type='text/css' />
        <h1>Area under curve</h1>
        <p>Why? Just for <a href="https://github.com/smycynek/area_under_curve/blob/master/README.md">fun</a>.</p>
        <hr border-width="2px" />
        <div>
          <h2>Polynomial</h2>
          <div>
            <InputNumber min={-10} max={10} style={{ borderWidth: "2px", borderColor: "lightblue", margin: 4, padding: 5, width: 50 }} value={this.state.cubic} onChange={this.handleCubic} /> x<sup>3</sup>
          </div>
          <div>
            <InputNumber min={-10} max={10} style={{ borderWidth: "2px", borderColor: "lightblue", margin: 4, padding: 5, width: 50 }} value={this.state.quadratic} onChange={this.handleQuadratic} /> x<sup>2</sup>
          </div>
          <div>
            <InputNumber min={-10} max={10} style={{ borderWidth: "2px", borderColor: "lightblue", margin: 4, padding: 5, width: 50 }} value={this.state.linear} onChange={this.handleLinear} />  x
        </div>
          <div>
            <InputNumber min={-10} max={10} style={{ borderWidth: "2px", borderColor: "lightblue", margin: 4, padding: 5, width: 50 }} value={this.state.constant} onChange={this.handleConstant} /> c
        </div>
        </div>
        <div>
          <h2>Step Size</h2>
          <InputNumber min={0.1} max={1.0} readonly={true} style={{ borderWidth: "2px", borderColor: "lightblue", margin: 4, padding: 5, width: 50 }} step={0.1} value={this.state.step} onChange={this.handleStep} />
        </div>
        <div>
          <h2>Bounds</h2>
          <div>
            <label style={{ padding: 5 }} htmlFor="lower">Lower</label> <InputNumber name="upper" style={{ borderWidth: "2px", borderColor: "lightblue", margin: 4, padding: 5, width: 50 }} min={-10} max={10} step={1} value={this.state.lower} onChange={this.handleLower} />

            <label style={{ padding: 5 }} htmlFor="upper">Upper</label> <InputNumber name="lower" style={{ borderWidth: "2px", borderColor: "lightblue", margin: 4, padding: 5, width: 50 }} min={-10} max={10} step={1} value={this.state.upper} onChange={this.handleUpper} />
          </div>
        </div>
        <div>
          <h2>Algorithm</h2>
          <React.Fragment>
            <Select options={algorithmOptions} menuPlacement="bottom"
              styles={selectStyle}
              color="lightblue"
              className="select"
              theme={{ borderRadius: 0, colors: { primary: "lightblue", neutral1: "lightblue", neutral0: "lightyellow" } }}
              value={selectedAlgorithm}
              onChange={this.handleAlgorithmChange} />
          </React.Fragment>
        </div>
        <h2>Output</h2>
        <Output data={
          this.evaluate()} />
        <hr />
      </div>
    )
  }
}

export default Area;
