import React from 'react'

const Title = ({ title }) => {
  return (
    <div className="flex flex-col text-center w-full">
      <h1 className="text-3xl mb-10 font-bold title-font mb-5 text-[#35B226]">
        {title}
      </h1>
    </div>
  )
}

export default Title

Title.defaultProps = {
  title: '',
}