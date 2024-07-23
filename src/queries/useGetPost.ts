import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../services";
import { PostTypes } from "../interfaces";

const useGetPost = () => {
  const result = useQuery<PostTypes[]>({
    queryFn: getPosts,
    queryKey: ["posts"],
  });
  return result;
};

export default useGetPost;
