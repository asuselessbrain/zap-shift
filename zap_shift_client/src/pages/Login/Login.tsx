import GoogleLogin from "@/Component/Shared/GoogleLogin/GoogleLogin";
import { useForm, type FieldValues } from "react-hook-form";
import { Link } from "react-router";

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleLoginForm = (data: FieldValues) => {
        console.log(data);
    }

    return (
        <div className="m-16 max-w-md">
            <h2 className="font-extrabold text-5xl">Welcome Back</h2>
            <p className="my-2">Login with ZapShift</p>
            <form onSubmit={handleSubmit(handleLoginForm)}>
                <div className="mt-4">
                    <label htmlFor="email" className="block mb-2 font-semibold">Email</label>
                    <input type="email" id="email" {...register("email")} className="w-full border border-gray-300 rounded-md p-2" placeholder="Email" />
                </div>
                <div className="my-4">
                    <label htmlFor="password" className="block mb-2 font-semibold">Password</label>
                    <input type="password" id="password" {...register("password")} className="w-full border border-gray-300 rounded-md p-2" placeholder="Password" />
                </div>
                <p className="my-4 text-[#71717A] text-sm">Forget Password?</p>
                <input type="submit" value="Login" className="bg-primary w-full py-3 rounded-md my-4 font-semibold" />
                <p className="text-[#71717A] my-4 text-sm">Don’t have any account? <Link to="/auth/register" className="text-[#8FA748]">Register</Link></p>
                <p className="my-6 flex items-center justify-center">OR</p>
            </form>
            <GoogleLogin />
        </div>
    );
};

export default Login;