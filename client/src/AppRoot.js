import { Outlet, Link, useParams, useRouteLoaderData } from "react-router-dom";
import Login from "./Login2";
import Navbar from "react-bootstrap/Navbar";
//import { Button, Col, Container, Image, Nav, Row, Stack } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useEffect, useState } from "react";
import Web3 from "web3";
import AppBar from "@mui/material/AppBar";
import {
  Box,
  Button,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/AddBox";
import ListIcon from "@mui/icons-material/ViewList";
import MailIcon from "@mui/icons-material/Mail";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupIcon from "@mui/icons-material/Group";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import InfoIcon from "@mui/icons-material/Info";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import EditIcon from "@mui/icons-material/Edit";
import DescriptionIcon from '@mui/icons-material/Description';

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Container, Image, Nav, Stack } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileSignature } from '@fortawesome/free-solid-svg-icons'

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function AppRoot({ onLogin, account, provider, onAccountChanged }) {
  useEffect(() => {
    if (provider) {
      provider.on("accountsChanged", onAccountChanged);
      return () => {
        provider.removeListener("accountsChanged", onAccountChanged);
      };
    }
  }, [onAccountChanged, provider]);

  const [userOpen, setUserOpen] = useState(true);
  const [supplyChainOpen, setSupplyChainOpen] = useState(true);
  const [productOpen, setProductOpen] = useState(true);
  
  const handleClickUser = () => {
    setUserOpen(!userOpen);
  };

  const handleClickSupplyChain = () => {
    setSupplyChainOpen(!supplyChainOpen);
  };

  const handleClickProduct = () => {
    setProductOpen(!productOpen);
  };

  const { supplyChainAddress,productId } = useParams();
  const supplyChain= useRouteLoaderData(
    "supplyChainLayout"
  );
 const role=  supplyChain ? supplyChain.role : []
  /*return (
    <div>
      <Navbar bg="dark" variant="dark" className=" sticky-top">
        <Navbar.Brand>Logo<Image></Image></Navbar.Brand>
        <Nav as={Stack}>
          

            
              <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
              <Nav.Link as={Link} to={"users"}>Usuarios</Nav.Link>
              <Nav.Link as={Link} to={"supplyChains"}>Cadenas de suministros</Nav.Link>
              <Nav.Link as={Link} to={"supplyChains/create"}>Crear cadena de suministros</Nav.Link>
            

        </Nav>

        <Container fluid className="justify-content-end">
          <Login account={account} onLogin={onLogin} provider={provider}></Login>
        </Container>
      </Navbar>
      <Container fluid>
        <Outlet context={{account,provider}}></Outlet>
      </Container>
    </div>
  );
  */
  let activeStyle = {
    backgroundColor: "#d2d2d2",
  };
  const drawerWidth = 240;
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar
        position="sticky"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cadena de suministros
          </Typography>
          <Login
            account={account}
            onLogin={onLogin}
            provider={provider}
          ></Login>
        </Toolbar>
      </AppBar>
      <Box
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Container fluid>
          <Outlet context={{ account, provider }}></Outlet>
        </Container>
      </Box>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
      >
        <Toolbar />

        <List>
          <ListItemButton onClick={handleClickUser}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
            {userOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={userOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{ pl: 3 }}
                  component={NavLink}
                  to={"/users/list"}
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                >
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Lista de usuarios"} />
                </ListItemButton>
              </ListItem>
 
            </List>
          </Collapse>
        </List>

        <Divider />

        <List>
          <ListItemButton onClick={handleClickSupplyChain}>
            <ListItemIcon>
              <PrecisionManufacturingIcon />
            </ListItemIcon>
            <ListItemText primary="Cadenas de suministro" />
            {supplyChainOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={supplyChainOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={"/supplyChains/list"}
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  sx={{ pl: 3 }}
                >
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Lista de cadenas"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={"/supplyChains/create"}
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  sx={{ pl: 3 }}
                >
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Crear cadena"} />
                </ListItemButton>
              </ListItem>
            </List>
            {supplyChainAddress && (
              <List>
                {(role.includes("seller")|| role.includes("buyer") || role.includes("certifier") || role.includes("carrier")) && <ListItem disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to={"/supplyChains/" + supplyChainAddress+"/sign"}
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                    end
                    sx={{ pl: 3.2 }}
                  >
                    <ListItemIcon>
                    <FontAwesomeIcon icon={faFileSignature} size="xl" />
                    </ListItemIcon>
                    <ListItemText primary={"Firmar cadena"} />
                  </ListItemButton>
                </ListItem>}
                {(role.includes("seller")|| role.includes("buyer") || role.includes("certifier") || role.includes("carrier")) &&<ListItem disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to={"/supplyChains/" + supplyChainAddress + "/funds"}
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                    sx={{ pl: 3 }}
                  >
                    <ListItemIcon>
                      <AccountBalanceIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Añadir/Retirar fondos"} />
                  </ListItemButton>
                </ListItem>}
                {(role.includes("seller")) && <ListItem disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to={
                      "/supplyChains/" + supplyChainAddress + "/product/create"
                    }
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                    sx={{ pl: 3 }}
                  >
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Crear Producto"} />
                  </ListItemButton>
                </ListItem>}
                {(role.includes("seller")) && <ListItem disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to={"/supplyChains/" + supplyChainAddress + "/precedents"}
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                    sx={{ pl: 3 }}
                  >
                    <ListItemIcon>
                      <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Editar precedentes"} />
                  </ListItemButton>
                </ListItem>}
                {(role.includes("seller") || role.includes("buyer")) &&<ListItem disablePadding>
                  <ListItemButton
                    component={NavLink}
                    to={"/supplyChains/" + supplyChainAddress + "/modifyPrice"}
                    style={({ isActive }) =>
                      isActive ? activeStyle : undefined
                    }
                    sx={{ pl: 3 }}
                  >
                    <ListItemIcon>
                      <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Modificar Precio"} />
                  </ListItemButton>
                </ListItem>}
              </List>
            )}
          </Collapse>
        </List>
        <Divider />

        {supplyChainAddress && <List>
          
            <ListItemButton onClick={handleClickProduct} >
              <ListItemIcon>
                <PrecisionManufacturingIcon />
              </ListItemIcon>
              <ListItemText primary="Productos" />
              {productOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          
          <Collapse in={productOpen} timeout="auto" unmountOnExit>
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={"/supplyChains/" + supplyChainAddress+"/products/list"}
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  end
                  sx={{ pl: 3 }}
                >
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Lista de productos"} />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
        </List>}
      </Drawer>
    </ThemeProvider>
  );
}

export default AppRoot;
