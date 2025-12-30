import { Link, useNavigate } from "react-router";
import personIcon from "@/assets/image-upload-icon.png"
import useAuth from "@/hooks/useAuth";
import { useForm, type FieldValues } from "react-hook-form";
import GoogleLogin from "@/Component/Shared/GoogleLogin/GoogleLogin";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [preview, setPreview] = useState<string | null>(null);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure()

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: FieldValues) => axiosSecure.post('/users', data),
        onSuccess: () => {
            navigate("/");
            toast.success("User registered successfully");
        },
        onError: async() => {
            await logOut()
            toast.error("Sign up failed. Please try again.");
        },

    })

    const authContext = useAuth();
    if (!authContext) {
        return null;
    }

    const { signUpUser, updateUserProfile, loading, user, logOut } = authContext;



    const handleSignUpUser = async (data: FieldValues) => {
        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (data.password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        if (data.password.search(/[A-Z]/) < 0) {
            toast.error("Password must contain at least one uppercase letter");
            return;
        }

        if (data.password.search(/[0-9]/) < 0) {
            toast.error("Password must contain at least one number");
            return;
        }

        if (data.password.search(/[^A-Za-z0-9]/) < 0) {
            toast.error("Password must contain at least one special character");
            return;
        }

        if (data.password.search(/[a-z]/) < 0) {
            toast.error("Password must contain at least one lowercase letter");
            return;
        }

        const profilePhoto = data.profileImg[0];

        const image_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_API_KEY}`;

        const formData = new FormData();

        formData.append("image", profilePhoto);

        const res = await fetch(image_api_url, {
            method: "POST",
            body: formData,
        })

        const photoData = await res.json();

        const photoURL = photoData.data.url;
        const updateInfo = {
            displayName: data.name,
            photoURL
        }
        try {
            const result = await signUpUser(data.email, data.password);
            if (result.user) {
                await updateUserProfile(updateInfo);
                mutate({
                    displayName: data.name,
                    email: data.email,
                    photoURL,
                    password: data.password,
                });
            }
        } catch (error) {
            console.error("Sign up failed:", error);
        }
    }

    return (
        <div className="max-w-md ml-16 mt-16">
            <h2 className="font-extrabold text-5xl">Create an Account</h2>
            <p className="my-2">Register with ZapShift</p>
            <form onSubmit={handleSubmit(handleSignUpUser)}>
                {
                    preview ? <img src={preview} alt="Profile Preview" className="w-12 h-12 rounded-full object-cover mb-4" /> : <div className="mt-4">
                        <label htmlFor="profileImg" className="block mb-2 font-semibold"><img src={personIcon} alt="Upload Icon" /></label>
                        <input type="file" id="profileImg" {...register("profileImg", {
                            required: true,
                            onChange: (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setPreview(URL.createObjectURL(file));
                                }
                            }
                        })} className="w-full border border-gray-300 rounded-md p-2 hidden" />
                        {
                            errors.profileImg && <span className="text-red-500 mt-2">This field is required</span>
                        }
                    </div>
                }

                <div className="mt-4">
                    <label htmlFor="name" className="block mb-2 font-semibold">Name</label>
                    <input type="text" id="name" {...register("name", { required: true })} className="w-full border border-gray-300 rounded-md p-2" placeholder="Name" />
                    {
                        errors.name && <span className="text-red-500 mt-2">This field is required</span>
                    }
                </div>
                <div className="my-4">
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
                <div className="my-4">
                    <label htmlFor="confirmPassword" className="block mb-2 font-semibold">Confirm Password</label>
                    <input type="password" id="confirmPassword" {...register("confirmPassword", { required: true })} className="w-full border border-gray-300 rounded-md p-2" placeholder="Confirm Password" />
                    {
                        errors.confirmPassword && <span className="text-red-500 mt-2">This field is required</span>
                    }
                </div>
                {
                    loading || isPending ? <Button disabled className="bg-primary disabled:cursor-no-drop w-full py-3 rounded-md my-4 font-semibold">Loading...</Button> : <input disabled={loading || !!user || isPending} type="submit" value="Register" className="bg-primary cursor-pointer disabled:cursor-no-drop w-full py-3 rounded-md my-4 font-semibold" />
                }
                <p className="text-[#71717A] my-4 text-sm">Don’t have any account? <Link to="/auth/login" className="text-[#8FA748]">Login</Link></p>
                <p className="my-6 flex items-center justify-center">OR</p>
            </form>
            <GoogleLogin />
        </div>
    );
};

export default Register;