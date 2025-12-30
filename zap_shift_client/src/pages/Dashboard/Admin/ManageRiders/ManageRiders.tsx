import { FiCheckCircle, FiTruck, FiXCircle } from "react-icons/fi";
import AdminDashboardHeader from "../AdminDashboardHeader";
import { Input } from "@/components/ui/input";
import { Controller, useForm, type FieldValues } from "react-hook-form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLoaderData } from "react-router";
import type { CoverageArea } from "@/pages/Covarage/Covarage";

const ManageRiders = () => {
    const { register, handleSubmit, control } = useForm()

    const regions: CoverageArea[] = useLoaderData();

    const districts = regions.map(region => region.district);

    const handleSearching = (data: FieldValues) => {
        console.log(data);
    }

    return (
        <div className="text-secondary">
            <AdminDashboardHeader heading="Manage Riders" subHeading="Approve, reject, and manage delivery riders" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-center justify-between bg-white p-6 rounded-xl border border-[#F3F4F6] shadow-md">
                    <div>
                        <p>Approved Riders</p>
                        <h5 className="text-3xl text-black">2</h5>
                    </div>
                    <div className="bg-[#DCFCE7] rounded-xl text-[#00A63E] p-4">
                        <FiCheckCircle size={24} />
                    </div>
                </div>
                <div className="flex items-center justify-between bg-white p-6 rounded-xl border border-[#F3F4F6] shadow-md">
                    <div>
                        <p>Approved Riders</p>
                        <h5 className="text-3xl text-black">2</h5>
                    </div>
                    <div className="bg-[#FEF9C2] rounded-xl text-[#D08700] p-4">
                        <FiTruck size={24} />
                    </div>
                </div>
                <div className="flex items-center justify-between bg-white p-6 rounded-xl border border-[#F3F4F6] shadow-md">
                    <div>
                        <p>Approved Riders</p>
                        <h5 className="text-3xl text-black">2</h5>
                    </div>
                    <div className="bg-[#FFE2E2] rounded-xl text-[#E7000B] p-4">
                        <FiXCircle size={24} />
                    </div>
                </div>
            </div>

            <form onChange={handleSubmit(handleSearching)} className="px-6 py-4 rounded-xl bg-white border border-[#F3F4F6] shadow-md my-6 flex flex-col md:flex-row items-center gap-4">
                <Input type="text" {...register("search")} placeholder="Search riders by name, email, city..." className="w-full" />
                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select a Status</SelectLabel>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                />
                <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select City" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select a City</SelectLabel>
                                    <SelectItem value="all">All</SelectItem>
                                    {
                                        districts.map((district, index) => (
                                            <SelectItem key={index} value={district.toLocaleLowerCase()}>{district}</SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                />
            </form>
            
        </div>
    );
};

export default ManageRiders;