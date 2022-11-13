import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import bagI from "../../media/icons/shopping-bag.svg";
import userI from "../../media/icons/user.svg";
import heartI from "../../media/icons/heart.svg";
import { useAuth } from "../../moduls/Auth";

function MasterLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout, currentUser } = useAuth();
  const [search, setSearch] = useState('');

  console.log(location.state)
  return (
    <>
      <Container fluid="xxl" className="px-5 py-1">
        <Navbar bg="white" expand="md">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="" id="basic-navbar-nav">
            <Nav className="ms-auto ">
              <InputGroup className="me-2" style={{ width: "400px" }}>
                <Form.Control
                  className="bg-white shadow-sm"
                  placeholder="Cari Produk"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button className="px-4" onClick={()=>navigate('/product-list',{state:{search: search}})}>
                  <i className="fa fa-search text-white fa-lg"></i>
                </Button>
              </InputGroup>
              <Nav.Link className="me-2">
                <img src={heartI} alt="heart" />
              </Nav.Link>
              <Nav.Link>
                <img src={bagI} alt="bag" />
              </Nav.Link>
              <NavDropdown
                align="end"
                drop="down"
                title={<img src={userI} alt="user" />}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>{currentUser.name}</NavDropdown.Item>
                <NavDropdown.Item>{currentUser.email}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
      <div className="bg-grey">
        <Container fluid="xxl" className="px-5">
          <Dropdown>
            <Dropdown.Toggle
              variant="primary text-white rounded-0 px-4 py-2"
              id="dropdown-basic"
            >
              BELANJA
            </Dropdown.Toggle>

            {/* <Dropdown.Menu>
              <Dropdown.Item>Action</Dropdown.Item>
              <Dropdown.Item>Another action</Dropdown.Item>
              <Dropdown.Item>Something else</Dropdown.Item>
            </Dropdown.Menu> */}
          </Dropdown>
        </Container>
      </div>
      <Container fluid="xxl" className="px-5 pt-3 pb-4 fs-7">
        <span className="text-muted">
          <Link
            to={"/product-list"}
            className="text-decoration-none text-muted"
          >
            Home
          </Link>
          <i className="fa fa-angle-double-right mx-3"></i>
          {location.pathname === "/product-list" && 
          <>
          Produk<i className="fa fa-angle-double-right mx-3"></i>
          </>
        }
        </span>
        <span className="text-primary">{location.pathname === "/product-list" ? "Roasted Bean" : location?.state?.name}</span>
      </Container>
      <Container fluid="xxl" className="px-5">
        <Outlet />
      </Container>
    </>
  );
}

export default MasterLayout;
