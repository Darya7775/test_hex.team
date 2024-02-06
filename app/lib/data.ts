import type { QueryParams } from "../ui/types";

let newParams: QueryParams;
let params: QueryParams = {
  short: "desc_short",
  target: "desc_target",
  counter: "desc_counter",
  offset: 0,
  page: 1
};

if (typeof window !== 'undefined' && localStorage?.getItem("queryParams")) {
  params = JSON.parse(localStorage.getItem("queryParams") as string);
}

export const getList = async(token: string, queryparams = {}) => {
  if (queryparams) {
    newParams = {
      ...params,
      ...queryparams
    };

    params = newParams;
  }

  // Сохранить параметры в адрес страницы
  const urlSearch = `order=${params.short}&order=${params.target}&order=${params.counter}&offset=${params.offset}&limit=20&page=${params.page}`;
  const url = (urlSearch ? `?${urlSearch}`: "") + window.location.hash;
  window.history.replaceState({}, "", url);
  // Сохранить параметры в localstorage
  localStorage.setItem("queryParams", JSON.stringify(newParams));

  const response = await fetch(`https://front-test.hex.team/api/statistics?order=${params.short}&order=${params.target}&order=${params.counter}&offset=${params.offset}&limit=20`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (response.ok) {
    const count = response.headers.get("X-Total-Count");
    const data = await response.json();
    return { data, count, params };
  } else {
    const error = await response.json();
    throw new Error(error.detail);
  }
};

export const getShortLink = async (link: string, token: string) => {
  const response = await fetch(`https://front-test.hex.team/api/squeeze?link=${link}`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const error = await response.json();
    throw new Error(error.detail);
  }
};
