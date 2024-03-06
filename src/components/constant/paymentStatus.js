export const PENDING = "Chờ thanh toán";
export const SUCCESS = "Thành công";
export const FAILED = "Thất bại";

export const PAYMENT_STATUSES = [PENDING, SUCCESS, FAILED];

export const PAYMENT_STATUS_ID_MAPPING = {
  PENDING: 1,
  SUCCESS: 2,
  FAILED: 3,
};

export const PAYMENT_STATUS_COLOR_MAPPING = {
  1: "orange",
  2: "green",
  3: "red",
};
