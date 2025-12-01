import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import personIcon from "@/assets/image-upload-icon.png"

const Register = () => {
    return (
        <div className="max-w-md ml-16 mt-16">
            <h2 className="font-extrabold text-5xl">Create an Account</h2>
            <p className="my-2">Register with ZapShift</p>
            <form>
                <div className="mt-4">
                    <label htmlFor="name" className="block mb-2 font-semibold"><img src={personIcon} alt="Upload Icon" /></label>
                    <input type="file" id="name" className="w-full border border-gray-300 rounded-md p-2 hidden" />
                </div>
                <div className="mt-4">
                    <label htmlFor="name" className="block mb-2 font-semibold">Name</label>
                    <input type="text" id="name" className="w-full border border-gray-300 rounded-md p-2" placeholder="Name" />
                </div>
                <div className="my-4">
                    <label htmlFor="email" className="block mb-2 font-semibold">Email</label>
                    <input type="email" id="email" className="w-full border border-gray-300 rounded-md p-2" placeholder="Email" />
                </div>
                <div className="my-4">
                    <label htmlFor="password" className="block mb-2 font-semibold">Password</label>
                    <input type="password" id="password" className="w-full border border-gray-300 rounded-md p-2" placeholder="Password" />
                </div>
                <div className="my-4">
                    <label htmlFor="confirmPassword" className="block mb-2 font-semibold">Confirm Password</label>
                    <input type="password" id="confirmPassword" className="w-full border border-gray-300 rounded-md p-2" placeholder="Confirm Password" />
                </div>
                <input type="submit" value="Register" className="bg-primary w-full py-3 rounded-md my-4 font-semibold" />
                <p className="text-[#71717A] my-4 text-sm">Don’t have any account? <Link to="/auth/login" className="text-[#8FA748]">Login</Link></p>
                <p className="my-6 flex items-center justify-center">OR</p>
                <Button variant="outline" className="w-full py-3 rounded-md font-semibold bg-[#E9ECF1] cursor-pointer">
                    <FcGoogle size={24} />
                    Login with Google</Button>
            </form>
        </div>
    );
};

export default Register;