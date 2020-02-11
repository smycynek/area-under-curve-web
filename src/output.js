import React from 'react';

function Output({ data }) {
  return (
    <div>
      <ul>
        <li>
Polynomial:
          {data.polynomial}
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
