import Header from "@/Component/Shared/Header/Header";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Controller, useForm, useWatch, type FieldValues } from "react-hook-form";
import { useLoaderData } from "react-router";
import type { CoverageArea } from "../Covarage/Covarage";
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { priceCalculator } from "@/utils/priceCalculator";

export type ParcelType = "document" | "non-document";

export interface Parcel {
    parcelType: ParcelType;
    parcelName: string;
    weight: number;
    cost: number;

    // Sender Info
    senderName: string;
    senderEmail: string;
    senderRegion: string;
    senderDistrict: string;
    senderPhoneNumber: string;
    pickupInstruction: string;

    // Receiver Info
    receiverName: string;
    receiverEmail: string;
    receiverRegion: string;
    receiverDistrict: string;
    receiverPhoneNumber: string;
    deliveryInstruction: string;

    // System Generated (optional, future use)
    //   status?: ParcelStatus;
    //   cost?: number;
    //   trackingNo?: string;
    //   createdAt?: string;
}


const SendParcel = () => {
    const { handleSubmit, register, reset, control, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();

    const regions: CoverageArea[] = useLoaderData();

    const regionsWithDuplicate = regions.map((region) => region.region);
    const regionsWithOutDuplicate = [...new Set(regionsWithDuplicate)]

    const senderRegions = useWatch({ control, name: "senderRegion" });
    const receiverRegions = useWatch({ control, name: "receiverRegion" });

    const receiverDistricts = regions.filter((area) => area.region.toLowerCase() === receiverRegions)?.map((area) => area.district);
    const senderDistricts = regions.filter((area) => area.region.toLowerCase() === senderRegions)?.map((area) => area.district);


    const { mutate, isPending } = useMutation({
        mutationFn: async (parcelData: Parcel) => {
            const response = await axiosSecure.post('/parcels', parcelData);
            return response.data;
        },
        onSuccess: () => {
            reset();
            toast.success("Parcel created successfully");
        },
        onError: () => {
            toast.error("Failed to create parcel. Please try again.");
        }
    })

    const handleSendParcel = async (data: FieldValues) => {
        
        const calculatedPrice = priceCalculator(data);
        const parcelData = {
            ...data,
            cost: calculatedPrice,
        }

        mutate(parcelData as Parcel);
    }

    return (
        <section className="max-w-[1440px] mx-auto px-24 py-20 bg-white rounded-2xl my-8">
            <div>
                <Header title="Send A Parcel" description="" />
                <h3 className="text-3xl font-extrabold mb-6">Enter your parcel details</h3>

                <form onSubmit={handleSubmit(handleSendParcel)}>

                    <div className="mb-6 py-2">
                        <Controller
                            name="parcelType"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <RadioGroup value={field.value || ""} onValueChange={field.onChange} className="flex items-center gap-6" >
                                    <Field orientation="horizontal" className="w-auto">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <RadioGroupItem value="document" id="document" />
                                            <span>Document</span>
                                        </label>
                                    </Field>
                                    <Field orientation="horizontal" className="w-auto">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <RadioGroupItem value="non-document" id="non-document" />
                                            <span>Non-Document</span>
                                        </label>
                                    </Field>
                                </RadioGroup>)}
                        />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6">

                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="parcelName">Parcel Name</Label>
                            <Input {...register("parcelName", { required: true })} type="text" id="parcelName" placeholder="Parcel Name" />
                            {
                                errors.parcelName?.type === "required" ? <span className="text-red-500">This field is required</span> : null
                            }
                        </div>
                        <div className="grid w-full items-center gap-3">
                            <Label htmlFor="weight">Weight (KG)</Label>
                            <Input {...register("weight", { required: true })} type="number" id="weight" placeholder="Weight in KG" />
                            {
                                errors.weight?.type === "required" ? <span className="text-red-500">This field is required</span> : null
                            }
                        </div>
                        <div className="border border-dashed border-gray-200 my-4 col-span-1 lg:col-span-2"></div>

                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6">
                        <div className="space-y-4">
                            <h5 className="text-xl font-semibold mt-2 mb-8">Sender Details</h5>
                            <div className="grid w-full items-center gap-3">
                                <Label htmlFor="senderName">Sender Name</Label>
                                <Input {...register("senderName", { required: true, minLength: 3, maxLength: 50 })} type="string" id="senderName" placeholder="Sender Name" />
                                {
                                    errors.senderName?.type === "required" ? <span className="text-red-500">This field is required</span> :
                                        errors.senderName?.type === "minLength" ? <span className="text-red-500">Sender Name must be at least 3 characters</span> :
                                            errors.senderName?.type === "maxLength" ? <span className="text-red-500">Sender Name must be at most 50 characters</span> : null
                                }
                            </div>
                            <div className="grid w-full items-center gap-3">
                                <Label htmlFor="senderEmail">Sender Email</Label>
                                <Input {...register("senderEmail", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} type="email" id="senderEmail" placeholder="Sender Email" />
                                {
                                    errors.senderEmail?.type === "required" ? (
                                        <span className="text-red-500">This field is required</span>
                                    ) : errors.senderEmail?.type === "pattern" ? (
                                        <span className="text-red-500">Enter a valid email address</span>
                                    ) : null
                                }
                            </div>
                            <div className="grid w-full items-center gap-3">
                                <Label htmlFor="senderRegion">Your Region</Label>
                                <Controller
                                    name="senderRegion"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => {
                                        return (<Select onValueChange={field.onChange} value={field.value || ""}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Sender Region" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Sender Region</SelectLabel>
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
                                <Label htmlFor="senderDistrict">Sender District</Label>
                                <Controller
                                    name="senderDistrict"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => {
                                        return (<Select onValueChange={field.onChange} value={field.value || ""}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Sender District" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Sender District</SelectLabel>
                                                    {
                                                        senderDistricts.map((district: string) => (
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
                                <Label htmlFor="senderPhoneNumber">Sender Phone Number</Label>
                                <Input {...register("senderPhoneNumber", { required: true })} type="text" id="senderPhoneNumber" placeholder="Sender Phone Number" />
                                {
                                    errors.senderPhoneNumber?.type === "required" ? <span className="text-red-500">This field is required</span> : null
                                }
                            </div>
                            <div className="grid w-full items-center gap-3 col-span-1 lg:col-span-2">
                                <Label htmlFor="pickupInstruction">Pickup Instruction</Label>
                                <Textarea {...register("pickupInstruction", { required: true })} id="pickupInstruction" placeholder="Pickup Instruction" />
                                {
                                    errors.pickupInstruction?.type === "required" ? <span className="text-red-500">This field is required</span> : null
                                }
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h5 className="text-xl font-semibold mt-2 mb-8">Receiver Details</h5>
                            <div className="grid w-full items-center gap-3">
                                <Label htmlFor="receiverName">Receiver Name</Label>
                                <Input {...register("receiverName", { required: true, minLength: 3, maxLength: 50 })} type="string" id="receiverName" placeholder="Receiver Name" />
                                {
                                    errors.receiverName?.type === "required" ? <span className="text-red-500">This field is required</span> :
                                        errors.receiverName?.type === "minLength" ? <span className="text-red-500">Receiver Name must be at least 3 characters</span> :
                                            errors.receiverName?.type === "maxLength" ? <span className="text-red-500">Receiver Name must be at most 50 characters</span> : null
                                }
                            </div>
                            <div className="grid w-full items-center gap-3">
                                <Label htmlFor="receiverEmail">Receiver Email</Label>
                                <Input {...register("receiverEmail", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} type="string" id="receiverEmail" placeholder="Receiver Email" />
                                {
                                    errors.receiverEmail?.type === "required" ? (
                                        <span className="text-red-500">This field is required</span>
                                    ) : errors.receiverEmail?.type === "pattern" ? (
                                        <span className="text-red-500">Enter a valid email address</span>
                                    ) : null
                                }
                            </div>
                            <div className="grid w-full items-center gap-3">
                                <Label htmlFor="receiverRegion">Receiver Region</Label>
                                <Controller
                                    name="receiverRegion"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => {
                                        return (<Select onValueChange={field.onChange} value={field.value || ""}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Receiver Region" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Receiver Region</SelectLabel>
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
                                    errors.receiverRegion?.type === "required" ? <span className="text-red-500">This field is required</span> : null
                                }
                            </div>
                            <div className="grid w-full items-center gap-3">
                                <Label htmlFor="receiverDistrict">Receiver District</Label>
                                <Controller
                                    name="receiverDistrict"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => {
                                        return (<Select onValueChange={field.onChange} value={field.value || ""}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Receiver District" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Receiver District</SelectLabel>
                                                    {
                                                        receiverDistricts.map((district: string) => (
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
                                    errors.receiverDistrict?.type === "required" ? <span className="text-red-500">This field is required</span> : null
                                }
                            </div>
                            <div className="grid w-full items-center gap-3">
                                <Label htmlFor="receiverPhoneNumber">Receiver Phone Number</Label>
                                <Input {...register("receiverPhoneNumber", { required: true })} type="text" id="receiverPhoneNumber" placeholder="Receiver Phone Number" />
                                {
                                    errors.receiverPhoneNumber?.type === "required" ? <span className="text-red-500">This field is required</span> : null
                                }
                            </div>
                            <div className="grid w-full items-center gap-3 col-span-1 lg:col-span-2">
                                <Label htmlFor="deliveryInstruction">Delivery Instruction</Label>
                                <Textarea {...register("deliveryInstruction", { required: true })} id="deliveryInstruction" placeholder="Delivery Instruction" />
                                {
                                    errors.deliveryInstruction?.type === "required" ? <span className="text-red-500">This field is required</span> : null
                                }
                            </div>
                        </div>
                    </div>
                    {
                        isPending ? <Button disabled className="text-secondary bg-primary rounded-lg mt-8 py-3 cursor-pointer px-12 font-semibold disabled:cursor-no-drop">Loading...</Button>
                            : <input type="submit" value="Proceed to Confirm Booking" className="text-secondary bg-primary rounded-lg mt-8 py-3 cursor-pointer px-12 font-semibold" />
                    }
                </form>
            </div>
        </section>
    );
};

export default SendParcel;