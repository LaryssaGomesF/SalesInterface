import styled from 'styled-components';

// 1. Container principal que ocupa 100% da tela
export const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr; /* Coluna da sidebar (250px) + restante da tela */
  grid-template-rows: 60px 1fr;     /* Linha do header (60px) + restante da tela */
  grid-template-areas:
    'sidebar header'
    'sidebar content';
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;


// 3. Cabeçalho (Header)
export const Header = styled.header`
  grid-area: header;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  padding: 0 20px;
`;

// 4. Área do Conteúdo Principal
export const Content = styled.main`
  grid-area: content;
  background-color: #f5f5f9;
  padding: 20px;
  overflow-y: auto; /* Permite rolagem apenas no conteúdo se a página for grande */
`;