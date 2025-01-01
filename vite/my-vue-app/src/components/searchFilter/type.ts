export interface Props {
    submit: () => void
    items: {
        type: 'input' | 'input-number' | 'cascader' | 'radio' | 'select' | 'time-picker' | 'time-select' | 'date-picker' | 'checkbox',
        props: {
            model: string | number | boolean
        }
    }[]
}