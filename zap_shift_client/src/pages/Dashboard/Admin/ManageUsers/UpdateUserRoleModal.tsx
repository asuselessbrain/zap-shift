import { Button } from '@/components/ui/button';
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import type { IUser } from './ManageUsers';
import { Controller, useForm, type FieldValues } from 'react-hook-form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const UpdateUserRoleModal = ({ user, refetch }: { user: IUser, refetch: () => void }) => {

    const { control, handleSubmit } = useForm();
    const axiosSecure = useAxiosSecure()

    const {mutate, isPending } = useMutation({
        mutationFn: async(data: FieldValues) => await axiosSecure.patch(`/users/role/${user?.email}`, data),
        onSuccess: ()=> {
            toast.success("User role updated successfully");
            refetch();
        },
        onError: ()=>toast.error("Failed to update user role")
    })

    const handleUpdateRole = (data: FieldValues) => {
        mutate(data);
    }

    return (

        <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleSubmit(handleUpdateRole)}>
                <DialogHeader>
                    <DialogTitle>Edit User Role</DialogTitle>
                    <DialogDescription className='mt-2'>
                        Change the role for <strong>{user?.displayName}</strong>
                    </DialogDescription>
                </DialogHeader>
                <div className='my-4 p-4 rounded-xl bg-[#f9fafb]'>
                    <div className='flex items-center justify-between'>
                        <p className='text-black/80'>Email:</p>
                        <p>{user?.email}</p>
                    </div>
                    <div className='flex items-center justify-between mt-4'>
                        <p className='text-black/80'>Current Role:</p>
                        <p
                            className={`px-2 rounded-full ${user?.role === "admin"
                                ? "bg-red-500 text-white"
                                : user?.role === "user"
                                    ? "bg-green-500 text-white"
                                    : user?.role === "rider"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-300 text-black"
                                }`}
                        >
                            {user?.role}
                        </p>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="name-1">New Role</Label>
                        <Controller
                            name='role'
                            control={control}
                            render={({ field }) => (<Select onValueChange={field.onChange} value={field.value || ""}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Roles</SelectLabel>
                                        <SelectItem value="user">User</SelectItem>
                                        <SelectItem value="rider">Rider</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>)}
                        />
                    </div>
                </div>

                <div className='my-4 p-4 rounded-xl bg-[#eff6ff]'>
                    <p className='text-[#506cca] text-sm text-justify'><strong>Note: </strong>Changing a user's role will immediately update their permissions and access level.</p>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="submit" disabled={isPending} className='disabled:cursor-no-drop cursor-pointer'>Save changes</Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </DialogContent>
    );
};

export default UpdateUserRoleModal;