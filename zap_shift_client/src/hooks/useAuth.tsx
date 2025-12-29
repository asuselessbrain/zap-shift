import { AuthContext } from "@/Context/Providers/AuthContext";
import { use } from "react";

const useAuth = () => {
    const userInfo = use(AuthContext);
    return userInfo;
};

export default useAuth;