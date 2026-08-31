import { useState, useEffect, useCallback } from 'react';
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
import { api } from '../../services/api';
import type { Client } from '../../types/sales';
import { validateCpf } from '../../utils/validateCpf';
import * as S from './styles';

interface FormErrors {
  name?: string;
  cpf?: string;
  email?: string;
}

export function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loadingClients, setLoadingClients] = useState(true);

  // Estados do Formulário
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchClients = useCallback(async () => {
    setLoadingClients(true);
    try {
      const data = await api.get<Client[]>('/Client');
      setClients(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setLoadingClients(false);
    }
  }, []);

  useEffect(() => {

    async function fetchData(){
        fetchClients();
    }
    fetchData()
  }, [fetchClients]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const rawCpf = cpf.replace(/\D/g, '');

    if (!name.trim()) {
      newErrors.name = 'O nome é obrigatório.';
    }

    if (!rawCpf) {
      newErrors.cpf = 'O CPF é obrigatório.';
    } else if (!validateCpf(rawCpf)) {
      newErrors.cpf = 'Informe um CPF válido.';
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Informe um e-mail válido.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const rawCpf = cpf.replace(/\D/g, '');
      const formattedBirthDate = birthDate ? new Date(birthDate).toISOString() : undefined;

      await api.post('/Client', {
        name,
        cpf: rawCpf,
        birthDate: formattedBirthDate,
        email: email || undefined,
        telefone: telefone || undefined,
      });

      setName('');
      setCpf('');
      setBirthDate('');
      setEmail('');
      setTelefone('');
      setErrors({});
      await fetchClients();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Erro ao cadastrar cliente. Tente novamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.Container>
      <Grid container spacing={3}>
        {/* Formulário de Cadastro */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom color="primary">
                Cadastrar Cliente
              </Typography>

              <S.FormContainer onSubmit={handleSubmit} noValidate>
                <TextField
                  label="Nome *"
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
                  label="CPF *"
                  variant="outlined"
                  fullWidth
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => {
                    setCpf(e.target.value);
                    if (errors.cpf) setErrors((prev) => ({ ...prev, cpf: undefined }));
                  }}
                  error={Boolean(errors.cpf)}
                  helperText={errors.cpf}
                />

                <TextField
                  label="Data de Nascimento"
                  type="date"
                  variant="outlined"
                  fullWidth
                  slotProps={{
                    inputLabel: { shrink: true }
                  }}
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />

                <TextField
                  label="E-mail"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />

                <TextField
                  label="Telefone"
                  variant="outlined"
                  fullWidth
                  placeholder="(00) 00000-0000"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />

                <S.SubmitButton
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Salvar Cliente'}
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
                  <S.HeaderTableCell>CPF</S.HeaderTableCell>
                  <S.HeaderTableCell>E-mail</S.HeaderTableCell>
                  <S.HeaderTableCell>Telefone</S.HeaderTableCell>
                </TableRow>
              </S.StyledTableHead>
              <TableBody>
                {loadingClients ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <CircularProgress sx={{ my: 2 }} />
                    </TableCell>
                  </TableRow>
                ) : clients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Nenhum cliente cadastrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  clients.map((client) => (
                    <TableRow key={client.clientId} hover>
                      <TableCell>{client.clientId}</TableCell>
                      <TableCell>{client.name}</TableCell>
                      <TableCell>{client.cpf}</TableCell>
                      <TableCell>{client.email || '-'}</TableCell>
                      <TableCell>{client.telefone || '-'}</TableCell>
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
        onClose={() => setErrorMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setErrorMessage(null)} severity="error" variant="filled" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </S.Container>
  );
}