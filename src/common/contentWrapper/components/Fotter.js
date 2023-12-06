import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #f6f6f6;
`;

const Flex = styled.div`
  display: flex;
  gap: 20px;
`;

const Fotter = () => {
  return (
    <>
      <Wrapper>
        <div>©{new Date().getFullYear()} cos cos SP z.o.o. s.p.k</div>{" "}
        <Flex>
          <div>Regulamin</div>
          <div>Polityka Prywatsności</div>
        </Flex>
      </Wrapper>
    </>
  );
};

export default Fotter;
