// @flow strict
import Image from "next/legacy/image";
import heroImage from "/public/hero_bus.gif";

function HeroSection() {
  return (
    <div className='p-0 w-screen h-[360px] md:h-[520px]' area-label='homepage hero-section'>
      <Image
        src={heroImage}
        alt='hero'
        className='w-screen h-[360px] md:h-[520px]'
        width={1920}
        height={620}
        layout="responsive"
      />
    </div>
  );
}

export default HeroSection;
