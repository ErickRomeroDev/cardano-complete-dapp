import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export const useGetQuestions = () => {
  const query = useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const response = await client.api.questions.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch workspaces")
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};