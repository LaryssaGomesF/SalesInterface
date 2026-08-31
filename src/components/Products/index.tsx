import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { useSales } from '../../contexts/SalesProvider';
import * as S from './styles';

interface FormErrors {
  name?: string;
  price?: string;
}

export function Products() {
  const { products, loadingProducts, createProduct } = useSales();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados para controlar o Snackbar de Erro
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = 'O nome é obrigatório.';
    }

    if (!price || Number(price) <= 0) {
      newErrors.price = 'O preço é obrigatório e deve ser maior que zero.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await createProduct({
        name,
        price: Number(price),
      });
      setName('');
      setPrice('');
      setErrors({});
    } catch (error: unknown) {
      let apiMessage = 'Erro ao cadastrar produto. Tente novamente.';

      if (error instanceof Error) {
        apiMessage = error.message;
      }

      setErrorMessage(apiMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para fechar o Snackbar
  const handleCloseSnackbar = () => {
    setErrorMessage(null);
  };

  return (
    <S.Container>
      <Grid container spacing={3}>
        {/* Formulário de Cadastro */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom color="primary">
                Cadastrar Produto
              </Typography>

              <S.FormContainer onSubmit={handleSubmit} noValidate>
                <TextField
                  label="Nome do Produto"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                />

                <TextField
                  label="Preço (R$)"
                  type="number"
                  variant="outlined"
                  fullWidth
                  slotProps={{
                    htmlInput: { step: '0.01', min: '0' }
                  }}
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    if (errors.price) setErrors((prev) => ({ ...prev, price: undefined }));
                  }}
                  error={Boolean(errors.price)}
                  helperText={errors.price}
                />

                <S.SubmitButton
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Salvar Produto'}
                </S.SubmitButton>
              </S.FormContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Tabela de Listagem */}
        <Grid size={{ xs: 12, md: 8 }}>
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <S.StyledTableHead>
                <TableRow>
                  <S.HeaderTableCell>ID</S.HeaderTableCell>
                  <S.HeaderTableCell>Nome</S.HeaderTableCell>
                  <S.HeaderTableCell align="right">Preço</S.HeaderTableCell>
                </TableRow>
              </S.StyledTableHead>
              <TableBody>
                {loadingProducts ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <CircularProgress sx={{ my: 2 }} />
                    </TableCell>
                  </TableRow>
                ) : products.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Nenhum produto cadastrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((product) => (
                    <TableRow key={product.productId} hover>
                      <TableCell>{product.productId}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell align="right">
                        {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* Snackbar de Erro */}
      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" variant="filled" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </S.Container>
  );
}