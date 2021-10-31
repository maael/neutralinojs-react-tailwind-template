import React from 'react'
import ReactDom from 'react-dom'

Neutralino.events.on("ready", () => {
  ReactDom.render(<div className='text-red-400'>Testing</div>, document.querySelector('#app'))
});
