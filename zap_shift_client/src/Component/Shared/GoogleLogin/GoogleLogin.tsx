import { Button } from "@/components/ui/button";
import { AuthContext } from "@/Context/Providers/AuthContext";
import { use } from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {

    const authContext = use(AuthContext);
    if (!authContext) {
        return null;
    }
    
    const { loginWithGoogle, loading, user } = authContext;


    const handleGoogleLogin = async () => {
        try {
            const result = await loginWithGoogle();
            console.log(loading)
            console.log(result.user);
        } catch (error) {
            console.error("Google login failed:", error);
        }
    }
    return (
        <>
            {
                loading ? <Button disabled variant="outline" className="w-full disabled:cursor-not-allowed py-3 rounded-md font-semibold bg-[#E9ECF1] cursor-pointer">
                    Loading...
                </Button> : <Button disabled={loading || !!user} onClick={handleGoogleLogin} variant="outline" className="w-full py-3 rounded-md font-semibold bg-[#E9ECF1] cursor-pointer">
                    <FcGoogle size={24} />
                    Login with Google
                </Button>
            }
        </>
    );
};

export default GoogleLogin;