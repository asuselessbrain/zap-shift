/* eslint-disable @typescript-eslint/no-explicit-any */
export const priceCalculator = (data:any) => {
    if (data.parcelType === "document" && data.senderDistrict === data.receiverDistrict) {
        return 60
    }
    if (data.parcelType === "document" && data.senderDistrict !== data.receiverDistrict) {
        return 80
    }

    if (data.parcelType === "non-document" && data.weight <= 3) {
        if (data.senderDistrict === data.receiverDistrict) {
            return 110
        } else {
            return 150
        }
    }

    if (data.parcelType === "non-document" && data.weight > 3) {
        if (data.senderDistrict === data.receiverDistrict) {
            return 110 + 40 * (Math.ceil(data.weight) - 3)
        } else {
            return 110 + 40 * (Math.ceil(data.weight) - 3) + 40
        }
    }
}