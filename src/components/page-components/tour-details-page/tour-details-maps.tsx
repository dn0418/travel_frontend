// @flow strict


function TourDetailsMaps() {
  return (
    <div className="tour-details-maps my-5 md:my-8 grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="">
        <ul className="text-[#5e5e5e] md:w-3/4 font-rubik list-disc">
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Lorem ipsum dolor sit amet consectetur. Neque odio eget sagittis consequat ac gravida porttitor. Eget lorem egestas proin et malesuada nulla eget. Quam dui tempor tellus enim hac consequat quis nec condimentum. Sed dictum enim sed orci senectus amet venenatis luctus.</li>
        </ul>
      </div>
      <div className="regular-shadow rounded-lg h-[400px] lg:w-[400px] p-4">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467712.7716353082!2d43.84273841043955!3d40.20388649872727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406a95d238535085%3A0x2909afb249750209!2sBaghramyan%20Park!5e0!3m2!1sen!2sbd!4v1685202520823!5m2!1sen!2sbd"
          width="368"
          className="border-0"
          height="368"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

      </div>
    </div>
  );
};

export default TourDetailsMaps;