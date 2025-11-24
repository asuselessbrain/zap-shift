import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLoaderData } from "react-router";
import type { CoverageArea } from "../Covarage/Covarage";
import { Controller, useForm, useWatch } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea";
import image from "../../assets/agent-pending.png"
import Header from "@/Component/Shared/Header/Header";

const BeARider = () => {
    const areas: CoverageArea[] = useLoaderData()

    const { register, handleSubmit, control, formState: { errors } } = useForm()

    const regionsWithDuplicate = areas.map(area => area.region)
    const regionsWithOutDuplicate = Array.from(new Set(regionsWithDuplicate))

    const watchRegion = useWatch({ control, name: "region" })

    const districts = areas.filter(area => area.region.toLowerCase() === watchRegion).map(area => area.district)

    const handleBeARider = (data) => {
        console.log(data)
    }


    return (
        <section className="max-w-[1440px] mx-auto px-24 py-20 bg-white rounded-2xl my-8 flex flex-col lg:flex-row gap-12 items-center">
            <div>
                <Header title="Be a Rider" description="Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time." />
                <h3 className="text-3xl font-extrabold mb-6">Tell us about yourself</h3>

                <form onSubmit={handleSubmit(handleBeARider)}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6">
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="name">Your Name</Label>
                            <Input {...register("name", { required: true, minLength: 3, maxLength: 50 })} type="text" id="name" placeholder="Your Name" />
                            {
                                errors.name?.type === "required" ? <span className="text-red-500">This field is required</span> :
                                    errors.name?.type === "minLength" ? <span className="text-red-500">Name must be at least 3 characters</span> :
                                        errors.name?.type === "maxLength" ? <span className="text-red-500">Name must be at most 50 characters</span> : null
                            }
                        </div>
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="age">Your Age</Label>
                            <Input {...register("age", { required: true, min: 18, max: 100 })} type="number" id="age" placeholder="Your Age" />
                            {
                                errors.age?.type === "required" ? <span className="text-red-500">This field is required</span> :
                                    errors.age?.type === "min" ? <span className="text-red-500">Age must be at least 18</span> :
                                        errors.age?.type === "max" ? <span className="text-red-500">Age must be at most 100</span> : null
                            }
                        </div>
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="email">Your Email</Label>
                            <Input {...register("email", { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })} type="email" id="email" placeholder="Your Email" />
                            {
                                errors.email?.type === "required" ? <span className="text-red-500">This field is required</span> :
                                    errors.email?.type === "pattern" ? <span className="text-red-500">Invalid email address</span> : null
                            }
                        </div>
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="drivingLicenseNumber">Driving License Number</Label>
                            <Input {...register("drivingLicenseNumber", { required: true, minLength: 14, maxLength: 20, pattern: /^(0[1-9]|[1-5][0-9]|6[0-4])-(19|20)\d{2}-\d{6}$/ })} type="string" id="drivingLicenseNumber" placeholder="Your Driving License Number" />
                            {
                                errors.drivingLicenseNumber?.type === "required" ? <span className="text-red-500">This field is required</span> :
                                    errors.drivingLicenseNumber?.type === "minLength" ? <span className="text-red-500">Driving License Number must be at least 14 characters</span> :
                                        errors.drivingLicenseNumber?.type === "maxLength" ? <span className="text-red-500">Driving License Number must be at most 20 characters</span> :
                                            errors.drivingLicenseNumber?.type === "pattern" ? <span className="text-red-500">Invalid Driving License Number format (e.g., 12-2020-123456)</span> : null
                            }
                        </div>
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="region">Your Region</Label>
                            <Controller
                                name="region"
                                control={control}
                                rules={{required: true}}
                                render={({ field }) => {
                                    return (<Select onValueChange={field.onChange} value={field.value || ""}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Your Region" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Region</SelectLabel>
                                                {
                                                    regionsWithOutDuplicate.map((region: string) => (
                                                        <SelectItem key={region} value={region.toLowerCase()}>{region}</SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>)
                                }}
                            >
                            </Controller>
                            {
                                errors.region?.type === "required" ? <span className="text-red-500">This field is required</span> : null
                            }
                        </div>
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="district">Your District</Label>
                            <Controller
                                name="district"
                                control={control}
                                rules={{required: true}}
                                render={({ field }) => {
                                    return (<Select onValueChange={field.onChange} value={field.value || ""}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Your District" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Districts</SelectLabel>
                                                {
                                                    districts.map((district: string) => (
                                                        <SelectItem key={district} value={district.toLowerCase()}>{district}</SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>)
                                }}
                            >

                            </Controller>
                            {
                                errors.district?.type === "required" ? <span className="text-red-500">This field is required</span> : null
                            }
                        </div>
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="nid">NID Number</Label>
                            <Input {...register("nid", {required: true})} type="text" id="nid" placeholder="NID Number" />
                            {
                                errors.nid?.type === "required" ? <span className="text-red-500">This field is required</span> : null
                            }
                        </div>
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="contact">Contact</Label>
                            <Input {...register("contact", {required: true, maxLength: 11, minLength: 11, pattern: /^01[3-9]\d{8}$/ })} type="text" id="contact" placeholder="01XXXXXXXXX" />
                            {
                                errors.contact?.type === "required" ? <span className="text-red-500">This field is required</span> :
                                    errors.contact?.type === "minLength" ? <span className="text-red-500">Contact must be 11 characters</span> :
                                        errors.contact?.type === "maxLength" ? <span className="text-red-500">Contact must be 11 characters</span> : 
                                            errors.contact?.type === "pattern" ? <span className="text-red-500">Invalid contact number format (e.g., 01XXXXXXXXX)</span> : null
                            }
                        </div>
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="bikeBrandModel">Bike Brand and Model</Label>
                            <Input {...register("bikeBrandModel", {required: true})} type="text" id="bikeBrandModel" placeholder="Bike Brand and Model" />
                            {
                                errors.bikeBrandModel?.type === "required" ? <span className="text-red-500">This field is required</span> : null
                            }
                        </div>
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="bikeRegistrationNumber">Bike Registration Number</Label>
                            <Input {...register("bikeRegistrationNumber", {required: true})} type="text" id="bikeRegistrationNumber" placeholder="Bike Registration Number" />
                            {
                                errors.bikeRegistrationNumber?.type === "required" ? <span className="text-red-500">This field is required</span> : null
                            }
                        </div>
                        <div className="grid w-full items-center gap-3 col-span-1 lg:col-span-2">
                            <Label htmlFor="aboutBikerYourSelf">Tell us about yourself</Label>
                            <Textarea {...register("aboutBikerYourSelf", {required: true})} id="aboutBikerYourSelf" placeholder="Tell us about yourself" />
                            {
                                errors.aboutBikerYourSelf?.type === "required" ? <span className="text-red-500">This field is required</span> : null
                            }
                        </div>
                    </div>
                    <input type="submit" value="Submit" className="text-secondary bg-primary w-full rounded-lg mt-8 py-2" />
                </form>
            </div>
            <img src={image} alt="Agent Pending" />
        </section>
    );
};

export default BeARider;