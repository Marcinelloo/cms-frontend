import styled from "styled-components";
import { COLORS } from "../../colors/colors";

const CancelButton = styled.button`
  background-color: ${COLORS.second};

  font-size: 14px;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  margin-right: 8px;
`;

export default CancelButton;
