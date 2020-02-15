import React from 'react';

function Plus(props) {
  return "+"
}

function Term({ power, coefficient = null }) {
  if (power === 0) {
    return <React.Fragment> {coefficient}</React.Fragment>
  }
  else if (power === 1) {
    return <React.Fragment> {coefficient}x</React.Fragment>
  }
  else {
    return <React.Fragment> {coefficient}x<sup>{power}</sup></React.Fragment>
  }
}

function CubicTerm({ coefficient }) {
  if (coefficient === 0) {
    return null
  }
  if (coefficient === 1) {
    return (<Term power={3} />);
  }

  return (<Term power={3} coefficient={coefficient} />)
}

function QuadraticTerm({ coefficient }) {
  if (coefficient === 0) {
    return null
  }
  if (coefficient === 1) {
    return (<Term power={2} />);
  }
  return (<Term power={2} coefficient={coefficient} />);
}

function LinearTerm({ coefficient }) {
  if (coefficient === 0) {
    return null
  }
  if (coefficient === 1) {
    return (<Term power={1} />);
  }
  return (<Term power={1} coefficient={coefficient} />);
}

function ConstantTerm({ coefficient }) {
  if (coefficient === 0) {
    return <React.Fragment />
  }
  return (<Term power={0} coefficient={coefficient} />);
}

function needsConcatination(power, data) {
  //if (data.get(power-1) < 0)
  //  return false
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

function Polynomial({ data }) {
  return (
    <React.Fragment>
      <span>f(x) = </span>
      <CubicTerm coefficient={data.get(3)} /> {needsConcatination(3, data) ? <Plus /> : null}
      <QuadraticTerm coefficient={data.get(2)} /> {needsConcatination(2, data) ? <Plus /> : null}
      <LinearTerm coefficient={data.get(1)} /> {needsConcatination(1, data) ? <Plus /> : null}
      <ConstantTerm coefficient={data.get(0)} />
      <span>{(data.get(3)===0) && (data.get(2)===0) && (data.get(1)===0) && (data.get(0)===0) ? "0" : null}</span>
    </React.Fragment>
  )
}

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
