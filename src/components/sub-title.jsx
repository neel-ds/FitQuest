import React from 'react'

const SubTitle = ({ title }) => {
  return (
    <div className="flex flex-col text-center w-full">
      <h2 className="text-2xl font-semibold title-font text-[#9FE598]">
        {title}
      </h2>
    </div>
  )
}

export default SubTitle

SubTitle.defaultProps = {
  title: '',
}