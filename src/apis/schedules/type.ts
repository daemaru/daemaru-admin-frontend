export type getSchedulesResponse = {
    schedules: getSchedulesResponseArray[]
}

export type getSchedulesResponseArray = {
    id: string;
    title: string;
    start: string;
    end: string;
    period: string;
    location: string;
    description: string;
    target: string;
}

export type postEditSchedulesRequest = {
    title: string;
    start: string;
    end: string;
    period: string;
    location: string;
    description: string;
    target: string;
}

export type postSchedulesResponse = {
    id: string;
}

