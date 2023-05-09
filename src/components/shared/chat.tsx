import { BsChatDots } from "react-icons/bs";

function ChatIcon() {
  const scrollToTop = () => {
    console.log("Clicked");
  };

  return (
    <div className='fixed bottom-10 right-5 md:right-10 md:bottom-16 w-10 h-10 md:w-16 md:h-16 rounded-full bg-[#6F7531] text-white z-50 transition-opacity duration-300 opacity-100'>
      <div className='w-full h-full flex justify-center items-center'>
        <button
          className='outline-none border-none cursor-pointer bg-transparent text-white '
          onClick={scrollToTop}
          aria-label='Back to top'>
          <BsChatDots className='text-xl  md:text-3xl' />
        </button>
      </div>
    </div>
  );
}

export default ChatIcon;
