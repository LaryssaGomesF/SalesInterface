import { Button } from './styles';

interface ButtonProps {
    onClick: () => void
    label: string
}

export function ButtonDefault({onClick, label}: ButtonProps){
    return (
    <Button onClick ={onClick}>
        {label}
    </Button>)

}