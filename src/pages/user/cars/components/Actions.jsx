import { addMyCar, removeFromMyCar } from "@/api/repositories/myCar";
import { MESSAGE_TYPES, MessageContext } from "@/common/context/messageContext";
import { useMutation } from "@tanstack/react-query"
import { useContext } from "react";
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

export function AddToMyCars({ carId, onAdded, fontSize }) {
    const { handleAddMessage } = useContext(MessageContext);
    const mutation = useMutation({
        mutationFn: () => addMyCar(carId),
        onSettled: () => {
            handleAddMessage("Dodano samochód do moich Aut!", MESSAGE_TYPES.CORRECT)
            onAdded()
        } 
    });

    return <IconSpan style={{fontSize: fontSize ?? '1.2em'}} className="my-car-icon" onClick={mutation.mutate}>
        🧡
    </IconSpan>
}

export function RemoveFromMyCars({id, onRemoved, fontSize}) {
    const { handleAddMessage } = useContext(MessageContext);
    const mutation = useMutation({
        mutationFn: () => removeFromMyCar(id),
        onSettled: () =>{ 
            handleAddMessage("Usunięto samochód z moich Aut!", MESSAGE_TYPES.WRONG)
            onRemoved()
        }
    });

    return <IconSpan className="my-car-icon" style={{fontSize: fontSize ?? '1.2em'}} onClick={mutation.mutate}>
        ❌
    </IconSpan>
}