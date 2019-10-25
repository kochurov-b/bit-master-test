import { action } from "typesafe-actions";
import { ECrewsTypes, ICrew } from "../../types/store/crews";
import { CoordsType } from "../../types/ymaps";

export const getCrewsRequest = (coords: CoordsType) =>
  action(ECrewsTypes.GET_CREWS_REQUEST, coords);

export const getCrewsSuccess = (data: Array<ICrew>) =>
  action(ECrewsTypes.GET_CREWS_SUCCESS, data);

export const getCrewsFailure = () => action(ECrewsTypes.GET_CREWS_FAILURE);

export const selectCrew = (id: number) => action(ECrewsTypes.SELECT_CREW, id);
