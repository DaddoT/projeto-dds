import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ParticlesBg from "particles-bg";

ReactDOM.render(
  <div>
    <App />
    <ParticlesBg  type='cobweb' bg={true} />
    {/* <ParticlesBg color="#ff0000" num={200} type="cobweb" bg={true} /> */}
  </div>
  // <React.StrictMode>
  // </React.StrictMode>
  ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
