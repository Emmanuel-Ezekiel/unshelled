import { useQuery } from "@tanstack/react-query";
import { getPostDetails } from "../services";

type Props = {
  id?: number;
};

const useGetPostDetails = ({ id }: Props) => {
  const result = useQuery({
    queryFn: async () => await getPostDetails(id),
    queryKey: ["getPostDetails", id],
  });
  return result;
};

export default useGetPostDetails;