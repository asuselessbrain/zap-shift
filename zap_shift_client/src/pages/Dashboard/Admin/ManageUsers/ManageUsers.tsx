import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm, type FieldValues } from "react-hook-form";
import { FiEdit, FiUsers } from "react-icons/fi";
import UpdateUserRoleModal from "./UpdateUserRoleModal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

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

    const { data, isLoading } = useQuery({
        queryKey: ['users', searchTerm, role, sortOrder, page],
        queryFn: async () => {
            const res = await axiosSecure(`/users?searchTerm=${searchTerm}&role=${role}&sortBy=createdAt&sortOrder=${sortOrder}&limit=${limit}&skip=${page}`)
            return res.data.data
        },
    })

    const totalPages = data ? Math.ceil(data.meta.total / limit) : 1;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="text-secondary">
            <h2 className="uppercase text-3xl">Manage Users</h2>
            <p className="mt-2 mb-8 text-[#4A5565]">View and manage all platform users</p>
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
            <div className="bg-white px-6 py-4 rounded-lg mb-8 shadow-md border border-[#F3F4F6]">
                <div className="flex items-center justify-between">
                    <h4 className="text-lg">All Users ({data?.meta?.total})</h4>
                    <Button className="text-sm px-0"><FiUsers /> Add New User</Button>
                </div>

                <div className="border-t border-[#F3F4F6] my-6"></div>

                <div className="relative overflow-x-auto rounded-xl border border-[#F3F4F6]">
                    <table className="w-full text-sm text-left rtl:text-right text-body">
                        <thead className="text-sm text-body bg-[#F3F4F6] border-b border-[#F3F4F6]">
                            <tr>
                                <th scope="col" className="px-6 py-3 font-semibold">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 font-semibold">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 font-semibold">
                                    Phone Number
                                </th>
                                <th scope="col" className="px-6 py-3 font-semibold">
                                    City
                                </th>
                                <th scope="col" className="px-6 py-3 font-semibold">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3 font-semibold">
                                    Joined
                                </th>
                                <th scope="col" className="px-6 py-3 font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.data?.map((user: IUser, index: number) => (<tr key={index} className="bg-neutral-primary border-b border-default">
                                    <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                        {user?.displayName}
                                    </th>
                                    <td className="px-6 py-4">
                                        {user?.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user?.phoneNumber || "N/A"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user?.city || "N/A"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2 py-1 rounded text-white ${user?.role === "admin"
                                                ? "bg-red-500"
                                                : user?.role === "user"
                                                    ? "bg-green-500"
                                                    : user?.role === "rider"
                                                        ? "bg-blue-500"
                                                        : "bg-gray-500"
                                                }`}
                                        >
                                            {user?.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                                    </td>
                                    <td className="px-6 py-4 gap-4 flex">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" className="hover:bg-secondary hover:text-white transition-all duration-500">< FiEdit /> Edit Role</Button>
                                            </DialogTrigger>
                                            <UpdateUserRoleModal user={user} />
                                        </Dialog>
                                        <Button className="border-none bg-red-500 hover:bg-red-700 text-white transition-all duration-500">Suspend</Button>
                                    </td>
                                </tr>))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-2">
                        <Button
                            disabled={page <= 1}
                            onClick={() => setPage(prev => prev - 1)}
                            variant="outline"
                        >
                            Previous
                        </Button>

                        {pageNumbers.map((num) => (
                            <Button
                                key={num}
                                onClick={() => setPage(num)}
                                variant={num === page ? "default" : "outline"}
                                className={num === page ? "bg-primary text-white" : ""}
                            >
                                {num}
                            </Button>
                        ))}

                        <Button
                            disabled={page >= totalPages}
                            onClick={() => setPage(prev => prev + 1)}
                            variant="outline"
                        >
                            Next
                        </Button>
                    </div>

                    <span>
                        Page {page} of {totalPages}
                    </span>
                </div>
            </div>

        </div>
    );
};

export default ManageUsers;