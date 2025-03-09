import { instance } from "../axios"
import { getSchedulesResponse, postSchedulesResponse } from "./type"
import { postEditSchedulesRequest } from "./type"

const router = "/schedules"

// 일정 조회
export const getSchedules = async () => {
    return await instance.get<getSchedulesResponse>(`${router}`);
}

// 일정 등록
export const postSchedules = async (data: postEditSchedulesRequest) => {
    return await instance.post<postSchedulesResponse>(`${router}`, data);
}

// 일정 수정
export const editSchedules = async (scheduleId: string, data: postEditSchedulesRequest) => {
    return await instance.patch(`${router}/${scheduleId}`, data);
}

// 일정 삭제
export const deleteSchedules = async (scheduleId: string) => {
    return await instance.delete(`${router}/${scheduleId}`)
}