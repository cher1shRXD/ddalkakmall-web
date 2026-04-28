export interface Brand {
  id: string;
  userId: string;
  name: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface BrandSubscription {
  id: string;
  brandId: string;
  plan: "basic" | "plus";
  status: "pending" | "active" | "failed" | "cancelled";
  billingDay: number;
  rebillExpire: string;
  nextBillAt: string | null;
  lastBilledAt: Date | null;
  rebillKey: string | null;
  orderNo: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BrandDetail extends Brand {
  subscription: BrandSubscription | null;
}
