import styled from 'styled-components';

// 3. Cabeçalho (Header)
export const HeaderContainer = styled.header`
  grid-area: header;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e1dd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  box-shadow: 0 2px 4px rgba(13, 27, 42, 0.04);
`;

export const HeaderTitle = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0d1b2a;
`;

