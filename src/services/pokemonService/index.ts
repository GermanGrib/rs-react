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
      const { pageNumber } = options;
      let fetchUrl = url;

      if (pageNumber) {
        fetchUrl += `?limit=${itemsLimit}&offset=${pageNumber}`;
      }

      if (searchString) {
        fetchUrl += `/${searchString}`;
      }

      if (searchID) {
        fetchUrl += `/${searchID}`;
      }

      const response = await fetch(fetchUrl);
      return await response.json();
    }
    return await fetch(url).then((response) => response.json());
  } catch (error) {
    throw new Error('During axios');
  }
}
