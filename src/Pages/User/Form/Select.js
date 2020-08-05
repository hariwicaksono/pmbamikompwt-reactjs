import React from 'react'
import Select from 'react-select'
export default function FormikSelect({onChange,name,...props}) {
    return (
        <Select 
            {...props}
            onChange={handleChange}
        />
    )
    function handleChange(value) {
        onChange(name, value)
    }
}