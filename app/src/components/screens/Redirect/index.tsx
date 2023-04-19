import React, { useEffect } from "react";

type Props = {
  path: string;
};

export const Redirect: React.FC<Props> = ({ path }) => {
  useEffect(() => {
    window.location.href = path;
  }, []);

  return <div />;
};
