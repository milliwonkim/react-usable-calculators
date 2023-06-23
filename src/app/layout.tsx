import Header from "@/components/Header";
import "../app/global.css";
import styled from "@emotion/styled";
import { spaces } from "@/tokens/tokens";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
}

const Container = styled.div`
  max-width: 400px;
  margin: auto;
  padding: ${spaces.space_16};
  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
  padding: ${spaces.space_16};
  display: flex;
  flex-direction: column;
  gap: ${spaces.space_16};
`;
