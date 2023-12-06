import React from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

const Heading = styled.h2`
  color: #333;
`;

const Paragraph = styled.p`
  color: #555;
`;

const Contact = () => {
  return (
    <PageContainer>
      <Section>
        <Heading>Contact Us</Heading>
        <Paragraph>
          Feel free to reach out to us if you have any questions or inquiries.
        </Paragraph>
      </Section>
      <Section>
        <Heading>Contact Information</Heading>
        <Paragraph>
          Email: info@cardealership.com
          <br />
          Phone: (123) 456-7890
        </Paragraph>
      </Section>
      <Section>
        <Heading>Visit Us</Heading>
        <Paragraph>
          123 Main Street
          <br />
          Cityville, State 12345
        </Paragraph>
      </Section>
    </PageContainer>
  );
};

export default Contact;
