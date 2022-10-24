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
import { Button, ButtonGroup } from '@mui/material';
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

export default function OvertimeTable({ overtimes, deleteOT, approveOT }) {

    const user = useSelector(state => state.logged)

    return <TableContainer component={Paper} data-testid="employer-table">
        <Table sx={{ minWidth: 700 }}>
            <TableHead>
                <TableRow>
                    <StyledTableCell>Date Happen</StyledTableCell>
                    <StyledTableCell>Time Started</StyledTableCell>
                    <StyledTableCell>Time Ended</StyledTableCell>
                    <StyledTableCell>Reason</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {_.map(overtimes, (row, index) => (
                    <StyledTableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <StyledTableCell >{format(parseISO(row.dateHappen), 'PP')}</StyledTableCell>
                        <StyledTableCell >{format(parseISO(row.timeStart), 'pp')}</StyledTableCell>
                        <StyledTableCell >{format(parseISO(row.timeEnd), 'pp')}</StyledTableCell>
                        <StyledTableCell >{row.reason}</StyledTableCell>
                        <StyledTableCell >{row.approved === 0 ? 'Deny' : 'Approve'}</StyledTableCell>
                        <StyledTableCell >
                            <ButtonGroup
                                variant="contained"
                                aria-label="outlined primary button group">
                                {user.loggedIn.role === 'employer' && row.approved === 0 && <Button className='bg-[#33b33d]' color='success' onClick={() => approveOT(row.id)}>Approve</Button>}

                                <Button
                                    disabled={user.loggedIn.role === 'employee' && row.approved === 1} className='bg-[#dc3c18]'
                                    color='error'
                                    onClick={() => deleteOT(row.id)}
                                >
                                    Delete
                                </Button>
                            </ButtonGroup>
                        </StyledTableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
}