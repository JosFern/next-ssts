import { ButtonGroup, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { deleteCompany } from '../../store/reducers/company';

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


export default function CompanyTable({ companies, handleDeleteModal }) {

    const router = useRouter()

    const dispatch = useDispatch()


    return (
        <TableContainer component={Paper} data-testid="employer-table">
            <Table sx={{ minWidth: 700 }}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Account ID</StyledTableCell>
                        <StyledTableCell>Company name</StyledTableCell>
                        <StyledTableCell>Leaves</StyledTableCell>
                        <StyledTableCell>Overtime Limit</StyledTableCell>
                        <StyledTableCell>Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {_.map(companies, (row, index) => (
                        <StyledTableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell component="th" scope="row">
                                {row.accountID}
                            </StyledTableCell>
                            <StyledTableCell >{row.name}</StyledTableCell>
                            <StyledTableCell >{row.leaves}</StyledTableCell>
                            <StyledTableCell >{row.overtimeLimit}</StyledTableCell>
                            <StyledTableCell >
                                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                    <Button className='bg-[#33b33d]' color='success' onClick={() => router.push('/company/form?id=' + row.accountID)}>Update</Button>
                                    <Button onClick={() => handleDeleteModal(row.accountID)} className='bg-[#dc3c18]' color='error'>Delete</Button>
                                </ButtonGroup>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}