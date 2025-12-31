import { Button } from '@/components/ui/button';
import { FiCheckCircle, FiEye, FiSettings, FiXCircle } from 'react-icons/fi';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import type { Dispatch, SetStateAction } from 'react';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import Pagination from '../../Shared/Pagination';

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

const ManageParcelTable = ({ data, page, setPage, pageNumbers, totalPages }: { data: Data, page: number, setPage: Dispatch<SetStateAction<number>>, pageNumbers: number[], totalPages: number }) => {

    // const axiosSecure = useAxiosSecure();

    // const { mutate, isPending } = useMutation({
    //     mutationFn: async ({ riderId, status }: { riderId: string, status: 'approved' | 'rejected' }) => {
    //         const res = await axiosSecure.patch(`/riders/${riderId}/status`, { status });
    //         return res.data;
    //     },
    //     onSuccess: () => {
    //         refetch();
    //         toast.success("Rider status updated successfully");
    //     },
    //     onError: () => toast.error("Failed to update rider status")
    // })

    // const handleChangeStatus = (riderId: string, status: 'approved' | 'rejected') => {
    //     mutate({ riderId, status });
    // }
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
                                Tracking Number
                            </th>
                            <th scope="col" className="px-6 py-3 font-semibold">
                                Sender
                            </th>
                            <th scope="col" className="px-6 py-3 font-semibold">
                                Receiver
                            </th>
                            <th scope="col" className="px-6 py-3 font-semibold">
                                Origin
                            </th>
                            <th scope="col" className="px-6 py-3 font-semibold">
                                Destination
                            </th>
                            <th scope="col" className="px-6 py-3 font-semibold">
                                Parcel Type
                            </th>
                            <th scope="col" className="px-6 py-3 font-semibold">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 font-semibold">
                                Payment Status
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
                                    {user?.trackingNumber || "N/A"}
                                </th>
                                <td className="px-6 py-4">
                                    {user?.senderName || "N/A"}
                                </td>
                                <td className="px-6 py-4">
                                    {user?.receiverName || "N/A"}
                                </td>
                                <td className="px-6 py-4">
                                    {user?.senderDistrict ? user.senderDistrict.charAt(0).toUpperCase() + user.senderDistrict.slice(1) : "N/A"}
                                </td>
                                <td className="px-6 py-4">
                                    {user?.receiverDistrict ? user.receiverDistrict.charAt(0).toUpperCase() + user.receiverDistrict.slice(1) : "N/A"}
                                </td>
                                <td className="px-6 py-4">
                                    {user?.parcelType ? user.parcelType.charAt(0).toUpperCase() + user.parcelType.slice(1) : "N/A"}
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
                                            ${user?.status === "pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : user?.status === "ready-for-rider-assignment"
                                                    ? "bg-indigo-100 text-indigo-700"
                                                    : user?.status === "rider-assigned"
                                                        ? "bg-purple-100 text-purple-700"
                                                        : user?.status === "in-transit"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : user?.status === "delivered"
                                                                ? "bg-green-100 text-green-700"
                                                                : user?.status === "cancelled"
                                                                    ? "bg-red-100 text-red-700"
                                                                    : "bg-gray-100 text-gray-600"
                                            }
                                        `}
                                    >
                                        {user?.status || "N/A"}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-2 py-1 rounded-full text-white text-sm font-medium ${user?.paymentStatus === "paid"
                                            ? "bg-green-500"
                                            : user?.paymentStatus === "unpaid"
                                                ? "bg-red-500"
                                                : "bg-gray-400"
                                            }`}
                                    >
                                        {user?.paymentStatus ?? "N/A"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 gap-4 flex">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="hover:bg-secondary hover:text-white transition-all duration-500">< FiSettings /> View Details</Button>
                                        </DialogTrigger>
                                    </Dialog>
                                </td>
                            </tr>))
                        }
                    </tbody>
                </table>
            </div>
            <Pagination page={page} setPage={setPage} pageNumbers={pageNumbers} totalPages={totalPages} />
        </div>
    );
};

export default ManageParcelTable;