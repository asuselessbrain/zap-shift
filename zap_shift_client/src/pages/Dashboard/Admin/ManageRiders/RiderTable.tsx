import { Button } from '@/components/ui/button';
import { FiCheckCircle, FiEye, FiXCircle } from 'react-icons/fi';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import type { Dispatch, SetStateAction } from 'react';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import Pagination from '../../Pagination';

export interface IRider {
    _id: string;
    name: string;
    age: number;
    email: string;
    drivingLicenseNumber: string;
    region: string;
    district: string;
    nid: string;
    contact: string;
    bikeBrandModel: string;
    status: 'pending' | 'approved' | 'rejected';
    bikeRegistrationNumber: string;
    aboutBikerYourSelf: string;
}

export type Data = {
    data: IRider[];
    meta: {
        total: number;
        page: number;
        limit: number;
    };
}

const RiderTable = ({ refetch, data, page, setPage, pageNumbers, totalPages }: { refetch: () => void, data: Data, page: number, setPage: Dispatch<SetStateAction<number>>, pageNumbers: number[], totalPages: number }) => {

    const axiosSecure = useAxiosSecure();

    const { mutate, isPending } = useMutation({
        mutationFn: async ({ riderId, status }: { riderId: string, status: 'approved' | 'rejected' }) => {
            const res = await axiosSecure.patch(`/riders/${riderId}/status`, { status });
            return res.data;
        },
        onSuccess: () => {
            refetch();
            toast.success("Rider status updated successfully");
        },
        onError: () => toast.error("Failed to update rider status")
    })

    const handleChangeStatus = (riderId: string, status: 'approved' | 'rejected') => {
        mutate({ riderId, status });
    }
    return (
        <div className="bg-white px-6 py-4 rounded-lg mb-8 shadow-md border border-[#F3F4F6]">
            <div className="flex items-center justify-between">
                <h4 className="text-lg">All Riders ({data?.meta?.total})</h4>
                {/* <Button className="text-sm px-0"><FiUsers /> Add New User</Button> */}
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
                                Region
                            </th>
                            <th scope="col" className="px-6 py-3 font-semibold">
                                District
                            </th>
                            <th scope="col" className="px-6 py-3 font-semibold">
                                NID
                            </th>
                            <th scope="col" className="px-6 py-3 font-semibold">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 font-semibold">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.data?.map((user: IRider, index: number) => (<tr key={index} className="bg-neutral-primary border-b border-default">
                                <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                    {user?.name}
                                </th>
                                <td className="px-6 py-4">
                                    {user?.email}
                                </td>
                                <td className="px-6 py-4">
                                    {user?.contact || "N/A"}
                                </td>
                                <td className="px-6 py-4">
                                    {user?.region ? user.region.charAt(0).toUpperCase() + user.region.slice(1) : "N/A"}
                                </td>
                                <td className="px-6 py-4">
                                    {user?.district ? user.district.charAt(0).toUpperCase() + user.district.slice(1) : "N/A"}
                                </td>
                                <td className="px-6 py-4">
                                    {user?.nid || "N/A"}
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-2 py-1 rounded text-white ${user?.status === "rejected"
                                            ? "bg-red-500"
                                            : user?.status === "approved"
                                                ? "bg-green-500"
                                                : user?.status === "pending"
                                                    ? "bg-blue-500"
                                                    : "bg-gray-500"
                                            }`}
                                    >
                                        {user?.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 gap-4 flex">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" className="hover:bg-secondary hover:text-white transition-all duration-500">< FiEye /> View Details</Button>
                                        </DialogTrigger>
                                    </Dialog>
                                    {
                                        user.status === "pending" && (<>
                                            <Button disabled={isPending} className="border-none cursor-pointer disabled:cursor-no-drop" onClick={() => handleChangeStatus(user._id, "approved")}><FiCheckCircle />Approve</Button>
                                            <Button disabled={isPending} className="border-none bg-red-500 hover:bg-red-700 text-white transition-all duration-500 cursor-pointer disabled:cursor-no-drop" onClick={() => handleChangeStatus(user._id, "rejected")}><FiXCircle /> Reject</Button></>)
                                    }

                                </td>
                            </tr>))
                        }
                    </tbody>
                </table>
            </div>
            {/* <div className="flex items-center justify-between mt-4">
                <div className="flex gap-2">
                    <Button
                        disabled={page <= 1}
                        onClick={() => setPage((prev: number) => prev - 1)}
                        variant="outline"
                    >
                        Previous
                    </Button>

                    {pageNumbers.map((num: number) => (
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
                        onClick={() => setPage((prev: number) => prev + 1)}
                        variant="outline"
                    >
                        Next
                    </Button>
                </div>

                <span>
                    Page {page} of {totalPages}
                </span>
            </div> */}
            <Pagination page={page} setPage={setPage} pageNumbers={pageNumbers} totalPages={totalPages} />
        </div>
    );
};

export default RiderTable;