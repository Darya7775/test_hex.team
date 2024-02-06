import React from "react";
import Form from "../ui/components/form";
import { cookies } from "next/headers";
import List from "../ui/components/list";

const Main: React.FC = () => {
  const cook = cookies();
  const token = cook.get("mytoken")?.value;

  return(
    <section>
      <h1 className="title">сайт сокращения ссылок</h1>
      <Form token={token} />
      <List token={token} />
    </section>
  );
};

export default Main;
