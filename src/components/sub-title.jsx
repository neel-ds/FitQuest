import React from "react";

const SubTitle = ({ title, color }) => {
  return (
    <div className="flex flex-col text-center w-full">
      <h2
        className={`text-2xl font-semibold title-font text-[#${
          color === "light" ? "9FE598" : "E3FED8"
        }]`}
      >
        {title}
      </h2>
    </div>
  );
};

export default SubTitle;

SubTitle.defaultProps = {
  title: "",
  color: "light",
};
