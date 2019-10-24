import { yMapsConstants } from "../constants/ymaps";

export const setSelectedAddress = (address: string) => ({
  type: yMapsConstants.SET_SELECTED_ADDRESS,
  payload: address
});
