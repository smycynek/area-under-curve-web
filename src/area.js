import React, { useState } from 'react'

import './App.css'
import Output from './output'
import Select from 'react-select'
import 'rc-input-number/assets/index.css'
import InputNumber from 'rc-input-number'

// Separate npm package for actual integral calculations
const area_lib = require('area-under-curve/area_lib')
const algo = require('area-under-curve/algorithm')

//part of "yellow-notepad styling"
const selectStyle = {
    control: base => ({
        ...base,
        borderWidth: '2px',
        borderRadius: '4px',
        borderColor: 'lightblue',
    }),
}

/**
 * Main 'area under curve' component allowing the user
 * to specify a polynomial, boundaries, step size, and algorithm
 * and view output
 */
function Area() {
    const [constant, setConstant] = useState(0)
    const [linear, setLinear] = useState(0)
    const [quadratic, setQuadratic] = useState(1)
    const [cubic, setCubic] = useState(0)
    const [lower, setLower] = useState(2)
    const [upper, setUpper] = useState(8)
    const [step, setStep] = useState(0.2)
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(null)

    /**
     * Upper-bound number box handler
     */
    const handleUpper = value => {
        let new_val = Number(value)
        if (new_val > lower) {
            setUpper(new_val)
        }
    }

    /**
     * Lower-bound number box handler
     */
    const handleLower = value => {
        let new_val = Number(value)
        if (new_val < upper) {
            setLower(new_val)
        }
    }

    /**
     * Algorithm selection handler
     */
    const handleAlgorithmChange = selectedAlgorithm => {
        setSelectedAlgorithm(selectedAlgorithm)
        console.log(`Option selected:`, selectedAlgorithm)
    }

    // Polynomial term and step size handlers
    const handleConstant = value => setConstant(value)
    const handleLinear = value => setLinear(value)
    const handleQuadratic = value => setQuadratic(value)
    const handleCubic = value => setCubic(value)
    const handleStep = value => {
        setStep(value)
    }

    /**
     * Method to collect state inputs, create polynomial, and calculate area
     * using a chosen algorithm
     */
    const evaluate = () => {
        const cmap = new Map([
            [0, Number(constant)],
            [1, Number(linear)],
            [2, Number(quadratic)],
            [3, Number(cubic)],
        ])
        const poly1 = new area_lib.Polynomial(cmap)
        let vstep = step
        if (isNaN(step) || step < 0.1) {
            vstep = 0.1
        }
        const bounds1 = new area_lib.Bounds(
            Number(lower),
            Number(upper),
            Number(vstep)
        )
        var data = {}
        data['polynomial'] = poly1.coefficientMap
        data['bounds'] = bounds1.toString()
        data['high_low'] = [
            poly1.evaluate(lower),
            poly1.evaluate(upper),
        ].toString()
        algo.midpoint.name_alt = 'midpoint'
        algo.trapezoid.name_alt = 'trapezoid'
        algo.simpson.name_alt = 'simpson'

        let eval_chosen_algo = algo.midpoint
        console.log(selectedAlgorithm)
        if (selectedAlgorithm) {
            eval_chosen_algo = selectedAlgorithm.value
        }
        data['algorithm'] = eval_chosen_algo.name_alt
        //Main calculation in the operation
        data['area'] = area_lib.areaUnderCurve(poly1, bounds1, eval_chosen_algo)
        return data
    }

    /**
     * Render UI controls and output when controls update data
     */
    const algorithmOptions = [
        { value: algo.midpoint, label: 'midpoint' },
        { value: algo.trapezoid, label: 'trapezoid' },
        { value: algo.simpson, label: 'simpson' },
    ]
    return (
        <div className="App">
            <link
                href="https://fonts.googleapis.com/css?family=Ubuntu"
                rel="stylesheet"
                type="text/css"
            />
            <h1>Area under curve</h1>
            <p>
                Why? Just for{' '}
                <a href="https://github.com/smycynek/area_under_curve/blob/master/README.md">
                    fun
                </a>
                .
            </p>
            <hr border-width="2px" />
            <div>
                <h2>Polynomial</h2>
                <div>
                    <InputNumber
                        min={-10}
                        max={10}
                        style={{
                            borderWidth: '2px',
                            borderColor: 'lightblue',
                            margin: 4,
                            padding: 5,
                            width: 50,
                        }}
                        value={cubic}
                        onChange={handleCubic}
                    />{' '}
                    x<sup>3</sup>
                </div>
                <div>
                    <InputNumber
                        min={-10}
                        max={10}
                        style={{
                            borderWidth: '2px',
                            borderColor: 'lightblue',
                            margin: 4,
                            padding: 5,
                            width: 50,
                        }}
                        value={quadratic}
                        onChange={handleQuadratic}
                    />{' '}
                    x<sup>2</sup>
                </div>
                <div>
                    <InputNumber
                        min={-10}
                        max={10}
                        style={{
                            borderWidth: '2px',
                            borderColor: 'lightblue',
                            margin: 4,
                            padding: 5,
                            width: 50,
                        }}
                        value={linear}
                        onChange={handleLinear}
                    />{' '}
                    x
                </div>
                <div>
                    <InputNumber
                        min={-10}
                        max={10}
                        style={{
                            borderWidth: '2px',
                            borderColor: 'lightblue',
                            margin: 4,
                            padding: 5,
                            width: 50,
                        }}
                        value={constant}
                        onChange={handleConstant}
                    />{' '}
                    c
                </div>
            </div>
            <div>
                <h2>Step Size</h2>
                <InputNumber
                    min={0.1}
                    max={1.0}
                    readonly={true}
                    style={{
                        borderWidth: '2px',
                        borderColor: 'lightblue',
                        margin: 4,
                        padding: 5,
                        width: 50,
                    }}
                    step={0.1}
                    value={step}
                    onChange={handleStep}
                />
            </div>
            <div>
                <h2>Bounds</h2>
                <div>
                    <label style={{ padding: 5 }} htmlFor="lower">
                        Lower
                    </label>{' '}
                    <InputNumber
                        name="upper"
                        style={{
                            borderWidth: '2px',
                            borderColor: 'lightblue',
                            margin: 4,
                            padding: 5,
                            width: 50,
                        }}
                        min={-10}
                        max={10}
                        step={1}
                        value={lower}
                        onChange={handleLower}
                    />
                    <label style={{ padding: 5 }} htmlFor="upper">
                        Upper
                    </label>{' '}
                    <InputNumber
                        name="lower"
                        style={{
                            borderWidth: '2px',
                            borderColor: 'lightblue',
                            margin: 4,
                            padding: 5,
                            width: 50,
                        }}
                        min={-10}
                        max={10}
                        step={1}
                        value={upper}
                        onChange={handleUpper}
                    />
                </div>
            </div>
            <div>
                <h2>Algorithm</h2>
                <React.Fragment>
                    <Select
                        options={algorithmOptions}
                        menuPlacement="bottom"
                        styles={selectStyle}
                        color="lightblue"
                        className="select"
                        theme={{
                            borderRadius: 0,
                            colors: {
                                primary: 'lightblue',
                                neutral1: 'lightblue',
                                neutral0: 'lightyellow',
                            },
                        }}
                        value={selectedAlgorithm}
                        onChange={handleAlgorithmChange}
                    />
                </React.Fragment>
            </div>
            <h2>Output</h2>
            <Output data={evaluate()} />
            <hr />
        </div>
    )
}

export default Area
