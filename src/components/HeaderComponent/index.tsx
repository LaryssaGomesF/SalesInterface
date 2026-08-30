import {
  HeaderContainer,
  HeaderTitle,
 
} from './styles';

interface HeaderProps {
  title: string;
}

export function HeaderComponent({
  title
}: HeaderProps) {

  return (
    <HeaderContainer>
      <HeaderTitle>{title}</HeaderTitle>    
    </HeaderContainer>
  );
}