import React from 'react';
import logo from '../logo.svg';
import ComponentBox from './ComponentBox'

export default () =>
<div className="App">
  <div className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h2>React Components Factory</h2>
  </div>
  <div className="container">
    <ComponentBox title="Multiple Pictures Input">
    </ComponentBox>
  </div>
</div>
