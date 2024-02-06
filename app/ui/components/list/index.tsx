"use client"

import React, { useState } from "react";
import Sort from "../sort";
import useSWR from "swr";
import { getList } from "../../../lib/data";
import Pagination from "../pagination";
import type { QueryParams } from "../../types";
import Spinner from "../spinner";
import Item from "../item";
import "./styles.scss";

interface Props {
  token: string;
}

const List: React.FC<Props> = (props: Props) => {
  const [ list, setList ] = useState([]);
  const [ count, setCount ] = useState("");
  const [ currentParams, setCurrentParams ] = useState<QueryParams>({short: "", target: "", counter: "", offset: 0, page: 1});

  const callbacks = {
    // получение списка ссылок
    getLIst: async (api: string, params: {}) => {
      const data = await getList(props.token, params);
      setCurrentParams(data.params);
      setCount(data.count);
      setList(data.data);
    }
  };

  useSWR("/api/statistics", callbacks.getLIst, { refreshInterval: 3000 });

  return(
    <div className="container list">
      {count ? null : <Spinner text="Загрузка" />}
      {currentParams.short && <Sort onChange={callbacks.getLIst} values={currentParams} />}
      {count && <div className="list__count">Всего ссылок: {count}</div> }
      {list && <ul className="list__list">{list.map((i, index) => (<Item item={i} index={index} key={i.id}/>))}</ul>}
      <Pagination count={Math.ceil(Number(count) / 20)} onChange={callbacks.getLIst} currentPage={currentParams.page} />
    </div>
  );
};

export default List;
