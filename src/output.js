import React from 'react';


/**
 * Simple component to render a + sign
 */
function Plus(props) {
  return "+"
}


/**
 * Component to render a polynomial term, such as
 * x, -x, 2x, or 3x^2
 */
function Term({ power, coefficient  }) {
  let renderedCoefficient = coefficient
  if ((coefficient === -1) && (power !==0)) {
    renderedCoefficient = "-" //replace '-1' with just '-'
  }
  if ((coefficient === 1) && (power !==0)) {
    renderedCoefficient = null //replace '1' with nothing
  }
  if (power === 0) { // constant -> render only coefficient
    return <React.Fragment> {renderedCoefficient}</React.Fragment>
  }
  else if (power === 1) { // linear -> render just 'x'
    return <React.Fragment> {renderedCoefficient}x</React.Fragment>
  }
  else { // higher powers --> render superscript exponent
    return <React.Fragment> {renderedCoefficient}x<sup>{power}</sup></React.Fragment>
  }
}

/**
 * Higher order component to render cubic term
 */
function CubicTerm({ coefficient }) {
  if (coefficient === 0) {
    return null
  }
  return (<Term power={3} coefficient={coefficient} />)
}

/**
 * Higher order component to render quadratic term
 */
function QuadraticTerm({ coefficient }) {
  if (coefficient === 0) {
    return null
  }
  return (<Term power={2} coefficient={coefficient} />);
}

/**
 * Higher order component to render linear term
 */
function LinearTerm({ coefficient }) {
  if (coefficient === 0) {
    return null
  }
  return (<Term power={1} coefficient={coefficient} />);
}

/**
 * Higher order component to render constant term
 */
function ConstantTerm({ coefficient }) {
  if (coefficient === 0) {
    return <React.Fragment />
  }
  return (<Term power={0} coefficient={coefficient} />);
}

/**
 * Query the term (by power) and the rest of the polynomial to see
 * if we need a + sign to join two terms.  For example, if we have a quadratic 
 * term but no cubic term, there is no need for a plus sign between the
 * (absent) cubic term and the quadratic.
 */
function needsConcatination(power, data) {
  switch (power) {
    case 3:
      return data.get(3) && data.get(2)
    case 2:
      return (data.get(1) && (data.get(3) || data.get(2)))
    case 1:
      return (data.get(0) && (data.get(3) || data.get(2) || data.get(1)))
    case 0:
      return false
    default:
      return false
  }
}

/**
 * Render a polynomial from a Map of exponent->coefficient data
 * Optionally render plus signs for positive coefficients where
 * they make sense in traditional equation formatting.
 * 
 * Example, render:
 * f(x) = 2x^2 + x, not f(x) = 0x^3 + 2x^2 + 1x + 0
 */
function Polynomial({ data }) {
  return (
    <React.Fragment>
      <span>f(x) = </span>
      <CubicTerm coefficient={data.get(3)} /> {needsConcatination(3, data) && (data.get(2) > 0) ? <Plus /> : null}
      <QuadraticTerm coefficient={data.get(2)} /> {needsConcatination(2, data) && (data.get(1) > 0)  ? <Plus /> : null}
      <LinearTerm coefficient={data.get(1)} /> {needsConcatination(1, data) && (data.get(0) > 0)  ? <Plus /> : null}
      <ConstantTerm coefficient={data.get(0)} />
      <span>{(data.get(3)===0) && (data.get(2)===0) && (data.get(1)===0) && (data.get(0)===0) ? "0" : null}</span>
    </React.Fragment>
  )
}

/**
 * Component to display calculated data from the polyomial, boundaries, and step size
 */
function Output({ data }) {
  return (
    <div>
      <ul>
        <li>
          <React.Fragment>
            <span>Polynomial: </span>
            <Polynomial data={data.polynomial} />
          </React.Fragment>
        </li>
        <li>
          Bounds:
          {data.bounds}
        </li>
        <li>
          Algorithm:
          {data.algorithm}
        </li>
        <li>
          High_Low:
          {data.high_low}
        </li>
        <li>
          Area:
          {data.area}
        </li>
      </ul>
    </div>
  );
}


export default Output;
