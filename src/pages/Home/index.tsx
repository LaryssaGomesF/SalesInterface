
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
        <h2>Conteúdo Principal</h2>
        <p>Aqui você insere as telas, tabelas ou formulários da sua aplicação.</p>
      </Content>
    </LayoutContainer>
    )
}