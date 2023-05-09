// @flow strict
import Image from "next/image";
import heroImage from "/public/hero_bus.gif";

function HeroSection() {
  return (
    <div className='p-0'>
      <Image
        src={heroImage}
        alt='hero'
        className='w-screen h-[260px] md:h-[520px]'
      />
    </div>
  );
}

export default HeroSection;
