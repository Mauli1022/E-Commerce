import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input';
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

export default function Form({ 
    formContols, 
    formData, 
    setFormData, 
    onSubmit, 
    buttonText,
    isButtonDisabled
 }) {

    function renderInputsByComponentType(getControlItem) {
        let element = null;

        const value = formData[getControlItem.name] || ""


        switch (getControlItem.componentType) {
            case 'input':
                element = (<Input
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    id={getControlItem.name}
                    type={getControlItem.type}
                    value={value}
                    onChange = {event => setFormData({
                        ...formData,
                        [getControlItem.name] : event.target.value

                    })}
                />)
                break;

            case 'select':
                element = (
                    <Select onValueChange={(value)=>setFormData({
                        ...formData,
                        [getControlItem.name] : value
                    })} value={value}
                    >
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder={getControlItem.label}/>
                        </SelectTrigger>

                        <SelectContent>
                            {
                                getControlItem.options && 
                                getControlItem.options.length > 0 ?
                                getControlItem.options.map(optionsItem =>
                                <SelectItem key={optionsItem.id} value={optionsItem.id}>
                                     {optionsItem.label}
                                </SelectItem>) : null
                            }
                        </SelectContent>
                    </Select>
                )
                break;

            case 'textarea':
                element = (
                    <Textarea name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    id={getControlItem.id}
                    value={value}
                    onChange = {event => setFormData({
                        ...formData,
                        [getControlItem.name] : event.target.value

                    })}
                    />
                )
                break;

            default:
                element = (<Input
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    id={getControlItem.name}
                    type={getControlItem.type}
                    value={value}
                    onChange = {event => setFormData({
                        ...formData,
                        [getControlItem.name] : event.target.value

                    })}

                />)
                break;

        }
        return element;
    }

    return (

        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {
                    formContols.map(controlItem => (
                    <div key={controlItem.name}  className='grid w-full gap-1.5'>
                        <Label className='mb-1'>{controlItem.label}</Label>
                        {
                            renderInputsByComponentType(controlItem)
                        }
                    </div>
                    ))
                }
            </div>

            <Button 
            className='mt-2 w-full' type='submit'
            disabled={isButtonDisabled}
            >{buttonText || 'Submit'}
            </Button>

        </form>
    )
}
