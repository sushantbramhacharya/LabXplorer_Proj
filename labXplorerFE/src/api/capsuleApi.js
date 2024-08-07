import { BASE_URL } from "../constants";
import { api } from "./api";

export const capsuleApi=api.injectEndpoints({
    endpoints:(builder)=>({
        CapsulesByCategory:builder.query({
            query:(data)=>({
                url:BASE_URL+'/capsule/category',
                method:'GET',
                params:data
            })
        }),
        CapsuleById:builder.query({
            query:(data)=>({
                url:BASE_URL+'/capsule',
                method:'GET',
                params:data
            })
        }),
    })
})

export const {useCapsuleByIdQuery,useCapsulesByCategoryQuery}=capsuleApi