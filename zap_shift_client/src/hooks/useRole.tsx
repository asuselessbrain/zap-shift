import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRole = (email: string) => {
    const axiosSecure = useAxiosSecure();
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['role', email],
        enabled: !!email,
        queryFn: async ({ queryKey }) => {
            const [, email] = queryKey;
            const res = await axiosSecure(`/users/role/${email}`)
            return res.data.data.role
        }
    })
    return { role: data, isLoading, refetch };
};

export default useRole;