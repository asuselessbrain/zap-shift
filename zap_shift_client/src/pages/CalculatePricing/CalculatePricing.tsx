import Header from "@/Component/Shared/Header/Header";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLoaderData } from "react-router";
import type { CoverageArea } from "../Covarage/Covarage";
import { Controller, useForm, type FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { priceCalculator } from "@/utils/priceCalculator";

const CalculatePricing = () => {
    const { control, handleSubmit, register, reset } = useForm()
    const [price, setPrice] = useState(0)
    const areaData: CoverageArea[] = useLoaderData()
    const districtsWithDuplicate = areaData.map((area: CoverageArea) => area.district)
    const districts = [...new Set(districtsWithDuplicate)]

    const handleCalculatePricing = (data: FieldValues) => {
        const calculatedPrice = priceCalculator(data);
        setPrice(calculatedPrice as number);
    }

    const resetForm = () => {
        setPrice(0)
        reset()
    }

    return (
        <div className="max-w-[1440px] mx-auto py-20 px-14 lg:px-24 rounded-2xl bg-white my-8">
            <Header title="Calculate Pricing" description="Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time." />

            <h3 className="text-3xl font-extrabold text-secondary text-center my-12">Calculate Your Cost</h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <form className="space-y-4 w-full" onSubmit={handleSubmit(handleCalculatePricing)}>
                    <div className="grid w-full gap-3">
                        <Label htmlFor="parcelType">Parcel Type</Label>
                        <Controller
                            name="parcelType"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => {
                                return (
                                    <Select onValueChange={field.onChange} value={field.value || ""} >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a parcel type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Parcel Type</SelectLabel>
                                                <SelectItem value="document">Document</SelectItem>
                                                <SelectItem value="non-document">Non-Document</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )
                            }}
                        >

                        </Controller>
                    </div>
                    <div className="grid w-full gap-3">
                        <Label htmlFor="yourDistrict">Your District</Label>
                        <Controller
                            name="senderDistrict"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => {
                                return (
                                    <Select onValueChange={field.onChange} value={field.value || ""} >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a district" />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-96 overflow-y-auto">
                                            <SelectGroup>
                                                <SelectLabel>Districts</SelectLabel>
                                                {
                                                    districts.map((district: string, i: number) => (
                                                        <SelectItem key={i} value={district.toLowerCase()}>{district}</SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )
                            }}
                        >

                        </Controller>
                    </div>
                    <div className="grid w-full gap-3">
                        <Label htmlFor="deliveryDistrict">Delivery District</Label>
                        <Controller
                            name="deliveryDistrict"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => {
                                return (
                                    <Select onValueChange={field.onChange} value={field.value || ""} >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a district" />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-96 overflow-y-auto">
                                            <SelectGroup>
                                                <SelectLabel>Districts</SelectLabel>
                                                {
                                                    districts.map((district: string, i: number) => (
                                                        <SelectItem key={i} value={district.toLowerCase()}>{district}</SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )
                            }}
                        >

                        </Controller>
                    </div>
                    <div className="grid w-full gap-3">
                        <Label htmlFor="weight">Weight (KG)</Label>
                        <Input type="number" {...register("weight", { required: true })} placeholder="Weight (KG)" />
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-6 w-full">
                        <Button onClick={resetForm} type="submit" className="border w-full md:w-1/3 border-primary bg-[#fafdf0] text-secondary py-3 font-semibold rounded-md px-8">Reset</Button>
                        <input type="submit" value="Calculate Pricing" className="bg-primary w-full text-secondary py-3 font-semibold rounded-md px-8" />
                    </div>
                </form>
                <div className="w-full flex justify-center text-center">
                    <h1 className="text-9xl font-extrabold">{price.toLocaleString()} Tk</h1>
                </div>
            </div>
        </div>
    );
};

export default CalculatePricing;