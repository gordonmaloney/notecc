import React from 'react'
import logo from './lr-ed-logo.png'



const Header = () => {
  return (
    <div
    style={{
        width: '100vw',
        height: '100px',
        padding: '40px 50px 0 50px',
        borderBottom: '2px solid lightgrey'
    }}
    >
        
        <img src={logo} 
        width="400px"
        style={{
            filter: 'contrast(150%)'
        }}
        />

    </div>
  )
}

export default Header