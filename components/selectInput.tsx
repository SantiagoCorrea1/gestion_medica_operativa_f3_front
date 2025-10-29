
import { useState } from 'react';
import Select from 'react-select';
import { Label } from './ui/labelInputs';

export interface SelectData{
    label: string,
    value: number,
    name?: string;
}

interface Props{
    data: SelectData[];
    selected?: number | string;
    onChange?: (value: number | null) => void;
    label?: string;
    errorName?: string;
    isClearable?: boolean;
    disabled?: boolean;
    placeholder?: string
    name?: string
}

export default function SelectInput ({data, selected, onChange, label, errorName, name, isClearable = true, disabled = false, placeholder = "Selecciona una opción"}: Props)  {
    const [isSearchable] = useState(true);
    const [isLoading] = useState(false);
    const [isRtl] = useState(false);
    
    const defaultValue = data.find( d => d.value === selected)

    return (
        <div className="min-w-[200px]">
            { label?.length && (<Label>{ label }</Label>) }

            <Select
                className="basic-single"
                classNamePrefix="select"
                isDisabled={disabled}
                isLoading={isLoading}
                isClearable={isClearable}
                isRtl={isRtl}
                isSearchable={isSearchable}
                value={  defaultValue }
                name=""
                options={data}
                placeholder={placeholder}
                onChange={(selectedOption) => {
                    onChange?.(selectedOption ? selectedOption.value : null);
                }}
            />
        </div>
    );
};