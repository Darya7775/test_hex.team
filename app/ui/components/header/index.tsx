"use client"

import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import "./styles.scss";

interface Props {
  user: string | undefined;
}

const Header: React.FC<Props> = (props: Props) => {
  const ses = useSession();

  const signOutUser = () => {
    localStorage.removeItem("queryParams");
    signOut();
  };

  return(
    <header className="header">
      <nav className="container header__nav">
        {ses.data || props.user
          ? <>
              <div className="header__name">{ses.data?.user?.name || props.user}</div>
              <button className="header__button" type="button" onClick={signOutUser}>Выход</button>
            </>
          : <>
              <Link className="header__button" href={"/register"}>Регистрация</Link>
              <Link className="header__button" href={"/signin"}>Вход</Link>
            </>
        }
      </nav>
    </header>
  );
};

export default Header;
