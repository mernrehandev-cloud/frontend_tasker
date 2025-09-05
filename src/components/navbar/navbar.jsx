import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Card, Col, Row, Container, Navbar, Nav, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, NavLink } from "react-router-dom";
import '../navbar/navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalComp from '../modal/modal_add';
import ProfileIcon from '../profile/profile';
import ModalMain from '../modal/modalmain';
import { useEffect } from 'react';

library.add(fas);

function Navcomp({ srcimg, FetchTasks, users, FetchCategory, category, BEurl }) {

    useEffect(() => {
        FetchTasks();
        // console.log(users);
    }, []);

    const user1 = users[0];

    return (
        <>
            <Navbar expand="lg" className="bg-white py-lg-2 py-1">
                <Container fluid>
                    <Navbar.Brand className='ps-lg-4' href="/"><img className='logomain w-100' src={srcimg} alt="logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className='me-2' />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="mx-auto fw-bold gap-lg-3 gap-2 navbar-main">
                            <Nav.Link className='px-lg-3 rounded text-center' as={NavLink} to="/"><FontAwesomeIcon icon='fa fa-list-ul' /> All Tasks</Nav.Link>
                            <Nav.Link className='px-lg-3 rounded text-center' as={NavLink} to="/fav"><FontAwesomeIcon icon='fa fa-bookmark' />Favourite</Nav.Link>
                            <Nav.Link className='px-lg-3 rounded text-center' as={NavLink} to="/work"><FontAwesomeIcon icon='fa fa-briefcase' />Work</Nav.Link>
                            <Nav.Link className='px-lg-3 rounded text-center' as={NavLink} to="/personal"><FontAwesomeIcon icon='fa fa-user' /> Personal</Nav.Link>
                            <Nav.Link className='px-lg-3 rounded text-center' as={NavLink} to="/learning"><FontAwesomeIcon icon='fa fa-graduation-cap' /> Learning</Nav.Link>
                        </Nav>
                        <div className='custom-divider d-lg-none' ></div>

                        <Nav className="fw-bold pe-lg-4 pe-1 navbar-account mt-lg-0 mt-2 my-auto">
                            <span className='my-auto me-lg-4'>
                                <Dropdown>
                                    <Dropdown.Toggle variant='none' className='' id="dropdown-basic">
                                        <ProfileIcon user1={user1} />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className='text-center'>
                                        <Dropdown.Item as={NavLink} to="/profile" className='my-auto firstitem border-bottom'>{user1 && user1.Name ? user1.Name : ""}</Dropdown.Item>
                                        <Dropdown.Item as={NavLink} to="/logout" className='my-auto seconditem'>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </span>

                            <ModalComp FetchTasks={FetchTasks} FetchCategory={FetchCategory} category={category} BEurl={BEurl} />

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navcomp