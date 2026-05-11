import React from 'react'
import { getProductHomePage } from '../../auth/services/authService'

function Button() {
  return (
    <div>

        <button onClick={getProductHomePage}>product</button>
    </div>
  )
}

export default Button