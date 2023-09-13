'use client'

import React, {useEffect} from 'react';
import {FieldValue, FieldValues, useForm} from "react-hook-form";
import {Button, TextInput} from "flowbite-react";
import Input from "@/app/components/Input";
import DateInput from "@/app/components/DateInput";
import {createAuction, updateAuction} from "@/app/actions/auctionAction";
import {usePathname, useRouter} from "next/navigation";
import toast from "react-hot-toast";
import {Auction} from "@/types";

type Props = {
    auctionToUpdate?: Auction
}

function AuctionForm({auctionToUpdate}: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const {control,handleSubmit,setFocus,reset,
        formState:{isSubmitting,isValid}} = useForm({
        mode: 'onTouched'
    })

    useEffect(()=>{
        if (auctionToUpdate){
            const {make,model,year,mileage,color,horsePower} = auctionToUpdate
            reset({make,model,year,mileage,color,horsePower})
        }

        setFocus('make')}
        ,[setFocus,reset])

    async function onSubmit(data:FieldValues){
        try {
            let id = ''
            let res
            if (pathname === '/auctions/create'){
                res = await createAuction(data)
                id = res.id
            } else {
                if (auctionToUpdate){
                    // TODO: - update should get more options
                    //       - check horsepower value
                    res = await updateAuction(auctionToUpdate.id,data)
                    id = auctionToUpdate.id
                }
            }

            if (res.error) throw res.error
            router.push(`/auctions/details/${id}`)

        } catch (error:any) {
            toast.error(error.status + ' ' +  error.message)
        }
    }


    return (
        <form className={'flex flex-col mt-3'} onSubmit={handleSubmit(onSubmit)}>

            <Input label={'Make'} name={'make'} control={control} rules={{required:'Make is required'}}/>

            <Input label={'Model'} name={'model'} control={control} rules={{required:'Model is required'}}/>

            <Input label={'Color'} name={'color'} control={control} rules={{required:'Color is required'}}/>

            <div className="grid grid-cols-3 gap-3">
                <Input label={'Year'} name={'year'} control={control} type={'number'} rules={{required:'Year is required'}}/>

                <Input label={'Mileage'} name={'mileage'} control={control} rules={{required:'Mileage is required'}} type={'number'}/>

                <Input label={'Horse power'} name={'horsePower'} control={control} rules={{required:'Mileage is required'}} type={'number'}/>
            </div>

            {pathname === '/auctions/create' &&
          <>
              <Input label={'Image URL'} name={'imageUrl'} control={control} rules={{required:'Image Url is required'}}/>


              <div className="grid grid-cols-2 gap-3">
                  <Input label={'Reserve Price'} name={'reservePrice'} control={control} type={'number'} rules={{required:'Reserve is required'}}/>


                  <DateInput
                      label={'Auction end date/time'}
                      name={'auctionEnd'}
                      control={control}
                      dateFormat={'dd MMMM yyyy h:mm a'}
                      showTimeSelect
                      rules={{required:'Auction end date is required'}}
                  />
              </div>

          </>}

            <div className="flex justify-between">
                <Button outline
                        gradientMonochrome={'failure'}
                >Cancel</Button>

                <Button outline
                        gradientMonochrome={'success'}
                        type={'submit'}
                        isProcessing={isSubmitting}
                        disabled={!isValid}
                >Submit</Button>
            </div>
        </form>
    );
}

export default AuctionForm;