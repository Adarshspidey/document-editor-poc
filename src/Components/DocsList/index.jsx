import React from 'react'
import './style.css'

const DocsList = ({fileName}) => {
  return (
    <div className='docs'>
        {fileName}
    </div>
  )
}

export default DocsList