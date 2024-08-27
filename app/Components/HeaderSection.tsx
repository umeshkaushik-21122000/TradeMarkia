import React from "react";
import InputSection from "./InputSection";
import LogoSection from "./LogoSection";

const HeaderSection = () => {
  return (
    <div className="bg-[#F8FAFE] flex w-full py-12 px-20 gap-x-12 items-center">
      <LogoSection />
      <InputSection />
    </div>
  );
};

export default HeaderSection;
