import styled from 'styled-components';

export const Sidebar = styled.aside`
  grid-area: sidebar;
  background-color: #0d1b2a; /* Azul marinho escuro */
  color: #ffffff;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
`;

export const SidebarTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #e0e1dd;
  padding-left: 12px;
  letter-spacing: 0.5px;
`;

export const NavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// Interface para controlar a propriedade 'isActive' no TypeScript
interface NavItemProps {
  $isActive: boolean;
}

export const NavItem = styled.li<NavItemProps>`
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  transition: all 0.2s ease-in-out;

  /* Estilização condicional baseada no item selecionado */
  background-color: ${(props) => (props.$isActive ? '#ffffff' : 'transparent')};
  color: ${(props) => (props.$isActive ? '#0d1b2a' : '#778da9')};
  box-shadow: ${(props) =>
    props.$isActive ? '0 2px 6px rgba(0,0,0,0.1)' : 'none'};

  &:hover {
    background-color: ${(props) => (props.$isActive ? '#ffffff' : '#1b263b')};
    color: ${(props) => (props.$isActive ? '#0d1b2a' : '#ffffff')};
  }
`;