import React, { useEffect, useState, FormEvent, useCallback, ChangeEvent } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Container,
    Button,
    IconButton,
    Avatar,
    TextField,
    Grid,
} from '@material-ui/core';

import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    AddCircle as AddCircleIcon
} from '@material-ui/icons';

import styles from './styles';
import api from '../../services/api';
import { addUserAndEdit } from '../../utils/validations';
import { useConfirm } from 'material-ui-confirm';
import Dialog from '../../components/Dialog';
import AppBar from '../../components/AppBar';

interface UserProps {
    id: number,
    first_name: string,
    last_name: string,
    avatar: string
}

interface UserTarget extends HTMLElement {
    name: HTMLInputElement,
    last_name: HTMLInputElement,
    avatar: HTMLInputElement
}

export default function DenseTable() {
    const confirm = useConfirm();
    const classes = styles();

    const [users, setUsers] = useState<UserProps[]>([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const [inputId, setInputId] = useState<number | null>(null);
    const [inputName, setInputName] = useState('');
    const [inputLastName, setInputLastName] = useState('');
    const [inputAvatar, setinputAvatar] = useState('');

    const [error, setError] = useState<any>();

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [titleDialog, setTitleDialog] = useState('');
    const [descriptionDialog, setDescriptionDialog] = useState('');

    const [btn, setBtn] = useState('Cadastrar');


    function hendleCloseDialog(){
        setOpenDialog(false)
    }

    async function getUsers() {
        const response = await api.get(`/users?page=${page}`)

        setUsers(state => state.length > 0 ? [...state, ...response.data.data] : response.data.data)
        setPage(response.data.page + 1)
        setTotalPage(response.data.total_pages)
    }

    useEffect(() => {
        getUsers();
    }, [])

    function clenInput() {
        setInputId(null)
        setInputName('')
        setInputLastName('')
        setinputAvatar('')
    }

    const changeInputName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInputName(e.target.value)
    }, [inputName])

    const changeInputLastName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setInputLastName(e.target.value)
    }, [inputLastName])

    const changeInputAvatar = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setinputAvatar(e.target.value)
    }, [inputAvatar])


    function loadUsers() {
        if (page <= totalPage) {
            getUsers()
        }
    }

    function dataUserTarget(target: UserTarget) {
        return {
            first_name: target.name?.value,
            last_name: target.last_name?.value,
            avatar: target.avatar?.value
        }
    }

    function dialogAdd() {
        clenInput()
        setBtn('Cadastrar')
        setTitleDialog('Cadastrar usuario')
        setDescriptionDialog('Preencha os campos abaixo para cadastrar um usuário')
        setOpenDialog(true)
    }

    async function addUser(e: FormEvent) {
        e.preventDefault()
        setError('')
        const target = e.target as UserTarget;

        const data = dataUserTarget(target)

        const validation = await addUserAndEdit(data.first_name, data.last_name, data.avatar)
        console.log(validation)
        if (typeof validation !== "boolean" && validation !== true) {
            setError(validation)
            return
        }

        const response = await api.post(`/users`, data)

        if (response.status !== 201) return
        setUsers(state => [response.data, ...state])
        setOpenDialog(false)
        clenInput()
    }

    function editUser(id: number) {
        setError('')
        console.log('ops')
        setOpenDialog(true)

        setTitleDialog('Editar usuário')
        setDescriptionDialog('Preencha os campos abaixo para editar o usuário')

        console.log(openDialog);

        const user = users.filter(user => user.id === id);
        setInputName(user[0].first_name)
        setInputLastName(user[0].last_name)
        setinputAvatar(user[0].avatar)
        setInputId(user[0].id);

        setBtn('Editar');
    }

    async function upadtetUser(e: FormEvent) {
        e.preventDefault()
        if (!inputId) return

        const target = e.target as UserTarget;

        const data = dataUserTarget(target)

        const validation = await addUserAndEdit(data.first_name, data.last_name, data.avatar)
        console.log(validation)
        if (typeof validation !== "boolean" && validation !== true) {
            setError(validation)
            return
        }

        const usersUpdate = users.filter(user => user.id !== inputId)

        const user: UserProps = { id: inputId, ...data }

        const response = await api.put(`/users/${inputId}`, user);

        if (response.status !== 200) return
        setUsers([response.data, ...usersUpdate])

        clenInput()
        setBtn('Cadastrar');
        setOpenDialog(false)
    }

    async function revomeUser(id: number) {
        const user = users.filter(user => user.id === id);
        try {
            await confirm({ title: 'Deletar usuario',
                description: `Deseja deletar ${user[0].first_name}?`,
                confirmationText: 'Sim',
                cancellationText: 'Não',
                dialogProps: {
                    open: true,
                    maxWidth: 'xs',
                }
            })
        } catch (error) {
            return
        }
        const newUsers = users.filter(user => user.id !== id);
        const response = await api.delete(`/users/${id}`)
        if (response.status !== 204) return
        setUsers(newUsers)
    }

    return (
        <>
        <AppBar />
        <Container maxWidth="md" className={classes.container}>
            <Button
                className={classes.buttonDialog}
                onClick={dialogAdd}
                size='medium'
                variant="contained"
                color="secondary"
                startIcon={<AddCircleIcon />}
            >
                Cadastrar
            </Button>

            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Avatar</TableCell>
                            <TableCell align="left">Nome</TableCell>
                            <TableCell align="left">Sobrenome</TableCell>
                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell align="left">
                                    <Avatar alt="Remy Sharp" src={user.avatar} className={classes.small} />
                                </TableCell>
                                <TableCell align="left">{user.first_name}</TableCell>
                                <TableCell align="left">{user.last_name}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => editUser(user.id)}
                                        title="Atualizar"
                                        aria-label="Atualizar"
                                        color='inherit'
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => revomeUser(user.id)}
                                        title="Deletar"
                                        aria-label="Deletar"
                                        color="secondary"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {users.length === 0 ? <span> Nenhum dado encontrado </span> : ''}
            </TableContainer>
            <Button className={classes.loadMore} onClick={loadUsers}>Carregar mais</Button>
            <Dialog
                close={hendleCloseDialog}
                open={openDialog}
                title={titleDialog}
                description={descriptionDialog}
            >
                <form onSubmit={btn === 'Cadastrar' ? addUser : upadtetUser} className={classes.root} noValidate autoComplete="off">
                    <Grid container spacing={1}>
                        <Grid item md={6} xs={12} sm={12}>
                            <TextField
                                fullWidth
                                error={error?.name ? true : false} helperText={error?.name}
                                name="name"
                                onChange={changeInputName}
                                value={inputName}
                                label="Nome"
                                color='secondary'
                            />
                        </Grid>
                        <Grid item md={6} xs={12} sm={12}>
                            <TextField
                                fullWidth
                                error={error?.last_name ? true : false} helperText={error?.last_name}
                                name="last_name"
                                onChange={changeInputLastName}
                                value={inputLastName}
                                label="Sobrenome"
                                color="secondary"
                            />
                        </Grid>
                        <Grid item md={12} xs={12} sm={12}>
                            <TextField
                                fullWidth
                                error={error?.avatar ? true : false} helperText={error?.avatar}
                                name="avatar"
                                onChange={changeInputAvatar}
                                value={inputAvatar}
                                label="Avatar"
                                color="secondary"
                            />
                        </Grid>
                        <Grid item md={12} xs={12} sm={12}>
                            <Button type="submit"
                                fullWidth
                                className={classes.button}
                                size="small"
                                variant="contained"
                                color="secondary"
                                startIcon={btn === 'Cadastrar' ?<AddCircleIcon /> : <EditIcon /> }
                            >
                                {btn}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Dialog>
        </Container>
        </>

    );
}
