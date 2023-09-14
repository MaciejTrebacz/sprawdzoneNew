import {create} from "zustand";

type State ={
    pageNumber: number
    pageSize: number
    pageCount: number
    searchTerm: string
    searchValue:string
    searchBy: string
    filterBy: string
    seller?: string
    winner?: string
}

type Actions={
    setParams: (params: Partial<State>)=>void
    reset: ()=> void
    setSearchValue: (value:string)=> void
}

const initialState :State ={
    pageCount: 1,
    pageNumber: 1,
    pageSize: 4,
    searchTerm: "",
    searchValue: "",
    searchBy:"make",
    filterBy:"live",
    seller: undefined,
    winner: undefined,
}

export const useParamsStore= create<State &Actions>()((set)=>({
    ...initialState,

    setParams: (newParams:Partial<State>) => {
        set((state)=>{
            if (newParams.pageNumber){
                return {...state, pageNumber: newParams.pageNumber}
            } else {
                return {...state, ...newParams,pageNumber: 1}
                // if we dont have pageNumber then we changing pageSize so we have to go back to page one
            }
        })
    },

    reset:()=> set(initialState),
    setSearchValue: (value:string)=>{
        set({searchValue:value})
    },

}))

