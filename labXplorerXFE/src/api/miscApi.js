import { BASE_URL } from "../constants";
import { api } from "./api";

export const miscApi=api.injectEndpoints({
    endpoints:(builder)=>({
        searchByName:builder.query({
            query:(data)=>({
                url:BASE_URL+'/search',
                method:'GET',
                params:data
            })
        }),
    })
})

export const {useSearchByNameQuery}=miscApi