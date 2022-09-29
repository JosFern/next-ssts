import { Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import _ from 'lodash';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#192a56',
        color: theme.palette.common.white,
        textAlign: 'center'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        textAlign: 'center'
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function AccountsTable({ accounts }) {


    return (
        <TableContainer component={Paper} data-testid="employer-table">
            <Table sx={{ minWidth: 700 }}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Account ID</StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Password</StyledTableCell>
                        <StyledTableCell>Type</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {_.map(_.filter(accounts, (account) => { return account.type === 'employee' || account.type === 'employer' }), (row, index) => (
                        <StyledTableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell component="th" scope="row">
                                {row.accountID}
                            </StyledTableCell>
                            <StyledTableCell >{row.firstName}</StyledTableCell>
                            <StyledTableCell >{row.email}</StyledTableCell>
                            <StyledTableCell >{row.password}</StyledTableCell>
                            <StyledTableCell >{row.type}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}