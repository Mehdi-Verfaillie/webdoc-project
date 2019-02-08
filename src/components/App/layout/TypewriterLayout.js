import React from 'react'
import Waves from '../scripts/Waves'

const TypewriterLayout = ({
  children,
  skip
}) => (
  <div className="intro-main">
    <Waves className='intro-three' />
    <div className='intro-main-container last'>
      <p className="intro-main-container-text">
        {children}
      </p>
    </div>
    <button onClick={skip}>Skip</button>
  </div>
)

export default TypewriterLayout