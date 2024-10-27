"use client"
import React from 'react'

const ButtonSubmit = ({ value, loading, ...props }) => {

  return (
    <button 
        disabled={loading} 
        {...props}
        className='p-2 text-sm bg-violet-700 rounded text-slate-100 mt-8 w-full hover:opacity-85 transition'>
        {loading ? 'Loading...' : value}
    </button>
  )
}

export default ButtonSubmit
