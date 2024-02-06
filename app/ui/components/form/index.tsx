"use client"

import React, { useCallback, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { getShortLink } from "../../../lib/data";
import "./styles.scss";

type FormValues = {
  link: string
}

interface Props {
  token: string;
}

const Form: React.FC<Props> = (props: Props) => {
  const { register, handleSubmit, formState, reset } = useForm<FormValues>();
  const { isValid, isSubmitting } = formState;

  const [ shortLink, setShortLink ] = useState("");
  const [ chose, setChose ] = useState(false);

  const callbacks = {
    // получение короткой ссылки
    onSubmit: useCallback(async ({ link }: FormValues) => {
      const res = await getShortLink(link, props.token);
      setShortLink(res.short);
      reset();
    }, []),
    // копирование короткой ссылки
    copy: (short: string) => {
      navigator.clipboard.writeText(short);
      setChose(!chose);
    },
  };

  return(
    <div className="container">
      <form className="form" method="POST" onSubmit={handleSubmit(callbacks.onSubmit)} noValidate>
        <div className="form__wrapper">
          <label htmlFor="link">Ссылка</label>
          <input type="text" id="link" autoFocus placeholder="https://nextjs.org/" aria-label="введите ссылку"
            {...register("link", {
              required: true,
              pattern: {
                value: /^(http|https):\/\/([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/,
                message: "Ссылка"
              }
            })} />
        </div>
        <button className="form__button" type="submit" disabled={!isValid || isSubmitting}>Сократить</button>
      </form>
      {shortLink && <div>Ваша ссылка: <button className="form__link" onClick={() => setChose(!chose)}>{shortLink}</button></div>}
      {chose &&
        <div className="form__wrapper-link">
          <Link className="form__link" href={`https://front-test.hex.team/s/${shortLink}`}>Перейти</Link>
          <button className="form__link" onClick={() => callbacks.copy(shortLink)}>Копировать</button>
        </div>}
    </div>
  );
};

export default Form;
