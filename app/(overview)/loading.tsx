import React from "react";
import Spinner from "../ui/components/spinner";

const Loading: React.FC = () => {
  return(
    <Spinner text="Загрузка" />
  );
};

export default Loading;
