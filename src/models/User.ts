export interface User {
  id: string;
  firstName: string;
  lastName: string;
  petName: string;
  searchName: string;
  profileImageUser: string;
  profileImagePet: string;
}

export interface UserState {
  data?: User;
  isLoading?: boolean;
  error?: string;
}

export interface CurrentUserId {
  id: string;
}
