import React from 'react';

function Plus(props) {
  return "+"
}

function Cubic({ coefficient }) {
  if (coefficient === 0) {
    return <React.Fragment />
  }
  if (coefficient === 1) {
    return (<React.Fragment>x <sup> 3 </sup>  </React.Fragment>);
  }
  return (<React.Fragment>{coefficient} x <sup> 3 </sup>  </React.Fragment>);
}

function Quadratic({ coefficient }) {
  if (coefficient === 0) {
    return <React.Fragment />
  }
  if (coefficient === 1) {
    return (<React.Fragment>x <sup> 2 </sup>  </React.Fragment>);
  }
  return (<React.Fragment>{coefficient} x <sup> 2 </sup>  </React.Fragment>);
}

function Linear({ coefficient }) {
  if (coefficient === 0) {
    return <React.Fragment />
  }
  if (coefficient === 1) {
    return (<React.Fragment>x  </React.Fragment>);
  }
  return (<React.Fragment>{coefficient} x </React.Fragment>);
}

function Constant({ coefficient }) {
  if (coefficient === 0) {
    return <React.Fragment />
  }
  return (<React.Fragment> {coefficient} </React.Fragment>);
}

function Output({ data }) {
  return (
    <div>
      <ul>
        <li>
          Polynomial:
          f(x) = <Cubic coefficient={data.polynomial.get(3)} /> {(data.polynomial.get(3) && data.polynomial.get(2)) ? <Plus /> : ""}
          <Quadratic coefficient={data.polynomial.get(2)} />  {((data.polynomial.get(2) || data.polynomial.get(3)) && data.polynomial.get(1)) ? <Plus /> : ""}
          <Linear coefficient={data.polynomial.get(1)} />     {((data.polynomial.get(1) || data.polynomial.get(2) || data.polynomial.get(3)) && data.polynomial.get(0)) ? <Plus /> : ""}
          <Constant coefficient={data.polynomial.get(0)} />
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
