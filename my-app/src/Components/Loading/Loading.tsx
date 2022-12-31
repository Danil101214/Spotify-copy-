import React from 'react'
import './Style.css'

const Loading = () => {
  return (
    <div className="loader__wrapper">
        <div className="loader"></div>
        <div className="loader--inner"></div>
    </div>
  )
}

export default Loading