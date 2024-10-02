import React, { useEffect } from "react";

const ContainerUp = ({ children }) => {
  useEffect(() => {
    document.body.scrollIntoView();
  }, []);
  return <>{children}</>;
};

export default ContainerUp;
