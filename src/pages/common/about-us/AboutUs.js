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

const AboutUs = () => {
  return (
    <PageContainer>
      <Section>
        <Heading>Witaj w Naszym Salonie Samochodowym</Heading>
        <Paragraph>
          Jesteśmy dynamicznym i doświadczonym dealerem pojazdów, oferującym
          szeroki asortyment nowych i używanych samochodów. Nasza firma działa
          na rynku od ponad 10 lat, z pasją dostarczając klientom wysokiej
          jakości pojazdy.
        </Paragraph>
      </Section>

      <Section>
        <Heading>Nasza Misja</Heading>
        <Paragraph>
          Naszym celem jest zapewnienie klientom satysfakcji poprzez
          profesjonalną obsługę i oferowanie pojazdów, które spełniają najwyższe
          standardy jakości. Stawiamy na uczciwość, przejrzystość i partnerskie
          relacje z naszymi klientami.
        </Paragraph>
      </Section>

      <Section>
        <Heading>Co Nas Wyróżnia?</Heading>
        <Paragraph>
          - Bogaty wybór nowych i używanych samochodów różnych marek i modeli.
          <br />
          - Sprzedaż pojazdów dostosowanych do różnych potrzeb i budżetów.
          <br />
          - Profesjonalna obsługa klienta i doradztwo w doborze odpowiedniego
          pojazdu.
          <br />- Atrakcyjne warunki finansowania i leasingu.
        </Paragraph>
      </Section>
      <Section>
        <Heading>Nasi Specjaliści</Heading>
        <Paragraph>
          Zespół naszych doświadczonych specjalistów zawsze służy pomocą. Nasi
          sprzedawcy posiadają szeroką wiedzę na temat rynku samochodowego i
          zawsze są gotowi odpowiedzieć na wszelkie pytania klientów.
        </Paragraph>
      </Section>
    </PageContainer>
  );
};

export default AboutUs;
