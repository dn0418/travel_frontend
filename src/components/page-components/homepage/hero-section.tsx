// @flow strict
import Image from "next/image";
import heroImage from "/public/bus.gif";

function HeroSection() {
  return (
    <div>
      <Image
        src={heroImage}
        alt='hero'
        className='w-screen h-[320px] md:h-[520px]'
      />
    </div>
  );
}

export default HeroSection;
