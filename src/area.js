import React from 'react';
import './App.css';
import Output from './output';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const area_lib = require('area-under-curve/area_lib')
const algo = require('area-under-curve/algorithm')
const resizedTextbox = { width: "50px", height: "30px" };


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
      algorithm: "midpoint",
      tabIndex: 0
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
    data["polynomial"] = poly1.toString()
    data["bounds"] = bounds1.toString()
    data["high_low"] = [poly1.evaluate(this.state.lower), poly1.evaluate(this.state.upper)].toString()
    const chosen_algo = this.state.tabIndex;
    let eval_chosen_algo = algo.midpoint;

    switch (chosen_algo) {
      case 0:
        eval_chosen_algo = algo.midpoint;
        break;
      case 1:
        eval_chosen_algo = algo.trapezoid;
        break;
      case 2:
        eval_chosen_algo = algo.simpson;
        break;
      default:
        eval_chosen_algo = algo.midpoint;
    }
    data["algorithm"] = eval_chosen_algo.name;
    data["area"] = area_lib.areaUnderCurve(poly1, bounds1, eval_chosen_algo)
    return data;
  }

  render() {

    console.log("Render")
    return (
      <div className="App">


        <h1>Area under curve</h1>
        <h2> Polynomial</h2>
        <p>Enter exponent coefficients:
      <input style={resizedTextbox} type="number" min="-10" max="10" step="1" value={this.state.constant} onChange={this.handleConstant} /> +
      <input style={resizedTextbox} type="number" min="-10" max="10" step="1" value={this.state.linear} onChange={this.handleLinear} />x +
      <input style={resizedTextbox} type="number" min="-10" max="10" step="1" value={this.state.quadratic} onChange={this.handleQuadratic} />x<sup>2</sup> +
      <input style={resizedTextbox} type="number" min="-10" max="10" step="1" value={this.state.cubic} onChange={this.handleCubic} />x<sup>3</sup>
        </p>
        <h2>Step Size</h2>
        <input style={resizedTextbox} type="number" min="0.1" max="1.0" step="0.1" value={this.state.step} onChange={this.handleStep} />
        <h2>Bounds</h2>
        Lower: <input style={resizedTextbox} type="number" min="-10" max="10" step="1" value={this.state.lower} onChange={this.handleLower} />
        Upper: <input style={resizedTextbox} type="number" min="-10" max="10" step="1" value={this.state.upper} onChange={this.handleUpper} />

        <h2>Algorithm</h2>
        <React.Fragment>
          <Tabs onSelect={tabIndex => this.setState({ tabIndex })}>
            <TabList>
              <Tab>Midpoint</Tab>
              <Tab>Trapezoid</Tab>
              <Tab>Simpson</Tab>
            </TabList>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
          </Tabs>

        </React.Fragment>


        <h2>Output</h2>
        <Output data={
          this.evaluate()} />
      </div>
    )
  }
}

export default Area;
