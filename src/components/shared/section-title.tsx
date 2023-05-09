// @flow strict

function SectionTitle({ title }: { title: string }) {
  return (
    <h3 className='text-xl md:text-2xl font-semibold text-[#004C99]'>
      {title}
    </h3>
  );
}

export default SectionTitle;
