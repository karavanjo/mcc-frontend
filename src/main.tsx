import React from 'react'
import ReactDOM from 'react-dom'

import RealmApp, { useRealmApp } from './providers/realm';
import MongoDB from './providers/mongodb';

import './index.css'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <RealmApp>
      <MongoDB>
        <App/>
      </MongoDB>
    </RealmApp>
  </React.StrictMode>,
  document.getElementById('root')
)
