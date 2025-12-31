import { Button } from '@/components/ui/button';
import type { Data, IUser } from './ManageUsers';
import { FiEdit, FiUsers } from 'react-icons/fi';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import UpdateUserRoleModal from './UpdateUserRoleModal';
import type { Dispatch, SetStateAction } from 'react';
import Pagination from '../../Shared/Pagination';

const UserTable = ({refetch, data, page, setPage, pageNumbers, totalPages}: {refetch: () => void, data: Data, page: number, setPage: Dispatch<SetStateAction<number>>, pageNumbers: number[], totalPages: number}) => {
    return (
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
                                        <UpdateUserRoleModal user={user} refetch={refetch} />
                                    </Dialog>
                                    <Button className="border-none bg-red-500 hover:bg-red-700 text-white transition-all duration-500">Suspend</Button>
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

export default UserTable;