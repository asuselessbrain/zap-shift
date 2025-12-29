import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {

    const authInfo = useAuth();

    if (!authInfo) {
        return null;
    }

    const { loginWithGoogle, loading, user } = authInfo;

    const handleGoogleLogin = async () => {
        try {
            const result = await loginWithGoogle();

            console.log(result.user);
        } catch (error) {
            console.error("Google login failed:", error);
        }
    }
    return (
        <>
            {
                loading ? <Button disabled variant="outline" className="w-full disabled:cursor-no-drop py-3 rounded-md font-semibold bg-[#E9ECF1] cursor-pointer">
                    Loading...
                </Button> : <Button disabled={loading || !!user} onClick={handleGoogleLogin} variant="outline" className="w-full py-3 rounded-md font-semibold disabled:cursor-no-drop bg-[#E9ECF1] cursor-pointer">
                    <FcGoogle size={24} />
                    Login with Google
                </Button>
            }
        </>
    );
};

export default GoogleLogin;