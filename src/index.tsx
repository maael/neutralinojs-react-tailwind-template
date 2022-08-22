import React from 'react'
import ReactDom from 'react-dom'
import App from './App'

Neutralino.init()

Neutralino.events.on('ready', () => {
  ReactDom.render(<App />, document.querySelector('#app'))
})
