import { useEffect, useState } from "react";
import { Button, Card, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import "./loginform.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ToastAlert from "../toastalert/toast";

export default function LoginForm({ BEurl }) {
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        Email: "",
        Password: "",
    });
    const [toast, settoast] = useState({ show: false });

    async function LoginUser() {
        try {
            const res = await fetch(`${BEurl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                const data = await res.json();
                // setfound(data);

                settoast({ show: true, header_toast: `Welcome Back`, text: `User ${form.Email} Successfully Logged in`, bg: "success", status: "circle-check" });

                // console.log(`${found.token} \n ${found.user}`);
            }
            else {
                settoast({ show: true, header_toast: `Error`, text: `Credentials Wrong`, bg: "danger", status: "circle-xmark" });
            }
        } catch (error) {
            console.log('Error fetching user:');
            // seterror(error.message || "Failed to Fetch Data")
        }
    }



    function handleChange(e) {
        const { name, value } = e.target;
        let err = "";

        // Validation for each field
        if (name === "Email") {
            if (!value) err = "Email is required.";
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) err = "Enter a valid email address.";
        }
        if (name === "Password") {
            if (!value) err = "Password is required.";
            else if (value.length < 7) err = "Password must be greater than 7 characters";
        }

        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: err }));
    }

    return (
        <Container fluid className="mt-4">
            <Row className="d-flex justify-content-center">
                <Col xs={10} sm={10} md={8} lg={8} xl={5} >
                    <Card className="shadow">
                        <Card.Header as="h5" className="p-3 bg-info text-white">Welcome Back</Card.Header>
                        <Card.Body>
                            <Card.Title className="text-center text-decoration-underline text-capitalize">Enter your Credentials to login</Card.Title>

                            <Form>
                                <FloatingLabel controlId="floatingInput.email" label="Email" className="mt-4 mb-3">
                                    <Form.Control
                                        className="border-custom"
                                        type="email"
                                        name="Email"
                                        placeholder="Email"
                                        value={form.Email}
                                        onChange={handleChange}
                                        isInvalid={!!errors.Email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.Email}
                                    </Form.Control.Feedback>
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingInput.password" label="Password" className="mt-4 mb-3">
                                    <Form.Control
                                        className="border-custom"
                                        type="password"
                                        name="Password"
                                        placeholder="Password"
                                        value={form.Password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.Password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.Password}
                                    </Form.Control.Feedback>
                                </FloatingLabel>

                                <Form.Group className="mt-4 mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Remember Me" />
                                </Form.Group>

                                <Row className="mt-5">
                                    <Col className="">
                                        <Button
                                            className='loginbtn btn-success'
                                            onClick={LoginUser}
                                            disabled={Object.values(errors).some(Boolean) || Object.values(form).some(v => !v)}
                                        >
                                            <FontAwesomeIcon icon="fa fa-right-to-bracket" /> Login
                                        </Button>
                                    </Col>

                                    <Col className="text-end">
                                        <Link to="/register">
                                            <Button
                                                className='registerbtn btn-secondary'
                                            >
                                                <FontAwesomeIcon icon="fa fa-user-plus" /> Register
                                            </Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            < ToastAlert show={toast.show} onClose={() => settoast({ ...toast, show: false })} header_toast={toast.header_toast} bg={toast.bg} status={toast.status} text={toast.text} />
        </Container>
    )
}