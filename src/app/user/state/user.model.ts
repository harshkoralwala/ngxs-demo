

export interface Address {
  street: string;
  city: string;
  pincode: string;
  landmark: string;
}

export interface UserDTO {
  id: number;
  firstName: string;
  lastName: string;
  address: Address;
}
