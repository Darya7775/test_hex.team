import React from "react";
import Select from "../select";
import type { QueryParams } from "../../types";
import "./styles.scss";

interface Props {
  onChange: (api: string, {}) => void;
  values: QueryParams;
}

const Sort: React.FC<Props> = (props: Props) => {

  const callbacks = {
    onShort: async (short: string) => props.onChange("/api/statistics", { short }),
    onTarget: async (target: string) => props.onChange("/api/statistics", { target }),
    onCounter: async (counter: string) => props.onChange("/api/statistics", { counter }),
  };

  const options = {
    short: [
      {value: "asc_short", title: "по возрастанию"},
      {value: "desc_short", title: "по убыванию"},
    ],
    target: [
      {value: "asc_target", title: "по возрастанию"},
      {value: "desc_target", title: "по убыванию"},
    ],
    counter: [
      {value: "asc_counter", title: "по возрастанию"},
      {value: "desc_counter", title: "по убыванию"},
    ],
  };

  return(
    <div className="sort">
      <Select id="short" title="Короткие ссылки" options={options.short} value={props.values.short} onChange={callbacks.onShort}></Select>
      <Select id="target" title="Ссылки" options={options.target} value={props.values.target} onChange={callbacks.onTarget}></Select>
      <Select id="counter" title="Количество кликов" options={options.counter} value={props.values.counter} onChange={callbacks.onCounter}></Select>
    </div>
  );
};

export default Sort;
