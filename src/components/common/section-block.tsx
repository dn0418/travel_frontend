import cn from "classnames";
import React from "react";

type SectionProps = {
  className?: any;
  children: React.ReactElement;
};

const SectionBlock: React.FC<SectionProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col py-6 px-8 pb-[32px] md:px-16 lg:px-24 xl:px-32 xl:pb-[48px] 3xl:pb-[60px]",
        className,
      )}>
      {children}
    </div>
  );
};

export default SectionBlock;
