import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useBiodata = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: biodatas = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["biodatas"],
    queryFn: async () => {
        const res = await axiosPublic.get("/biodatas");
        return res.data;
    },
  });

  return [biodatas, isLoading, refetch];
};

export default useBiodata;
