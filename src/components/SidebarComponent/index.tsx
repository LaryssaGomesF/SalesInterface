import {
  Sidebar,
  SidebarTitle,
  NavList,
  NavItem
} from './styles';

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

export function SidebarComponent({ activeMenu, setActiveMenu }: SidebarProps) {
  const menuItems = ['Vendas', 'Clientes', 'Produtos'];

  return (
    <Sidebar>
      <SidebarTitle>Menu</SidebarTitle>
      <nav>
        <NavList>
          {menuItems.map((item) => (
            <NavItem
              key={item}
              $isActive={activeMenu === item}
              onClick={() => setActiveMenu(item)}
            >
              {item}
            </NavItem>
          ))}
        </NavList>
      </nav>
    </Sidebar>
  );
}