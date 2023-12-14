import Axios from "axios";
import { Layouts } from "react-grid-layout";
import { gridLayouts } from "../containers/dashboard/layout";
import {
  CalculationsPerUtilityAndZones,
  LatestUtilityCalStatus,
  RTOPerUtilityData
} from "../definitions/types";

const baseURL = process.env.REACT_APP_AZURE_API_URL;

export const fetchDashboardLayout = async (userId: string) => {
  const fetchData = await Axios.get(`${baseURL}/userpref?userId=${userId}`)
    .then((value) => value)
    .catch((reason) => {
      return reason.response;
    });
  if (fetchData.status !== 200) {
    return gridLayouts;
  }
  return {
    lg: fetchData.data.large.Tiles,
    md: fetchData.data.medium.Tiles,
    sm: fetchData.data.small.Tiles
  };
};

export const changeDashboardLayout = (userId: string, layouts: Layouts) => {
  Axios.post(
    `${baseURL}/userpref`,
    {
      userId: userId,
      large: { Tiles: layouts.lg },
      medium: { Tiles: layouts.md },
      small: { Tiles: layouts.sm }
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};

export const fetchEboksStatus = async (): Promise<number | undefined> => {
  const fetchData = await Axios.get(`${baseURL}/api/eboks`);
  return fetchData.data;
};

export const fetchRTOPerUtility = async (): Promise<RTOPerUtilityData[] | undefined> => {
  const fetchData = await Axios.get(`${baseURL}/api/jobs`);
  return fetchData.data;
};

export const fetchCalculationsPerUtility = async (): Promise<
  CalculationsPerUtilityAndZones[] | undefined
> => {
  const fetchData = await Axios.get(`${baseURL}/api/utilities/zones`);
  return fetchData.data;
};

export const fetchUtilityCalculations = async (): Promise<LatestUtilityCalStatus[] | undefined> => {
  const fetchData = await Axios.get(`${baseURL}/api/utilities`);
  return fetchData.data;
};
