import { Avatar, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import Container from '@mui/material/Container'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import DashboardLayout from '../components/DashboardLayout'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

function createData(start, end, reason) {
  return { start, end, reason};
}

const rows = [
  createData('Sep 13, 22', 'Sep 15, 22', 'fever'),
  createData('Nov 14,22', 'Nov 18,22', 'holiday vacation'),
];

export default function Home() {

    return (
        <DashboardLayout
            style={{
                background: '#f0f2f5',
                minHeight: '100vh'
            }}
        >
            <Container>

                <div
                    style={{
                        background: '#ffffff',
                        padding: '1rem',
                        borderRadius: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        color: 'gray',
                        boxShadow: '1px 1px 10px',
                        marginBottom: '15px'
                    }}
                >
                    <Avatar sx={{ bgcolor: blue[400], width: 100, height: 100 }}>J</Avatar>
                    
                    <div>
                        <Typography mt={2} variant="h5" >Name: Joselito</Typography>
                        <Typography mt={2} >Email: joselito@gmail.com</Typography>

                    </div>

                    <div>
                        <Typography mt={2} >Salary/Hour: P390</Typography>
                        <Typography mt={2} >Remaining Leaves: 2</Typography>
                        <Typography mt={2} >Absences: 0</Typography>
                    </div>

                
                </div>

                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>Date Started</StyledTableCell>
                                <StyledTableCell>Date Ended</StyledTableCell>
                                <StyledTableCell>Reason</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.start}
                                    </StyledTableCell>
                                    <StyledTableCell >{row.end}</StyledTableCell>
                                    <StyledTableCell >{row.reason}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Container>

        </DashboardLayout>
  )
}
