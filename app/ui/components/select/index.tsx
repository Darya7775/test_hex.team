"use client"

import React, { useState } from "react";

interface Props {
  onChange: (params: string) => void;
  value: string;
  options: {value: string; title: string}[];
  title: string;
  id: string;
}

const Select: React.FC<Props> = (props: Props) => {
  const [ value, setValue ] = useState(props.value);

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onChange(e.target.value);
    setValue(e.target.value);
  };

  return (
    <div>
      <label htmlFor={props.id}>{props.title}</label>
      <select id={props.id} value={value} onChange={onSelect}>
        {props.options.map(item => (
          <option key={item.value} value={item.value}>{item.title}</option>
        ))}
      </select>
    </div>
  )
}

export default Select;
