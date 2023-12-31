﻿import { Button } from 'flowbite-react';
import ButtonGroup from 'flowbite-react/lib/esm/components/Button/ButtonGroup';
import React from 'react';
import {useParamsStore} from "@/hooks/useParamsStore";
import {shallow} from "zustand/shallow";
import {AiOutlineClockCircle, AiOutlineSortAscending} from "react-icons/ai";
import {BsFillStopCircleFill, BsStopwatchFill} from "react-icons/bs";
import {GiFinishLine, GiFlame} from "react-icons/gi";

const pageSizeButtons =[4,8,12]
const orderButtons = [{
        label: 'Alphabetical',
        icon: AiOutlineSortAscending,
        value:'make'
    },
    {
        label: 'End date',
        icon: AiOutlineClockCircle,
        value:'endingSoon'
    },
    {
        label: 'Recently added',
        icon: BsFillStopCircleFill,
        value:'new'
    },
]

const filterButtons = [{
    label: 'Live Auctions',
    icon: GiFlame,
    value:'live'
    },
    {
        label: 'Ending <6h',
        icon: GiFinishLine,
        value:'endingSoon'
    },
    {
        label: 'Completed',
        icon: BsStopwatchFill,
        value:'finished'
    },
]

function Filters() {
    const pageSize = useParamsStore(state => state.pageSize)
    const searchBy = useParamsStore(state=> state.searchBy)
    const filterBy = useParamsStore(state=> state.filterBy)
    
    const setParams = useParamsStore(state=> state.setParams)


    return (
        <div className={'flex justify-between items-center mb-4'}>
            <div>
                <span className="uppercase text-sm text-gray-500 mr-2">Filter By</span>
                <ButtonGroup>
                    {filterButtons.map(({label,icon:Icon,value})=>(
                        <Button
                            key={value}
                            onClick={()=>setParams({filterBy:value})}
                            color={`${filterBy ===value ? 'red' : 'grey'}`}
                        >
                            <Icon className={'mr-3 h-4 w-4'}/>
                            {label}
                        </Button>
                    ))}
                </ButtonGroup>

            </div>
            
            
            
            <div>
                <span className="uppercase text-sm text-gray-500 mr-2">Page Size</span>
                <ButtonGroup>
                    {orderButtons.map(({label,icon:Icon,value})=>(
                        <Button
                            key={value}
                            onClick={()=>setParams({searchBy:value})}
                            color={`${searchBy ===value ? 'red' : 'grey'}`}
                        >
                            <Icon className={'mr-3 h-4 w-4'}/>
                            {label}
                        </Button>
                    ))}
                </ButtonGroup>

            </div>


            <div>
                <span className="uppercase text-sm text-gray-500 mr-2">Page Size</span>
                <ButtonGroup>
                    {pageSizeButtons.map((value,i)=>(
                        <Button key={i}
                                onClick={()=> setParams({
                                    pageSize:value
                                })}
                                color={`${pageSize === value ? 'red' : 'gray'}`}>
                            {value}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
        </div>
    );
}

export default Filters;