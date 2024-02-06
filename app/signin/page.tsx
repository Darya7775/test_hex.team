"use client"

import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type FormValues = {
  name: string
  password: string
}

const Signin: React.FC = () => {
  const router = useRouter();

  const [ error, setError ] = useState("");
  const [ show, setShow ] = useState(false);
  const [ openPrompt, setOpenPrompt ] = useState(false);

  const { register, handleSubmit, formState } = useForm<FormValues>();
  const { isValid, isSubmitting } = formState;

  const callbacks = {
    // авторизация и перенаправление на главную страницу
    onSubmit: useCallback(async (user: FormValues) => {
      const res = await signIn("credentials", {
        name: user.name,
        password: user.password,
        redirect: false
      });

      if (res && !res.error) {
        router.push("/");
      } else {
        setError("неправильные имя и/или пароль");
      }
    }, []),
    // открытие/закрытие пароля
    onPassword: () => setShow(!show),
    // открытие/закрытие подсказки пароля
    onPrompt: () => setOpenPrompt(!openPrompt)
  };

  const listPrompts = <ul>от 8 до 20 символов латинского алфавита. <br/> Пароль должен содержать:
    <li><b>!?@#$%*_=()</b> минимум один специальный символ</li>
    <li><b>A-Z</b>: минимум одну букву в верхнем регистре</li>
    <li><b>a-z</b>: минимум одну букву в нижним регистре</li>
  </ul>;

  return(
    <main>
      <div className="container">
        <form className="form" method="POST" onSubmit={handleSubmit(callbacks.onSubmit)} noValidate>
          <h2>Login</h2>
          {error && <div className="form__error">{error}</div>}

          <div className="form__wrapper">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" autoFocus placeholder="Margot Robbie" aria-label="введите ваше имя"
              {...register("name", {
                required: true,
                maxLength: 30,
                pattern: {
                  value: /[а-яА-ЯёЁa-zA-Z0-9]/,
                  message: "Имя"
                }
              })} />
          </div>

          <div className="form__wrapper">
            <label htmlFor="register_password">Password</label>
            <input type={show ? "text" : "password"} id="register_password" aria-label="введите ваш пароль"
              placeholder="8-20 символов. Пример: 1P3a5s)?"
              {...register("password", {
                required: true,
                pattern: {
                  value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}/,
                  message: "From 8 to 20 characters, The password must contain: - !?@#$%*_=() minimum one special character, - A-Z: minimum one letter in uppercase, - a-z: minimum one lowercase letter"
                }
              })} />
            <img className="form__eye" src={show ? "/eye.svg" : "/eye_close.svg"} width={30} height={25} alt={show ? "скрыть пароль" : "показать пароль"} onClick={callbacks.onPassword}/>
            {openPrompt
              ? (<><button type="button" aria-label="подсказка для пароля" onClick={callbacks.onPrompt}></button>
                {listPrompts}</>)
              : (<button type="button" aria-label="подсказка для пароля" onClick={callbacks.onPrompt}></button>)}
          </div>

          <button className="form__button" type="submit" disabled={!isValid || isSubmitting}>Войти</button>
        </form>
      </div>
    </main>
  );
};

export default Signin;
