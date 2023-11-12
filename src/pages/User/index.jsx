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
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';

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
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,


};


function Users() {
  //เก็บข้อมูล
  const [borrow, setBorrow] = useState([])
  const [reset, setReset] = useState(false)
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  //ดึงข้อมูล
  useEffect(() => {
    const getQuipment = async () => {
      try {
        const res = await axios.get(BASE_URL + "users")
        // setQuipment(res.data)
        console.log(res.data);
        setBorrow(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getQuipment()
  }, [reset])

  const handleNewuser = async () => {
    try {
      const res = await axios.post(BASE_URL + "users", newUser)
      if (res.status === 201) {

        setReset(prev => !prev)
        setNewUser({
          username: "",
          email: "",
          password: ""
        })
      }
      handleClose()

    } catch (error) {
      console.log(error);
    }
  }
  const handleUpdateuser = async () => {
    try {
      const res = await axios.patch(BASE_URL + "users/" + newUser.username, newUser)
      if (res.status === 200) {

        setReset(prev => !prev)
        setNewUser({
          username: "",
          email: "",
          password: ""
        })
      }
      handleClose1()

    } catch (error) {
      console.log(error);
    }
  }
  const handleDeleteUser = async (username) => {
    try {
      const res = await axios.delete(BASE_URL + "users/" + username,)
      if (res.status === 400) {

        setReset(prev => !prev)
        setNewUser({
          username: "",
          email: "",
          password: ""
        })
      }
      handleClose()

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
        จัดการผู้ใช้งาน
      </Typography>
      <Button onClick={handleOpen} sx={{
        bgcolor: "green",
        color: "white",
        my: 2
      }}>เพิ่มUser</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              {/* <StyledTableCell align="right">id</StyledTableCell> */}
              <StyledTableCell align="right">username</StyledTableCell>
              <StyledTableCell align="right">email</StyledTableCell>
              <StyledTableCell align="right">password	</StyledTableCell>
              <StyledTableCell align="right">ลบ	</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {borrow.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                {/* <StyledTableCell align="right">{row.id}</StyledTableCell> */}
                <StyledTableCell align="right">{row.username}</StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
                <StyledTableCell align="right">{row.password}</StyledTableCell>
                <StyledTableCell align="right">
                  <Button sx={{
                    bgcolor: "red",
                    color: "white"
                  }} onClick={() => {
                    // handleOpen()
                    handleDeleteUser()
                    // console.log("update");
                  }}>ลบ</Button>
                  <Button sx={{
                    bgcolor: "blue",
                    color: "white",
                    mx:1
                  }} onClick={() => {
                    handleOpen1()
                    console.log("update");
                  }}>แก้ใข</Button>
                </StyledTableCell>

              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField id="outlined-basic" label="Username" variant="outlined"
            onChange={(e) => {
              setNewUser(prev => ({ ...prev, username: e.target.value }))
            }}
          />
          <TextField id="outlined-basic" sx={{
            my: 1,
          }} label="Email" variant="outlined" onChange={(e) => {
            setNewUser(prev => ({ ...prev, email: e.target.value }))
          }} />
          <TextField id="outlined-basic" label="Password" variant="outlined" onChange={(e) => {
            setNewUser(prev => ({ ...prev, password: e.target.value }))
          }} />
          <Button onClick={() => {
            handleNewuser()
            // open1()
          }}>เพิ่ม</Button>
        </Box>
      </Modal>
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField id="outlined-basic" label="Username" variant="outlined"
            onChange={(e) => {
              setNewUser(prev => ({ ...prev, username: e.target.value }))
            }}
          />
          <TextField id="outlined-basic" sx={{
            my: 1,
          }} label="Email" variant="outlined" onChange={(e) => {
            setNewUser(prev => ({ ...prev, email: e.target.value }))
          }} />
          <TextField id="outlined-basic" label="Password" variant="outlined" onChange={(e) => {
            setNewUser(prev => ({ ...prev, password: e.target.value }))
          }} />
          <Button onClick={() => {
            console.log("updetettttttttttt");
            handleUpdateuser()
          }}>เพิ่ม</Button>
        </Box>
      </Modal>

    </>
  )
}


export default Users