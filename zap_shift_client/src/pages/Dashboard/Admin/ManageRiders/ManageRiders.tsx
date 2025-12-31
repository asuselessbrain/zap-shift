import { FiCheckCircle, FiTruck, FiXCircle } from "react-icons/fi";
import AdminDashboardHeader from "../AdminDashboardHeader";
import { Input } from "@/components/ui/input";
import { Controller, useForm, useWatch, type FieldValues } from "react-hook-form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLoaderData } from "react-router";
import type { CoverageArea } from "@/pages/Covarage/Covarage";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useState } from "react";
import RiderTable from "./RiderTable";
import NoRiderFound from "./NoRiderFound";
import DashboardCardFormate from "../../Shared/DashboardCardFormate";

const ManageRiders = () => {
    const { register, handleSubmit, control } = useForm()
    const axiosSecure = useAxiosSecure()
    const [status, setStatus] = useState("")
    const [region, setRegion] = useState("")
    const [city, setCity] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [sortOrder, setSortOrder] = useState("")
    const limit = 10;
    const [page, setPage] = useState(1);


    const regions: CoverageArea[] = useLoaderData();

    const uniqueRegions = Array.from(new Set(regions.map(region => region.region)))
    const watchRegion = useWatch({ name: "region", control });

    const districts = regions.filter(region => region.region.toLowerCase() === (watchRegion || "").toLowerCase()).map(region => region.district)


    const { data, isPending, refetch } = useQuery({
        queryKey: ['riders', status, region, city, searchTerm, sortOrder, page],
        queryFn: async () => {
            const res = await axiosSecure(`/riders?status=${status}&region=${region}&city=${city}&searchTerm=${searchTerm}&sortBy=createdAt&sortOrder=${sortOrder}&limit=${limit}&skip=${page}`)
            return res.data.data
        }
    })

    const { data: dashboardData, isPending: isDashboardPending } = useQuery({
        queryKey: ['rider-dashboard-data'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders/dashboard-data');
            return res.data.data;
        }
    })

    const handleSearching = (data: FieldValues) => {
        setPage(1);
        setSearchTerm(data.search || "");
        setStatus(data.status === "all" ? "" : data.status || "");
        setRegion(data.region === "all" ? "" : data.region || "");
        setCity(data.city === "all" ? "" : data.city || "");
        setSortOrder(data.sortOrder || "");
    }

    const clearFilters = () => {
        setSearchTerm("");
        setStatus("");
        setRegion("");
        setCity("");
        setSortOrder("");
        setPage(1);
    }

    const totalPages = data ? Math.ceil(data.meta.total / limit) : 1;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const dashboardCardData = [
        { title: "Approved Riders", count: dashboardData?.acceptedRiders, icon: <FiCheckCircle size={24} />, bgColor: "bg-[#DCFCE7]", textColor: "text-[#00A63E]" },
        { title: "Pending Approval", count: dashboardData?.pendingRiders, icon: <FiTruck size={24} />, bgColor: "bg-[#FEF9C2]", textColor: "text-[#D08700]" },
        { title: "Rejected", count: dashboardData?.rejectedRiders, icon: <FiXCircle size={24} />, bgColor: "bg-[#FFE2E2]", textColor: "text-[#E7000B]" },
    ]

    return (
        <div className="text-secondary">
            <AdminDashboardHeader heading="Manage Riders" subHeading="Approve, reject, and manage delivery riders" />
            {
                isDashboardPending ?
                    <div>Loading...</div> :
                    <DashboardCardFormate dashboardCardData={dashboardCardData} />
            }


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
                    name="region"
                    control={control}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select Region" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select a Region</SelectLabel>
                                    <SelectItem value="all">All</SelectItem>
                                    {
                                        uniqueRegions.map((region, index) => (
                                            <SelectItem key={index} value={region.toLocaleLowerCase()}>{region}</SelectItem>
                                        ))
                                    }
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
                <Controller
                    name="sortOrder"
                    control={control}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select Sort Order" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select a Sort Order</SelectLabel>
                                    <SelectItem value="desc">Newest First</SelectItem>
                                    <SelectItem value="asc">Oldest First</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                />
            </form>

            {
                isPending ?
                    <p>Loading...</p> :
                    data?.length === 0 ?
                        <NoRiderFound clearFilters={clearFilters} /> :
                        <RiderTable refetch={refetch} data={data} page={page} setPage={setPage} pageNumbers={pageNumbers} totalPages={totalPages} />
            }

        </div>
    );
};

export default ManageRiders;