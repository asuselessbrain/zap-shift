import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm, type FieldValues } from "react-hook-form";
import NoUserFound from "./NoUserFound";
import UserTable from "./UserTable";
import AdminDashboardHeader from "../AdminDashboardHeader";

export type UserRole = "admin" | "user" | "rider";

export interface IUser {
    displayName: string;
    email: string;
    photoURL?: string;
    phoneNumber?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    password: string;
    role: UserRole;
    createdAt?: string;
}

export type Data = {
    data: IUser[];
    meta: {
        total: number;
        page: number;
        limit: number;
    };
}

const ManageUsers = () => {
    const { register, handleSubmit, control } = useForm()
    const axiosSecure = useAxiosSecure()
    const [searchTerm, setSearchTerm] = useState("")
    const [role, setRole] = useState("")
    const [sortOrder, setSortOrder] = useState("")
    const [page, setPage] = useState(1);
    const limit = 10;


    const handleSearching = (data: FieldValues) => {
        setPage(1);
        setSearchTerm(data.searchTerm || "");
        setRole(data.role === "all" ? "" : data.role || "");
        setSortOrder(data.sortOrder || "");
    }

    const clearFilters = () => {
        setSearchTerm("");
        setRole("");
        setSortOrder("");
        setPage(1);
    }

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['users', searchTerm, role, sortOrder, page],
        queryFn: async () => {
            const res = await axiosSecure(`/users?searchTerm=${searchTerm}&role=${role}&sortBy=createdAt&sortOrder=${sortOrder}&limit=${limit}&skip=${page}`)
            return res.data.data
        },
    })

    const totalPages = data ? Math.ceil(data.meta.total / limit) : 1;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="text-secondary">
            <AdminDashboardHeader heading="Manage Users" subHeading="View and manage all platform users" />
            <form onChange={handleSubmit(handleSearching)} className="flex flex-col md:flex-row  items-center gap-6 bg-white px-6 py-4 rounded-lg shadow-md mb-8 border border-[#F3F4F6]">
                <Input type="text" id="searchTerm" placeholder="Search by email, name, address, city...." {...register("searchTerm")} className="w-full " />
                <Controller
                    name="role"
                    control={control}
                    render={({ field }) => {
                        return (<Select onValueChange={field.onChange} value={field.value || ""}>
                            <SelectTrigger className="max-w-[180px]">
                                <SelectValue placeholder="Select a Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select a Role</SelectLabel>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="user">Users</SelectItem>
                                    <SelectItem value="rider">Riders</SelectItem>
                                    <SelectItem value="admin">Admins</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>)
                    }}
                />

                <Controller
                    name="sortOrder"
                    control={control}
                    render={({ field }) => {
                        {
                            return (<Select onValueChange={field.onChange} value={field.value || ""}>
                                <SelectTrigger className="max-w-[180px]">
                                    <SelectValue placeholder="Sort By" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Sort By</SelectLabel>
                                        <SelectItem value="desc">Newest First</SelectItem>
                                        <SelectItem value="asc">Oldest First</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>)
                        }
                    }}
                />

            </form>
            {
                isLoading ?
                    <p>Loading...</p> :
                    data?.meta?.total === 0 ?
                        <NoUserFound clearFilters={clearFilters} /> :
                        <UserTable refetch={refetch} data={data} page={page} setPage={setPage} pageNumbers={pageNumbers} totalPages={totalPages} />
            }


        </div>
    );
};

export default ManageUsers;