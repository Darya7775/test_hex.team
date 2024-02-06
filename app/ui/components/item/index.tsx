"use client"

import React, { useState } from "react";
import type { Item } from "../../types";
import Link from "next/link";

interface Props {
  item: Item;
  index: number;
}

const Item: React.FC<Props> = (props: Props) => {
  const [ chose, setChose ] = useState(false);

  const callbacks = {
    // копирование короткой ссылки
    copy: (short: string) => {
      navigator.clipboard.writeText(short);
      setChose(!chose);
    },
  };

  return(
    <li className={`list__item list__item--${props.index%2 ? "white" : "blue"}`}>
      <button className="list__button" onClick={() => setChose(!chose)}>{props.item.short}</button>
      {chose &&
        <div className="list__wrapper-link">
          <Link className="form__link" href={`https://front-test.hex.team/s/${props.item.short}`}>Перейти</Link>
          <button className="form__link" onClick={() => callbacks.copy(props.item.short)}>Копировать</button>
        </div>}
      <span className="list__big-link">{props.item.target}</span>
      <span>{props.item.counter}</span>
    </li>
  );
};

export default Item;
