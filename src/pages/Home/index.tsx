
 import { useState } from 'react';
import { SidebarComponent } from '../../components/SidebarComponent';
import {
  LayoutContainer,
  Content
} from './styles';
import { HeaderComponent } from '../../components/HeaderComponent';
import { Products } from '../../components/Products';
import { Clients } from '../../components/Clients';
import { Sales } from '../../components/Sales';

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
          {activeMenu === 'Vendas' && <Sales />}
          {activeMenu === 'Clientes' && <Clients />}
          {activeMenu === 'Produtos' && <Products />}
        </Content>
    </LayoutContainer>
    )
}