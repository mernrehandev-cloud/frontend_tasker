import { Button, Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './secheader.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function SecHeader(props) {
    const { heading, total, icon_nav
    } = props;

    useEffect(() => {
        let syntax = 12;
        if (!total) syntax = 6;
    }, []);

    return (
        <>
            <Container fluid className="mt-4">
                <Row className="d-flex justify-content-center px-md-0 px-lg-4">
                    <Col className="col-12 bg-white ps-lg-5   pe-xl-5 p-lg-4 p-3 shadow border rounded">
                        <Row className="my-auto">
                            <Col className="col-4 main-text fs-4">
                                <FontAwesomeIcon icon={icon_nav} /> {heading}
                            </Col>

                             <Col className="col-4 text-center d-flex justify-content-center gap-2">
                                <Link to='/login'><Button variant="primary"><FontAwesomeIcon icon="fa fa-right-to-bracket" /> Login Demo</Button></Link>
                                <Link to='/register'><Button variant="secondary"><FontAwesomeIcon icon="fa fa-user-plus" /> Signup Demo</Button></Link>
                            </Col>
                            
                            {total ? (
                                <Col className="col-4 text-end total-text fs-5">
                                    <span className="total-main">Total:</span> {total} Task/s
                                </Col>
                            ) : (
                                <Col className="col-4 text-end total-text fs-5">
                                    <span className="total-main">Total:</span> 0 Task/s
                                </Col>
                            )
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}


export default SecHeader;




