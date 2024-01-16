import { addMyCar, removeFromMyCar } from "@/api/repositories/myCar";
import { useMutation } from "@tanstack/react-query"
import styled from "styled-components"

const IconSpan = styled.span`
    position: absolute;
    top: 15px;
    right: 15px;
    transition: 0.25s;
    cursor: pointer;
    font-size: 1.2em;

    &:hover {
        transform: scale(1.1);
    }
`

export function AddToMyCars({ carId, onAdded }) {
    const mutation = useMutation({
        mutationFn: () => addMyCar(carId),
        onSettled: () => onAdded() 
    });

    return <IconSpan onClick={mutation.mutate}>
        🧡
    </IconSpan>
}

export function RemoveFromMyCars({id, onRemoved}) {
    const mutation = useMutation({
        mutationFn: () => removeFromMyCar(id),
        onSettled: () => onRemoved() 
    });

    return <IconSpan onClick={mutation.mutate}>
        ❌
    </IconSpan>
}