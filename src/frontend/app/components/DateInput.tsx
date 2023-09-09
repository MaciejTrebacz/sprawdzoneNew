import React from 'react';
import {useController, UseControllerProps} from "react-hook-form";
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker, {ReactDatePickerProps} from "react-datepicker";


type Props={
    label:string
    type?:string
    showLabel?:boolean
} & UseControllerProps & Partial<ReactDatePickerProps>

function DateInput(props:Props) {
    const {field,fieldState} = useController({...props, defaultValue: ""})

    return (
        <div className={'mb-3'}>
            <DatePicker
                {...props}
                {...field}
                onChange={value=>field.onChange(value)}
                placeholderText={props.label}
                selected={field.value}
                className={`
                    rounded-lg w-[100%] flex flex-col
                    ${fieldState.error ? 'bg-red-50 border-red-500 text-red-500' 
                    : (!fieldState.invalid && fieldState.isDirty) }
                    ? 'bg-green-45 border-green-500 text-green-900' 
                    : ""
                `}
            />
            {fieldState.error && (
                <div className={'text-red-500 text-sm'}>{fieldState.error.message}</div>
            )}
        </div>
    );
}

export default DateInput;