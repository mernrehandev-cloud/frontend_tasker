import { useState } from "react";
import { Button, Card, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import "./signupform.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ToastAlert from "../toastalert/toast";

export default function SignupForm({ BEurl }) {
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        Email: "",
        Password: "",
        ConfirmPassword: "",
        Name: "",
        BirthDate: "",
        ContactNumber: "",
        Image: "",
        SecurityAnswer: "",
        SecurityQuestion: ""
    });
    const [toast, settoast] = useState({ show: false });


    async function SignupUser() {
        try {
            const res = await fetch(`${BEurl}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                const data = await res.json();
                // setfound(data);

                settoast({ show: true, header_toast: `Signup Success`, text: `User ${form.Email} Successfully Signed Up`, bg: "success", status: "circle-check" });

                // console.log(`${found.token} \n ${found.user}`);
            }
            else {
                console.log(form);
                settoast({ show: true, header_toast: `Signup Failed`, text: `Something went wrong`, bg: "danger", status: "circle-xmark" });
            }
        } catch (error) {
            console.log('Error signing up user:');
            // seterror(error.message || "Failed to Fetch Data")
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        let err = "";

        // Validation for each field
        if (name === "Name") {
            if (!value) err = "Name is required.";
            else if (value.length < 3) err = "Name must be greater than 3 characters";
        }

        if (name === "ContactNumber") {
            if (!value) err = "Contact Number is required.";
            else if (value.length < 11) err = "Contact Number must be 11 Digits";
            else if (value.length > 11) err = "Contact Number can't be greater than 11 Digits";
        }

        if (name === "SecurityQuestion") {
            if (!value) err = "Security Question is required.";
            else if (value.length < 5) err = "Security Question must be greater than 5 characters";
        }

        if (name === "SecurityAnswer") {
            if (!value) err = "Security Answer is required.";
            else if (value.length < 5) err = "Security Answer must be greater than 5 characters";
        }

        if (name === "BirthDate") {
            let year = value.slice(0, 4);
            // console.log(year);
            if (!value) err = "Birth Date is required.";
            else if (year > 2007) err = "Must be 18+";
            else if (year < 1925) err = "Cant be older than 100";
            else if (year.length > 4) err = "Year is Error";
        }

        if (name === "Email") {
            if (!value) err = "Email is required.";
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) err = "Enter a valid email address.";
        }
        if (name === "Password") {
            if (!value) err = "Password is required.";
            else if (value.length < 8) err = "Password must be greater than 8 characters";
        }

        if (name === "ConfirmPassword") {
            if (!value) err = "Confirm Password is required.";
            else if (value != form.Password) err = "Password doesnot match";
        }

        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: err }));
    }

    return (
        <Container fluid className="mt-4">
            <Row className="d-flex justify-content-center">
                <Col xs={10} sm={10} md={11} lg={8} xl={6} >
                    <Card className="shadow">
                        <Card.Header as="h5" className="p-3 bg-info text-white">Welcome to Tasker App</Card.Header>
                        <Card.Body>
                            <Card.Title className="text-center text-decoration-underline text-capitalize">Enter your details properly to create your account</Card.Title>
                            <Form>

                                <Row>
                                    <Col xl={6} md={6}>
                                        <FloatingLabel controlId="floatingInput.name" label="Name" className="mt-4">
                                            <Form.Control
                                                className="border-custom"
                                                type="text"
                                                name="Name"
                                                placeholder="Name"
                                                value={form.Name}
                                                onChange={handleChange}
                                                isInvalid={!!errors.Name}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.Name}
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Col>

                                    <Col xl={6} md={6}>
                                        <FloatingLabel controlId="floatingInput.contact" label="Contact" className="mt-4">
                                            <Form.Control
                                                className="border-custom"
                                                type="number"
                                                name="ContactNumber"
                                                placeholder="Contact Number"
                                                value={form.ContactNumber}
                                                onChange={handleChange}
                                                isInvalid={!!errors.ContactNumber}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.ContactNumber}
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Col>
                                </Row>

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

                                <Row className="mt-4">
                                    <Col xl={6} md={6}>
                                        <FloatingLabel controlId="floatingInput.dob" label="Date of Birth" className="mb-4 mb-lg-0 mb-md-0 mb-sm-4 
                                        mt-2 mt-lg-0 mt-md-0 mt-sm-3">
                                            <Form.Control
                                                className="border-custom"
                                                type="date"
                                                name="BirthDate"
                                                placeholder="Date of Birth"
                                                value={form.BirthDate}
                                                onChange={handleChange}
                                                isInvalid={!!errors.BirthDate}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.BirthDate}
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Col>

                                    <Col xl={6} md={6}>
                                        <FloatingLabel controlId="floatingInput.image" label="Image" className="">
                                            <Form.Control
                                                className=""
                                                type="file"
                                                name="Image"
                                                placeholder="Image"
                                                value={form.Image}
                                                onChange={handleChange}
                                                isInvalid={!!errors.Image}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.Image}
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Col>
                                </Row>

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

                                <FloatingLabel controlId="floatingInput.confirmpassword" label="Confirm Password" className="mt-4 mb-3">
                                    <Form.Control
                                        className="border-custom"
                                        type="password"
                                        name="ConfirmPassword"
                                        placeholder="Confirm Password"
                                        value={form.ConfirmPassword}
                                        onChange={handleChange}
                                        isInvalid={!!errors.ConfirmPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.ConfirmPassword}
                                    </Form.Control.Feedback>
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingInput.SecurityQuestion" label="Security Question" className="mt-4 mb-3">
                                    <Form.Control
                                        className="border-custom"
                                        type="text"
                                        name="SecurityQuestion"
                                        placeholder="Security Question"
                                        value={form.SecurityQuestion}
                                        onChange={handleChange}
                                        isInvalid={!!errors.SecurityQuestion}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.SecurityQuestion}
                                    </Form.Control.Feedback>
                                </FloatingLabel>

                                <FloatingLabel controlId="floatingInput.SecurityAnswer" label="Security Answer" className="mt-4 mb-3">
                                    <Form.Control
                                        className="border-custom"
                                        type="text"
                                        name="SecurityAnswer"
                                        placeholder="Security Answer"
                                        value={form.SecurityAnswer}
                                        onChange={handleChange}
                                        isInvalid={!!errors.SecurityAnswer}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.SecurityAnswer}
                                    </Form.Control.Feedback>
                                </FloatingLabel>

                                <Form.Group className="mt-4 mb-3" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Remember Me" />
                                </Form.Group>

                                <Row className="mt-4">
                                    <Col className="">
                                        <Button
                                            className='registerbtn btn-success'
                                            onClick={SignupUser}
                                            disabled={Object.values(errors).some(Boolean) || Object.values(form).some(v => !v)}
                                        >
                                            <FontAwesomeIcon icon="fa fa-right-to-bracket" /> Register
                                        </Button>
                                    </Col>

                                    <Col className="text-end">
                                        <Link to="/login">
                                            <Button
                                                className='loginbtn btn-secondary'
                                            >
                                                <FontAwesomeIcon icon="fa fa-user-plus" /> Login
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
