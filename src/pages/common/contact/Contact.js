import React from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  height: 100%;
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
        <Heading>Kontakt</Heading>
        <Paragraph>
          Witaj w naszej wypożyczalni samochodów, gdzie podróżowanie staje się
          przyjemnością! Jesteśmy gotowi odpowiedzieć na Twoje pytania i
          zapewnić niezapomniane doświadczenie podróżowania.
        </Paragraph>
      </Section>
      <Section>
        <Heading>Dlaczego My?</Heading>
        <Paragraph>
          Nasza wypożyczalnia oferuje nie tylko samochody, ale także unikalne
          doświadczenie podróży. Oferujemy szeroki wybór luksusowych pojazdów,
          które pozwolą Ci podróżować z klasą. Nasza flota jest zawsze utrzymana
          w najwyższym standardzie, aby zapewnić bezpieczeństwo i komfort.
        </Paragraph>
      </Section>
      <Section>
        <Heading>Dane Kontaktowe</Heading>
        <Paragraph>
          Email: info@cardealership.com
          <br />
          Telefon: (123) 456-7890
        </Paragraph>
      </Section>
      <Section>
        <Heading>Odwiedź Nas</Heading>
        <Paragraph>
          Znajdziesz nas pod adresem: 123 Ulica Główna, Miastowo, Województwo
          12345. Nie wahaj się nas odwiedzić i dowiedzieć się więcej o naszych
          usługach.
        </Paragraph>
      </Section>
      <Section>
        <Heading>Dodatkowe Informacje</Heading>
        <Paragraph>
          Chcemy, aby Twoje podróże były nie tylko wygodne, ale także pełne
          przygód. Sprawdź naszą stronę internetową, aby dowiedzieć się o
          najnowszych promocjach, trasach podróży i unikalnych ofertach dla
          naszych klientów.
        </Paragraph>
      </Section>
    </PageContainer>
  );
};

export default Contact;
