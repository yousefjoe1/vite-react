import React, { useEffect } from "react";

const ContainerUp = ({ children,className='' }) => {
  useEffect(() => {
    document.body.scrollIntoView();
  }, []);
  return <div className={`${className}`}>{children}</div>;
};

export default ContainerUp;
