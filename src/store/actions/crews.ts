import { action } from "typesafe-actions";
import { ECrewsTypes, ICrew } from "../../types/store/crews";

export const getCrewsRequest = (coords: [number, number]) =>
  action(ECrewsTypes.GET_CREWS_REQUEST, coords);

export const getCrewsSuccess = (data: Array<ICrew>) =>
  action(ECrewsTypes.GET_CREWS_SUCCESS, data);

export const getCrewsFailure = () => action(ECrewsTypes.GET_CREWS_FAILURE);
