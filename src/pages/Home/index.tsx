
 import { useState } from 'react';
import { SidebarComponent } from '../../components/SidebarComponent';
import {
  LayoutContainer,
  Content
} from './styles';
import { HeaderComponent } from '../../components/HeaderComponent';

export function Home(){
    const [activeMenu, setActiveMenu] = useState<string>('Vendas');

    return( 
    <LayoutContainer>
    <SidebarComponent
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />

      <HeaderComponent title={activeMenu} />

     <Content>
          {/* Aqui chamaremos as telas de Vendas, Clientes e Produtos */}
          {activeMenu === 'Vendas' && <div>Tela de Vendas</div>}
          {activeMenu === 'Clientes' && <div>Tela de Clientes</div>}
          {activeMenu === 'Produtos' && <div>Tela de Produtos</div>}
        </Content>
    </LayoutContainer>
    )
}