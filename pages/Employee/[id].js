import { Avatar, Box, Typography } from '@mui/material'
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
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

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

function createData(start, end, reason) {
  return { start, end, reason };
}

const rows = [
  createData('Sep 13, 22', 'Sep 15, 22', 'fever'),
  createData('Nov 14,22', 'Nov 18,22', 'holiday vacation'),
];


export default function EmployeeInfo() {

  return (

    <DashboardLayout>
      <Container>

        <Box
          data-testid="employee-info"
          className='flex justify-between items-center gap-4 mb-4 w-full text-white h-[160px]'
        >

          <Box className='bg-[#fba600] flex p-4 rounded-md gap-4 h-full'>

            <Avatar sx={{ bgcolor: blue[800], width: 100, height: 100, fontSize: '40px' }}>J</Avatar>

            <Box>
              <Typography mt={2} variant="h5" >Name: Joselito</Typography>
              <Typography mt={2} >Email: joselito@gmail.com</Typography>

            </Box>
          </Box>

          <Box className='bg-[#44bd32] flex flex-col justify-center items-center grow p-4 rounded-md h-full'>
            <LocalAtmIcon sx={{ width: 60, height: 60 }} />
            <Typography mt={2} variant='h6' >Salary/Hour: P390</Typography>
          </Box>
          <Box className='bg-[#8e44ad] flex flex-col justify-center items-center grow p-4 rounded-md h-full'>
            <MeetingRoomIcon sx={{ width: 60, height: 60 }} />
            <Typography mt={2} variant='h6' >Remaining Leaves: 2</Typography>
          </Box>

          <Box className='bg-[#d35400] flex flex-col justify-center items-center grow p-4 rounded-md h-full'>
            <RunningWithErrorsIcon sx={{ width: 60, height: 60 }} />
            <Typography mt={2} variant='h6' >Absences: 0</Typography>
          </Box>


        </Box>

        <Box>
          <TableContainer component={Paper} data-testid="leaves-table">
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
        </Box>
      </Container>
    </DashboardLayout>
  )
}
