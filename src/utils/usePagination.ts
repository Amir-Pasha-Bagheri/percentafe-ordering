import { useEffect, useState } from 'react';

type PaginationConfig<T> = {
  countPerPage: number;
  data: T[];
  page: number;
};

type Pagination<T> = {
  data: T[];
  pageCount: number;
};

function cloneDeep<T>(object: T): T {
  return JSON.parse(JSON.stringify(object));
}

export default function usePagination<T>(config: PaginationConfig<T>): Pagination<T> {
  const [pageCount, setPageCount] = useState<number>(0);
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    /**
     * When user is at first page : page === 1, so the start index would be 0 !
     */
    const zeroIndexPage = config.page - 1;
    const startIndex = zeroIndexPage * config.countPerPage;
    const endIndex = zeroIndexPage * config.countPerPage + config.countPerPage;
    const copy = cloneDeep(config.data);

    setData(copy.slice(startIndex, endIndex));
  }, [config.countPerPage, config.data, config.page]);

  useEffect(() => {
    setPageCount(Math.ceil(config.data.length / config.countPerPage));
  }, [config.countPerPage, config.data.length]);

  return { data, pageCount };
}
