import React from "react";
import Heading from "../Heading/Heading";

const Header = () => {
  return (
    <>
      <Heading
        title="Veluvana Bali - Owl Bamboo House"
        subtitle="Sideman, Indonesia"
      />
      <div className="w-full md:h-[60vh] overflow-hidden rounded-xl">
        <img
          className="object-cover w-full"
          src="https://ew77mymd4fj.exactdn.com/wp-content/uploads/2020/11/Veluvana-Bali-Owl-Bamboo-House.jpg"
          alt="room image"
        />
      </div>
    </>
  );
};

export default Header;
