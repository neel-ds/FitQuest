import React from 'react'

const GoalCard = ({ amount, type, title }) => {
  return (
    <div className="flex flex-col justify-center p-6 bg-[#9FE598]/30 border border-[#9FE598] rounded-lg shadow-lg text-center">
    <h5 className="mb-2 text-2xl tracking-tight text-[#35B226]">{title}</h5>
    <div className="flex items-center justify-center">
      <p className="text-white z-1 px-4">{amount} {type}</p>
    </div>
  </div>
  )
}

export default GoalCard