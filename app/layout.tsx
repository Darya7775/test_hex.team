import React from "react";
import "./ui/scss/global-styles.scss";
import ProvSes from "./SessionProv";
import Header from "./ui/components/header";
import { getServerSession } from "next-auth";
import authOptions from "../configs/auth";

interface Props {
  children: React.ReactNode;
}

const RootLayout: React.FC<Props> = async ({ children }: Props) => {
  const session = await getServerSession(authOptions);

  return (
      <html lang="ru">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="test hex.team" />
          <title>test hex.team</title>
        </head>
        <body>
          <ProvSes>
            <div id='root'>
              <Header user={session?.user.name}></Header>
              {children}
            </div>
          </ProvSes>
        </body>
      </html>

  );
}

export default RootLayout;
