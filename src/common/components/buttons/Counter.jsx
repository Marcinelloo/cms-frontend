import Button from "@/common/components/buttons/Button";
import styled from "styled-components";
import Input from "@/common/components/Input";
import {useState} from "react";

const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  vertical-align: middle;
`;

const Counter = ({value, counterRef}) => {

    const handleDecrement = (amount) => {

        counterRef.current.value = Math.max(0, (parseFloat(counterRef.current.value) || 0) - amount);
    };

    const handleIncrement = (amount) => {
        counterRef.current.value = (parseFloat(counterRef.current.value) || 0) + amount;
    };

    return (
        <InputDiv>
            <Button type="add" text="-5" handler={() => handleDecrement(5)}/>
            <Button type="add" text="-1" handler={() => handleDecrement(1)}/>
            <Input
                type="number"
                value={value}
                width={"200px"}
                inputRef={counterRef}
            />
            <Button type="add" text="+1" handler={() => handleIncrement(1)}/>
            <Button type="add" text="+5" handler={() => handleIncrement(5)}/>
        </InputDiv>
    );
};

export default Counter;
