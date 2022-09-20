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
import styles from '../../styles/Home.module.css'
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

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
      
    <DashboardLayout>
        <Container>

        <div
          
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            color: 'white',
            marginBottom: '15px',
            width: '100%'
          }}
        >

          <div className={styles.dbProfInfo}>

            <Avatar sx={{ bgcolor: blue[400], width: 100, height: 100, fontSize: '40px'  }}>J</Avatar>
            
            <div>
                <Typography mt={2} variant="h5" >Name: Joselito</Typography>
                <Typography mt={2} >Email: joselito@gmail.com</Typography>

            </div>
          </div>

          <div className={styles.dbLeaves}>
              <LocalAtmIcon sx={{ width: 60, height: 60 }}/>
              <Typography mt={2} variant='h6' >Salary/Hour: P390</Typography>
          </div>
          <div className={styles.dbOvertimeLimit}>
              <MeetingRoomIcon sx={{ width: 60, height: 60 }}/>
              <Typography mt={2} variant='h6' >Remaining Leaves: 2</Typography>
          </div>

          <div className={styles.dbAbsentLimit}>
              <RunningWithErrorsIcon sx={{ width: 60, height: 60 }}/>
              <Typography mt={2} variant='h6' >Absences: 0</Typography>
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
