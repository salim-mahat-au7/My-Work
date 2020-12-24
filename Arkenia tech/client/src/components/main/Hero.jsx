import React from "react";
import HeroBtn from "./HeroBtn";

const Hero = () => {
  return (
    <div id="home">
      <section id="hero" className="d-flex align-items-center">
        <div className="container text-center position-relative">
          <h1>Contact Us Form</h1>
          <h2>
            User can contact with us using our Contact Us Form service
          </h2>
          <HeroBtn />
        </div>
      </section>
    </div>
  );
};

export default Hero;
