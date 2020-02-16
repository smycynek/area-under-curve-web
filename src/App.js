import React from 'react';
import './App.css';
import Area from './area';

class App extends React.Component {
  render() {
    return (
      <div>
        <Area />
      
        <cite>
        <a style={{"margin-left": "20px"}} href="https://github.com/smycynek/area-under-curve-web">https://github.com/smycynek/area-under-curve-web</a>
        </cite>
      </div>
    );
  }
}
export default App;
