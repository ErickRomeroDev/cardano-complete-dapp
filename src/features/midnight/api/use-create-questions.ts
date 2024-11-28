import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.questions)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.questions)["$post"]>;

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      console.log({json})
      const response = await client.api.questions.$post({ json });

      if (!response.ok) {
        throw new Error("Failed to create question");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Question created");
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: () => {
      toast.error("Failed to create question");
    },
  });
  return mutation;
};
