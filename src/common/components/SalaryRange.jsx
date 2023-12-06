import styled from "styled-components";
import { COLORS } from "../colors/colors";

const SalaryRange = styled.input`
  width: 95%;
  margin-bottom: 10px;
  -webkit-appearance: none;
  appearance: none;
  background: #f0f0f0;
  height: 20px;
  border-radius: 5px;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${COLORS.first};
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${COLORS.first};
    cursor: pointer;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    background: #dcdcdc;
    border-radius: 5px;
  }

  &::-moz-range-track {
    width: 100%;
    height: 5px;
    background: #dcdcdc;
    border-radius: 5px;
  }

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: none;
  }
`;

export default SalaryRange;
