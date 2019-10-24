import { yMapsActions } from "../ymaps";

interface IConstants {
  REQUEST: string;
  SUCCESS: string;
  FAILURE: string;
}

type fetchActions = yMapsActions;

const act = (type: any, payload: any): fetchActions => ({
  type,
  payload
});

export const getFetchActions = (constants: IConstants) => ({
  request: (req?: any) => act(constants.REQUEST, req),
  success: (res: any) => act(constants.SUCCESS, res),
  failure: (res?: any) => act(constants.FAILURE, res)
});
