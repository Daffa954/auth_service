export interface CreateAddressDTO {
  full_address: string;
  label?: string;
  province: string;
  province_id: number;
  city: string;
  city_id: number;
  district: string;
  district_id: number;
}
