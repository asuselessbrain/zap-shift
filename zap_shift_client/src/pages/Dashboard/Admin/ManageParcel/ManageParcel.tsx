import { FiBox } from "react-icons/fi";
import AdminDashboardHeader from "../AdminDashboardHeader";
import DashboardInformationCard from "../../Shared/DashboardInformationCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useState } from "react";
import ManageParcelTable from "./ManageParcelTable";
import { Controller, useForm, type FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import NoParcelFound from "./NoParcelFound";

const ManageParcel = () => {
    const axiosSecure = useAxiosSecure()
    const [parcelType, setParcelType] = useState("")
    const [status, setStatus] = useState("")
    const [paymentStatus, setPaymentStatus] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState("")
    const [sortOrder, setSortOrder] = useState("asc")
    const [page, setPage] = useState(1)
    const limit = 10;
    const { register, handleSubmit, control } = useForm();

    const { data: parcelsData, isPending } = useQuery({
        queryKey: ['parcelsDashboardData', parcelType, status, paymentStatus, searchTerm, sortBy, sortOrder, page, limit],
        queryFn: async () => {
            const res = await axiosSecure(`/parcels?parcelType=${parcelType}&status=${status}&paymentStatus=${paymentStatus}&searchTerm=${searchTerm}&sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&limit=${limit}`)
            return res.data.data;
        }
    })

    const { data: dashboardData, isPending: isDashboardPending } = useQuery({
        queryKey: ['manage-parcel-page-card-data'],
        queryFn: async () => {
            const res = await axiosSecure('/parcels/manage-parcel-card-data')
            return res.data.data;
        }
    })

    const dashboardCardData = [
        { title: "Ready for Rider Assignment", count: dashboardData?.readyForRiderAssignmentCount, icon: <FiBox size={24} />, bgColor: "bg-[#DBEAFE]", textColor: "text-[#155DFC]" },
        { title: "Rider Assigned", count: dashboardData?.riderAssignedCount, icon: <FiBox size={24} />, bgColor: "bg-[#FEF9C2]", textColor: "text-[#D08700]" },
        { title: "In Transit", count: dashboardData?.inTransitCount, icon: <FiBox size={24} />, bgColor: "bg-[#F3E8FF]", textColor: "text-[#9810FA]" },
        { title: "Delivered Today", count: dashboardData?.deliveredTodayCount, icon: <FiBox size={24} />, bgColor: "bg-[#DCFCE7]", textColor: "text-[#00A63E]" },
    ]

    const totalPages = parcelsData ? Math.ceil(parcelsData.meta.total / limit) : 1;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const parcelStatus = [
        { label: "All", value: "all" },
        { label: "Pending", value: "pending" },
        { label: "Ready for Rider Assignment", value: "ready-for-rider-assignment" },
        { label: "Rider Assigned", value: "rider-assigned" },
        { label: "In Transit", value: "in-transit" },
        { label: "Delivered", value: "delivered" },
        { label: "Cancelled", value: "cancelled" },
    ]

    const handleSearching = (data: FieldValues) => {
        setPage(1);
        setParcelType(data.parcelType === "all" ? "" : data.parcelType || "");
        setStatus(data.status === "all" ? "" : data.status || "");
        setPaymentStatus(data.paymentStatus === "all" ? "" : data.paymentStatus || "");
        setSearchTerm(data.search || "");
        setSortOrder(data.sortOrder || "");
        setSortBy("createdAt");
    }


    const clearFilters = () => {
        setParcelType("");
        setStatus("");
        setPaymentStatus("");
        setSearchTerm("");
        setSortOrder("");
        setSortBy("");
        setPage(1);
    }


    return (
        <div>
            <AdminDashboardHeader heading="Delivery Management" subHeading="Monitor and manage all parcel deliveries" />
            {
                isDashboardPending ?
                    <p>Loading...</p> :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {
                            dashboardCardData.map((card, index) => (<DashboardInformationCard key={index} dashboardData={card} />))
                        }
                    </div>
            }

            <form onChange={handleSubmit(handleSearching)} className="px-6 py-4 rounded-xl bg-white border border-[#F3F4F6] shadow-md my-6 flex flex-col md:flex-row items-center gap-4">
                <Input type="text" {...register("search")} placeholder="Search parcel by sender name, receiver name, parcel name..." className="w-full" />
                <Controller
                    name="parcelType"
                    control={control}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select Parcel Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select a Parcel Type</SelectLabel>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="document">Document</SelectItem>
                                    <SelectItem value="non-document">Non-Document</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                />
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
                                    {
                                        parcelStatus.map((statusOption, index) => (
                                            <SelectItem key={index} value={statusOption.value}>{statusOption.label}</SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                />
                <Controller
                    name="paymentStatus"
                    control={control}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                            <SelectTrigger className="">
                                <SelectValue placeholder="Select Payment Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select a Payment Status</SelectLabel>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="paid">Paid</SelectItem>
                                    <SelectItem value="unpaid">Unpaid</SelectItem>
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
                    <div>Loading...</div> :
                    parcelsData.meta.total === 0 ?
                        <NoParcelFound clearFilters={clearFilters} /> :
                        <ManageParcelTable data={parcelsData} page={page} setPage={setPage} pageNumbers={pageNumbers} totalPages={totalPages} />

            }
        </div >
    );
};

export default ManageParcel;