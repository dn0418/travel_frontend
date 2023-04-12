import { SwitchUnstyled, SwitchUnstyledProps } from "@mui/base";
import classNames from "classnames";

const MySwitch = (props: SwitchUnstyledProps) => {
  return (
    <>
      <SwitchUnstyled
        {...props}
        // slotProps = available elements inside SwitchUnstyled that we can style
        slotProps={{
          root(state) {
            return {
              className: classNames({
                "inline-block relative w-10 h-6 rounded-lg m-2": true,
                "opacity-[40%] cursor-not-allowed": state.disabled,
              }),
            };
          },
          thumb(state) {
            return {
              className: classNames({
                "absolute block w-4 h-4 rounded-sm top-[4px] left-[4px] transition-all duration-150 ease-in-out bg-white":
                  true,
                "translate-x-4": state.checked,
              }),
            };
          },
          input(state) {
            return {
              className: classNames({
                "absolute w-full h-full z-[1] top-0 left-0 opacity-0 margin-0":
                  true,
                "cursor-pointer": !state.disabled,
                "cursor-not-allowed": state.disabled,
              }),
            };
          },
          track(state) {
            return {
              className: classNames({
                "w-full h-full block rounded-sm": true,
                "bg-indigo-500": state.checked,
                "bg-gray-500": !state.checked,
              }),
            };
          },
        }}
      />
    </>
  );
};
export default MySwitch;
