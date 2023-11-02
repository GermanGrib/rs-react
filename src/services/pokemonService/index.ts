interface IAxiosParams {
  url: string;
  options?: {
    searchString?: string;
    offset?: string;
    itemsLimit?: string;
    searchID?: number;
  };
}

export async function axios<T>({ url, options }: IAxiosParams): Promise<T> {
  try {
    if (options) {
      const { searchString, itemsLimit, searchID } = options;
      const { offset = 0 } = options;
      let fetchUrl = url;

      if (offset) {
        fetchUrl += `?limit=${itemsLimit}&offset=${offset}`;
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
