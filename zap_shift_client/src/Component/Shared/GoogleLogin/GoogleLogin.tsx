import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";

const GoogleLogin = () => {

    const authInfo = useAuth();
    const axiosSecure = useAxiosSecure();
    const location = useLocation()
    const navigate = useNavigate()

    if (!authInfo) {
        return null;
    }

    const { loginWithGoogle, loading, user, logOut } = authInfo;

    const handleGoogleLogin = async () => {
        try {
            const result = await loginWithGoogle();
            const u = result.user;

            // Prepare payload for backend user creation/sync
            const payload = {
                displayName: u.displayName ?? "",
                email: u.email,
                photoURL: u.photoURL ?? "",
                // Backend requires a password; use Firebase UID as a stable placeholder
                password: u.uid,
            };

            try {
                await axiosSecure.post("/users", payload);
                navigate(location.state || "/")
                toast.success("Logged in successfully");
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch(syncErr: any) {
                await logOut()
                console.log(syncErr)
            }
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