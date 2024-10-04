import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const mount = (props) => {
  ReactDOM.render(<App />, document.getElementById('app1'));
};

export { mount };