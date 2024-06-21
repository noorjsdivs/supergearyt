import React from "react";
import { twMerge } from "tailwind-merge";
interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: Props) => {
  const newClassName = twMerge(
    "max-w-screen-xl mx-auto py-10 px-4 lg:px-0",
    className
  );
  return <div className={newClassName}>{children}</div>;
};

export default Container;
