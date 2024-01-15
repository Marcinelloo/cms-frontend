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

const Link = styled.a`
  text-decoration: none;
  color: black;
`;

const Fotter = () => {
  return (
    <>
      <Wrapper>
        <div>©{new Date().getFullYear()} cos cos SP z.o.o. s.p.k</div>{" "}
        <Flex>
          <Link href="/Regulamin.pdf">Regulamin</Link>
          <Link href="/Polityka_prywatności.pdf">Polityka Prywatsności</Link>
        </Flex>
      </Wrapper>
    </>
  );
};

export default Fotter;
