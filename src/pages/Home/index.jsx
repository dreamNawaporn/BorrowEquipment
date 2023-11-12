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
import { MenuItem, Modal, Select, TextField } from '@mui/material';
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

function Home() {
  //เก็บข้อมูล
  const [quipment, setQuipment] = useState([])
  const [user, setuser] = useState([])
  const [selctUser, setSelctUser] = useState("")
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [reset, setReset] = useState(false)
  const [newItem, setNewItem] = useState({
    name: "",
    status: "",
    description: "",
    quantity: 0
  })
  const navigate = useNavigate()
  //ดึงข้อมูล
  useEffect(() => {
    const getQuipment = async () => {
      try {
        const res = await axios.get(BASE_URL + "equipment")
        const getUsers = await axios.get(BASE_URL + "users")
        // console.log(res.data);
        // console.log(getUsers.data);
        setQuipment(res.data)
        setuser(getUsers.data)
      } catch (error) {
        console.log(error);
      }
    }
    getQuipment()
  }, [reset])

  //เรียกใช้
  const handleChange = (e) => {
    setSelctUser(e.target.value)
  }

  const handleborrow = async (itemId) => {

    console.log("ฉันยืมแล้วนะ จาก id ", selctUser);
    if (selctUser == '') {
      return
    }

    try {
      const res = await axios.post(BASE_URL + "borrow", {
        userID: selctUser,
        equipmentID: itemId
      })
      if (res.status === 201) {
        //
        console.log("ยืมแล้วเด้ออ");
        navigate("borrow")
      }

    } catch (error) {
      console.log(error);
    }
  }
  const handleNewItem = async () => {
    try {
      const res = await axios.post(BASE_URL + "equipment", newItem)
      if (res.status === 201) {

        setReset(prev => !prev)
        setNewItem({
          name: "",
          status: "ใช้งานได้",
          description: "",
          quantity: 0
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
              navigate("borrow")
            }}>ดูการยืม</Button>
            <Button color="inherit" onClick={() => {
              navigate("./user")
            }}>จัดการผู้ใช้งาน</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Typography variant="h4" gutterBottom textAlign={'center'} sx={{
        mt: 2
      }}>
        ยืมอุปกรณ์
      </Typography>
      <Button onClick={handleOpen} sx={{
        bgcolor: "green",
        color: "white",
        my: 2
      }}>เพิ่มอุปกรณ์</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell align="right">name</StyledTableCell>
              <StyledTableCell align="right">status</StyledTableCell>
              <StyledTableCell align="right">description</StyledTableCell>
              <StyledTableCell align="right">quantity</StyledTableCell>
              <StyledTableCell align="right">....</StyledTableCell>
              <StyledTableCell align="right">ยืม</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quipment.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="right">{row.name}</StyledTableCell>
                <StyledTableCell align="right">{row.status}</StyledTableCell>
                <StyledTableCell align="right">{row.description}</StyledTableCell>
                <StyledTableCell align="right">{row.quantity}</StyledTableCell>

                <StyledTableCell align="right">
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    // value={age}
                    onChange={handleChange}
                    label="Age"

                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {
                      user.map((user) => {
                        return <MenuItem key={user.id} value={user.id}>{user.username}</MenuItem>
                      })
                    }

                  </Select>

                </StyledTableCell>
                <StyledTableCell align="right"><Button type='button' color='warning' sx={{
                  bgcolor: "black",
                  mt: 2
                }}
                  onClick={() => {
                    handleborrow(row.id)
                  }}
                >ยืม</Button></StyledTableCell>
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
          <TextField id="outlined-basic" label="Name" variant="outlined"
            onChange={(e) => {
              setNewItem(prev => ({ ...prev, name: e.target.value }))
            }}
          />
          <TextField id="outlined-basic" sx={{
            my: 1,
          }} label="Status" variant="outlined" value={newItem.status} onChange={(e) => {
            setNewItem(prev => ({ ...prev, status: e.target.value }))
          }} />
          <TextField id="outlined-basic" label="description" variant="outlined" onChange={(e) => {
            setNewItem(prev => ({ ...prev, description: e.target.value }))
          }} />
          <TextField id="outlined-basic" label="quantity" type='number' variant="outlined" onChange={(e) => {
            setNewItem(prev => ({ ...prev, quantity: e.target.value }))
          }} />
          <Button onClick={() => {
            handleNewItem()
            // open1()
          }}>เพิ่ม</Button>
        </Box>
      </Modal>
    </>
  )
}

export default Home
