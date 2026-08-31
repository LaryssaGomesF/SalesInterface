import styled from 'styled-components';
import { Button, TableHead, TableCell } from '@mui/material';

export const Container = styled.div`
  padding: 8px;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;

export const SubmitButton = styled(Button)`
  && {
    background-color: #0d1b2a;
    &:hover {
      background-color: #1b263b;
    }
  }
`;

export const StyledTableHead = styled(TableHead)`
  background-color: #0d1b2a;
`;

export const HeaderTableCell = styled(TableCell)`
  && {
    color: #fff;
    font-weight: bold;
  }
`;

export const ItemsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid #e0e0e0;
  padding: 12px;
  border-radius: 8px;
`;

export const ItemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 4px;
`;