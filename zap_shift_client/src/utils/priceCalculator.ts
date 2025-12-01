export const priceCalculator = (data, setPrice: React.Dispatch<React.SetStateAction<number>>) => {
    if (data.type === "document" && data.yourDistrict === data.deliveryDistrict) {
        data.price = 60
        setPrice(data.price)
        return
    }
    if (data.type === "document" && data.yourDistrict !== data.deliveryDistrict) {
        data.price = 80
        setPrice(data.price)
        return
    }

    if (data.type === "non-document" && data.weight <= 3) {
        if (data.yourDistrict === data.deliveryDistrict) {
            data.price = 110
            setPrice(data.price)
        } else {
            data.price = 150
            setPrice(data.price)
        }
        return
    }

    if (data.type === "non-document" && data.weight > 3) {
        if (data.yourDistrict === data.deliveryDistrict) {
            data.price = 110 + 40 * (Math.ceil(data.weight) - 3)
            setPrice(data.price)
        } else {
            data.price = 110 + 40 * (Math.ceil(data.weight) - 3) + 40
            setPrice(data.price)
        }
        return
    }
}