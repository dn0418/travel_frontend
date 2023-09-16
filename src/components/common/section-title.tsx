// @flow strict

function SectionTitle({ title }: { title: string }) {
  return (
    <h3 className='text-xl capitalize md:text-2xl font-semibold text-[#081000]'>
      {title}
    </h3>
  );
}

export default SectionTitle;
