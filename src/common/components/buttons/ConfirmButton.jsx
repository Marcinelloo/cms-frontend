import styled from "styled-components";
import { COLORS } from "../../colors/colors";

const ConfirmButton = styled.button`
  background-color: ${COLORS.first};

  font-size: 14px;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
`;

export default ConfirmButton;
