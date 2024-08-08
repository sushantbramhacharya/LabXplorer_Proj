import { BASE_URL } from "../constants";
import { api } from "./api";

export const simulationApi=api.injectEndpoints({
    endpoints:(builder)=>({
        allSimulation:builder.query({
            query:(data)=>({
                url:BASE_URL+'/admin/simulations/',
                method:'GET',
                params:data
            })
        }),
        simulationByCategory:builder.query({
            query:(data)=>({
                url:BASE_URL+'/admin/simulations/category',
                method:'GET',
                params:data
            })
        }),
        setSimulation:builder.mutation({
            query:(data)=>({
                url:BASE_URL+'/admin/simulations',
                method:'POST',
                body:data
            })
        })
    })
})

export const {useAllSimulationQuery,useSimulationByCategoryQuery,useSetSimulationMutation}=simulationApi