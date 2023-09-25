import { useApi } from "../hooks/useAPI";
const pageLimit=8;
export const useGetBooks = () => {
  const { api } = useApi();
  const searchBooks = async (page,searchQuery) => {
    const offSet=(page-1)*pageLimit
    try {
      const { data } = await api.get(
        `search.json?limit=${pageLimit}&offset=${offSet}&q=${searchQuery}`,
        {}
      );
      return data;
    } catch (error) {
      throw error;
    }
  };
  const bookDetail = async (id) => {
    try {
      const { data } = await api.get(
        `works/${id}.json`,
        {}
      );
      return data;
    } catch (error) {
      throw error;
    }
  };
  return {searchBooks,bookDetail};
};
