import { useMemo, useState } from 'react';
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
  Alert,
  Autocomplete,
  IconButton,
  Button,
  Divider,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import {
  AddCircle,
  Delete,
  ExpandMore,
} from '@mui/icons-material';

import { useSales } from '../../contexts/SalesProvider';
import type { Client } from '../../types/sales';

import {
  Container,
  FormContainer,
  ItemsSection,
  ItemRow,
  TotalContainer,
  SubmitButton,
  StyledTableHead,
  HeaderTableCell,
} from './styles';

interface DraftItem {
  id: string;
  productId: number | '';
  quantity: number | '';
}

interface FormErrors {
  client?: string;
  items?: string;
  date?: string;
}

const createEmptyItem = (): DraftItem => ({
  id: crypto.randomUUID(),
  productId: '',
  quantity: 1,
});

export function Sales() {
  const {
    clients,
    products,
    sales,
    loadingSales,
    createSale,
  } = useSales();

  // =========================
  // Estados
  // =========================

  const [selectedClient, setSelectedClient] =
    useState<Client | null>(null);

  const [saleDate, setSaleDate] = useState(
    () => new Date().toISOString().split('T')[0]
  );

  const [items, setItems] = useState<DraftItem[]>([
    createEmptyItem(),
  ]);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  // =========================
  // Manipulação dos itens
  // =========================

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      createEmptyItem(),
    ]);

    if (errors.items) {
      setErrors((prev) => ({
        ...prev,
        items: undefined,
      }));
    }
  };

  const handleRemoveItem = (id: string) => {
    if (items.length === 1) {
      return;
    }

    setItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const handleProductChange = (
    id: string,
    productId: number | ''
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              productId,
            }
          : item
      )
    );

    if (errors.items) {
      setErrors((prev) => ({
        ...prev,
        items: undefined,
      }));
    }
  };

  const handleQuantityChange = (
    id: string,
    value: string
  ) => {
    const quantity =
      value === '' ? '' : Number(value);

    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );

    if (errors.items) {
      setErrors((prev) => ({
        ...prev,
        items: undefined,
      }));
    }
  };

  // =========================
  // Cálculo do total
  // =========================

  const calculatedTotal = useMemo(() => {
    return items.reduce((total, item) => {
      if (
        !item.productId ||
        !item.quantity ||
        item.quantity <= 0
      ) {
        return total;
      }

      const product = products.find(
        (product) =>
          product.productId === item.productId
      );

      if (!product) {
        return total;
      }

      return total + product.price * item.quantity;
    }, 0);
  }, [items, products]);

  // =========================
  // Validação
  // =========================

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!selectedClient) {
      newErrors.client =
        'Selecione um cliente.';
    }

    if (!saleDate) {
      newErrors.date =
        'Selecione a data da venda.';
    }

    const hasInvalidItems = items.some(
      (item) =>
        !item.productId ||
        !item.quantity ||
        item.quantity <= 0
    );

    if (hasInvalidItems) {
      newErrors.items =
        'Preencha todos os produtos e quantidades corretamente.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================
  // Envio da venda
  // =========================

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formattedItems = items.map(
        (item) => ({
          productId: Number(item.productId),
          quantity: Number(item.quantity),
        })
      );

      const [year, month, day] =
        saleDate.split('-');

      const formattedDate = new Date(
        Number(year),
        Number(month) - 1,
        Number(day)
      ).toISOString();

      await createSale({
        clientId: selectedClient!.clientId,
        saleDate: formattedDate,
        items: formattedItems,
      });

      // Limpa formulário
      setSelectedClient(null);

      setSaleDate(
        new Date()
          .toISOString()
          .split('T')[0]
      );

      setItems([createEmptyItem()]);
      setErrors({});
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(
          'Erro ao efetuar venda. Tente novamente.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Grid container spacing={3}>

        {/* =====================================
            Formulário
        ===================================== */}

        <Grid  size={{ xs: 12, md: 5 }}>
          <Card elevation={3}>
            <CardContent>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                color="primary"
              >
                Nova Venda
              </Typography>

              <FormContainer
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Cliente */}

                <Autocomplete
                  options={clients}
                  getOptionLabel={(option) =>
                    `${option.name} (CPF: ${option.cpf})`
                  }
                  value={selectedClient}
                  onChange={(_, newValue) => {
                    setSelectedClient(newValue);

                    if (errors.client) {
                      setErrors((prev) => ({
                        ...prev,
                        client: undefined,
                      }));
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Buscar Cliente (Nome ou CPF) *"
                      error={Boolean(
                        errors.client
                      )}
                      helperText={errors.client}
                      fullWidth
                    />
                  )}
                />

                {/* Data */}

                <TextField
                  label="Data da Venda *"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={saleDate}
                  onChange={(e) => {
                    setSaleDate(
                      e.target.value
                    );

                    if (errors.date) {
                      setErrors((prev) => ({
                        ...prev,
                        date: undefined,
                      }));
                    }
                  }}
                  error={Boolean(errors.date)}
                  helperText={errors.date}
                  
                />

                <Divider />

                {/* Produtos */}

                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  Produtos
                </Typography>

                <ItemsSection>
                  {items.map((item) => (
                    <ItemRow key={item.id}>

                      {/* Produto */}

                      <TextField
                        select
                        label="Produto *"
                        size="small"
                        fullWidth
                        value={item.productId}
                        onChange={(e) => {
                          const value =
                            e.target.value;

                          handleProductChange(
                            item.id,
                            value
                              ? Number(value)
                              : ''
                          );
                        }}
                      >
                        {products.map((prod) => (
                          <MenuItem
                            key={prod.productId}
                            value={prod.productId}
                          >
                            {prod.name} -{' '}
                            {prod.price.toLocaleString(
                              'pt-BR',
                              {
                                style:
                                  'currency',
                                currency:
                                  'BRL',
                              }
                            )}
                          </MenuItem>
                        ))}
                      </TextField>

                      {/* Quantidade */}

                      <TextField
                        label="Qtd *"
                        type="number"
                        size="small"
                        sx={{
                          width: '90px',
                        }}
                        value={item.quantity}
                       
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            e.target.value
                          )
                        }
                      />

                      {/* Remover item */}

                      <IconButton
                        color="error"
                        type="button"
                        onClick={() =>
                          handleRemoveItem(
                            item.id
                          )
                        }
                        disabled={
                          items.length === 1
                        }
                        aria-label="Remover produto"
                      >
                        <Delete />
                      </IconButton>
                    </ItemRow>
                  ))}

                  {/* Adicionar produto */}

                  <Button
                    type="button"
                    startIcon={<AddCircle />}
                    onClick={handleAddItem}
                    variant="outlined"
                    size="small"
                  >
                    Adicionar Produto
                  </Button>
                </ItemsSection>

                {/* Erro */}

                {errors.items && (
                  <Typography
                    variant="caption"
                    color="error"
                  >
                    {errors.items}
                  </Typography>
                )}

                {/* Total */}

                <TotalContainer>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    Total da Venda:
                  </Typography>

                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    {calculatedTotal.toLocaleString(
                      'pt-BR',
                      {
                        style:
                          'currency',
                        currency:
                          'BRL',
                      }
                    )}
                  </Typography>
                </TotalContainer>

                {/* Finalizar */}

                <SubmitButton
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <CircularProgress
                      size={24}
                      color="inherit"
                    />
                  ) : (
                    'Finalizar Venda'
                  )}
                </SubmitButton>
              </FormContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* =====================================
            Tabela de vendas
        ===================================== */}

        <Grid >
          <TableContainer
            component={Paper}
            elevation={3}
          >
            <Table>
              <StyledTableHead>
                <TableRow>
                  <HeaderTableCell>
                    ID
                  </HeaderTableCell>

                  <HeaderTableCell>
                    Cliente
                  </HeaderTableCell>

                  <HeaderTableCell>
                    Data
                  </HeaderTableCell>

                  <HeaderTableCell align="right">
                    Total
                  </HeaderTableCell>

                  <HeaderTableCell align="center">
                    Itens
                  </HeaderTableCell>
                </TableRow>
              </StyledTableHead>

              <TableBody>
                {loadingSales ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      align="center"
                    >
                      <CircularProgress
                        sx={{ my: 2 }}
                      />
                    </TableCell>
                  </TableRow>
                ) : sales.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      align="center"
                    >
                      Nenhuma venda realizada.
                    </TableCell>
                  </TableRow>
                ) : (
                  sales.map((sale) => (
                    <TableRow
                      key={sale.saleId}
                      hover
                    >
                      <TableCell>
                        {sale.saleId}
                      </TableCell>

                      <TableCell>
                        {sale.clientName}
                      </TableCell>

                      <TableCell>
                        {new Date(
                          sale.saleDate
                        ).toLocaleDateString(
                          'pt-BR'
                        )}
                      </TableCell>

                      <TableCell align="right">
                        {sale.priceTotal.toLocaleString(
                          'pt-BR',
                          {
                            style:
                              'currency',
                            currency:
                              'BRL',
                          }
                        )}
                      </TableCell>

                      <TableCell align="center">
                        <Accordion
                          elevation={0}
                        >
                          <AccordionSummary
                            expandIcon={
                              <ExpandMore />
                            }
                          >
                            <Typography variant="caption">
                              {
                                sale.items
                                  .length
                              }{' '}
                              item(ns)
                            </Typography>
                          </AccordionSummary>

                          <AccordionDetails>
                            {sale.items.map(
                              (item) => (
                                <Typography
                                  key={
                                    item.saleItemId
                                  }
                                >
                                  •{' '}
                                  {
                                    item.productName
                                  }{' '}
                                  (
                                  {
                                    item.quantity
                                  }
                                  x{' '}
                                  {item.unitPrice.toLocaleString(
                                    'pt-BR',
                                    {
                                      style:
                                        'currency',
                                      currency:
                                        'BRL',
                                    }
                                  )}
                                  )
                                </Typography>
                              )
                            )}
                          </AccordionDetails>
                        </Accordion>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* =====================================
          Snackbar
      ===================================== */}

      <Snackbar
        open={Boolean(errorMessage)}
        autoHideDuration={4000}
        onClose={() =>
          setErrorMessage(null)
        }
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Alert
          onClose={() =>
            setErrorMessage(null)
          }
          severity="error"
          variant="filled"
          sx={{
            width: '100%',
          }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}