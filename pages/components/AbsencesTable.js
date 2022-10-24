import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import _ from 'lodash';
import { parseISO, format } from 'date-fns';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';

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

export default function AbsencesTable({ absences, deleteAbsence }) {

    const user = useSelector(state => state.logged)

    return <TableContainer component={Paper} data-testid="employer-table">
        <Table sx={{ minWidth: 700 }}>
            <TableHead>
                <TableRow>
                    <StyledTableCell>Date Started</StyledTableCell>
                    <StyledTableCell>Date Ended</StyledTableCell>
                    {user.loggedIn.role === 'employer' && <StyledTableCell>Actions</StyledTableCell>}
                </TableRow>
            </TableHead>
            <TableBody>
                {_.map(absences, (row, index) => (
                    <StyledTableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <StyledTableCell >{format(parseISO(row.dateStart), 'PP')}</StyledTableCell>
                        <StyledTableCell >{format(parseISO(row.dateEnd), 'PP')}</StyledTableCell>
                        {user.loggedIn.role === 'employer' && <StyledTableCell >
                            <Button
                                variant="contained"
                                disabled={user.loggedIn.role === 'employee' && row.approved === 1} className='bg-[#dc3c18]'
                                color='error'
                                onClick={() => deleteAbsence(row.id)}
                            >
                                Delete
                            </Button>
                        </StyledTableCell>}
                    </StyledTableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
}