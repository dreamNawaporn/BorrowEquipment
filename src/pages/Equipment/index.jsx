import { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
// import { MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const BASE_URL = import.meta.env.VITE_BASE_URL

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


function Users() {
  //เก็บข้อมูล
  const [borrow, setBorrow] = useState([])
  const [reset, setReset] = useState(false)
  const navigate = useNavigate()
  //ดึงข้อมูล
  useEffect(() => {
    const getQuipment = async () => {
      try {
        const res = await axios.get(BASE_URL + "borrow")
        // setQuipment(res.data)
        // console.log(res.data);
        setBorrow(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getQuipment()
  }, [reset])



  const handleReturnEquipment = async (idEquipment) => {

    // console.log("ฉันยืมแล้วนะ จาก id ", selctUser);
    if (idEquipment == '') {
      return
    }

    try {
      const res = await axios.put(BASE_URL + "borrow/return", {
        borrowID: idEquipment
      })
      if (res.status === 200) {
        //
        // console.log("ยืมแล้วเด้ออ");
        // navigate("borrow")
        setReset(prev => !prev)
      }

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              DREAM
            </Typography>
            <Button color="inherit" onClick={() => {
              navigate("/")
            }}>หน้าแรก</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Typography variant="h4" gutterBottom textAlign={'center'} sx={{
        mt: 2
      }}>
        คืนอุปกรณ์
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell align="right">id</StyledTableCell>
              <StyledTableCell align="right">username</StyledTableCell>
              <StyledTableCell align="right">email</StyledTableCell>
              <StyledTableCell align="right">password	</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {borrow.map((row) => (
              <StyledTableRow key={row.BorrowID}>
                <StyledTableCell component="th" scope="row">
                  {row.BorrowID}
                </StyledTableCell>
                <StyledTableCell align="right">{row.id}</StyledTableCell>
                <StyledTableCell align="right">{row.username}</StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
                <StyledTableCell align="right">{row.password}</StyledTableCell>
                <StyledTableCell align="right">{
                  row.Status === "ยืม" ? <Button type='button' color='warning' sx={{
                    bgcolor: "black",
                    mt: 2
                  }}
                    onClick={() => {
                      handleReturnEquipment(row.BorrowID);
                    }}
                  >{
                      row.Status === "ยืม" ? "คืน" : "คืนแล้ว"
                    }</Button> : "คืนแล้วจ้า"
                }

                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </>
  )
}


export default Users