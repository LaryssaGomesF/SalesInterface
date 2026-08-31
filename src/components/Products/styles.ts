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