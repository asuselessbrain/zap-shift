import GoogleLogin from "@/Component/Shared/GoogleLogin/GoogleLogin";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { useForm, type FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const authContext = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    console.log(location)

    if (!authContext) {
        return null;
    }

    const { signInUser, loading, user } = authContext;

    const handleLoginForm = async (data: FieldValues) => {
        try {
            const result = await signInUser(data.email, data.password);
            if (result.user) {
                navigate(location.state || "/");
                toast.success("Login successful");
            }
        } catch (error) {
            toast.error("Login failed. Please check your credentials and try again.");
        }
    }

    return (
        <div className="m-16 max-w-md">
            <h2 className="font-extrabold text-5xl">Welcome Back</h2>
            <p className="my-2">Login with ZapShift</p>
            <form onSubmit={handleSubmit(handleLoginForm)}>
                <div className="mt-4">
                    <label htmlFor="email" className="block mb-2 font-semibold">Email</label>
                    <input type="email" id="email" {...register("email", { required: true })} className="w-full border border-gray-300 rounded-md p-2" placeholder="Email" />
                    {
                        errors.email && <span className="text-red-500 mt-2">This field is required</span>
                    }
                </div>
                <div className="my-4">
                    <label htmlFor="password" className="block mb-2 font-semibold">Password</label>
                    <input type="password" id="password" {...register("password", { required: true })} className="w-full border border-gray-300 rounded-md p-2" placeholder="Password" />
                    {
                        errors.password && <span className="text-red-500 mt-2">This field is required</span>
                    }
                </div>
                <p className="my-4 text-[#71717A] text-sm">Forget Password?</p>
                {
                    loading ? <Button disabled className="bg-primary disabled:cursor-no-drop w-full py-3 rounded-md my-4 font-semibold">Loading...</Button> : <input disabled={loading || !!user} type="submit" value="Login" className="bg-primary cursor-pointer disabled:cursor-no-drop w-full py-3 rounded-md my-4 font-semibold" />
                }
                <p className="text-[#71717A] my-4 text-sm">Don’t have any account? <Link to="/auth/register" className="text-[#8FA748]">Register</Link></p>
                <p className="my-6 flex items-center justify-center">OR</p>
            </form>
            <GoogleLogin />
        </div>
    );
};

export default Login;