export interface Parcel {
  parcelType: "document" | "non-document";
  parcelName: string;
  weight: number;
  cost: number;

  senderName: string;
  senderEmail: string;
  senderRegion: string;
  senderDistrict: string;
  senderPhoneNumber: string;
  pickupInstruction: string;

  receiverName: string;
  receiverEmail: string;
  receiverRegion: string;
  receiverDistrict: string;
  receiverPhoneNumber: string;
  deliveryInstruction: string;

  status: "pending" | "ready-for-rider-assignment" | "rider-assigned" | "in-transit" | "delivered" | "cancelled";
  paymentStatus: "paid" | "unpaid";
  riderId?: string;
}
