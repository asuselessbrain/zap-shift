export type ParcelType = "document" | "non-document";

export interface Parcel {
  parcelType: ParcelType;
  parcelName: string;
  weight?: number;

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
