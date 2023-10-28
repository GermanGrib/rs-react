import { MAX_CARDS_PER_PAGE } from '../../const';

interface IAxiosParams {
  url: string;
  options?: {
    searchString?: string;
    pageNumber?: number;
    itemsLimit?: number;
    searchID?: number;
  };
}

export async function axios<T>({ url, options }: IAxiosParams): Promise<T> {
  try {
    if (options) {
      const { searchString, itemsLimit, searchID } = options;
      let { pageNumber } = options;
      let fetchUrl = url;

      if (pageNumber) {
        pageNumber *= MAX_CARDS_PER_PAGE - MAX_CARDS_PER_PAGE;
      }

      if (searchString) {
        fetchUrl += `/${searchString}`;
      }

      if (searchID) {
        fetchUrl += `/${searchID}`;
      }

      if (itemsLimit) {
        fetchUrl += `?limit=${itemsLimit}`;
      }

      if (pageNumber) {
        fetchUrl += `&offset=${pageNumber}`;
      }

      const response = await fetch(fetchUrl);
      return await response.json();
    }
    return await fetch(url).then((response) => response.json());
  } catch (error) {
    throw new Error('During axios');
  }
}
