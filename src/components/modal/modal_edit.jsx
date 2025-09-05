import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Form, FloatingLabel, ProgressBar } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import './modal.css'
import { Card, Col, Row } from 'react-bootstrap';
import ToastAlert from '../toastalert/toast';

function ModalEdit({ show, seltask, onClose, FetchTasks, FetchonUpdate, BEurl }) {
    const [category, setcategory] = useState([]);
    const [status, setstatus] = useState([]);
    const [prgvalue, setprgvalue] = useState("");

    const [error, seterror] = useState(null);
    const [toast, settoast] = useState({ show: false });
    const [edittask, setedittask] = useState({});

    async function FetchCategory() {
        try {
            const res = await fetch(`${BEurl}/task_category`);

            // if (!res.ok) {
            //     throw new Error(`Error Fetch Failed: ${res.status}`);
            // }
            let filtercategory = [];

            const data = await res.json();
            data.forEach(c => {
                if (c._id !== seltask.Category._id) {
                    filtercategory.push(c);
                }
            });

            // console.log(`${data[0].Name} \n ${seltask.Title}`);
            setcategory(filtercategory);
        } catch (error) {
            console.error('Error fetching data:', error);
            seterror(error.message || "Failed to Fetch Data")
        }

    }

    async function FetchStatus() {
        try {
            const res = await fetch(`${BEurl}/task_status`);
            // if (!res.ok) {
            //     throw new Error(`Error Fetch Failed: ${res.status}`);
            // }

            let filterstatus = [];

            const data = await res.json();
            data.forEach(s => {
                if (s._id !== seltask.Status._id) {
                    filterstatus.push(s);
                }
            });

            // console.log(`${data[0].Name} \n ${seltask.Title}`);
            setstatus(filterstatus);
        } catch (error) {
            console.error('Error fetching data:', error);
            seterror(error.message || "Failed to Fetch Data")
        }

    }

    async function UpdateData() {
        try {
            if (edittask.Progress == 100) {
                edittask.Status = "68aea76131008f1c70325476";
            }

            const res = await fetch(`${BEurl}/tasks/${edittask._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(edittask),
            });
            if (!res.ok) {
                throw new Error("Failed to update task");
            }
            else {
                onClose();
                setTimeout(() => {
                    settoast({
                        show: true, header_toast: "Successfully Edited Task", text: `Title: ${edittask.Title
                            }`, bg: "success", status: "circle-check"
                    });
                }, 200);
                settoast({
                    show: true, header_toast: "Successfully Edited Task", text: `Title: ${edittask.Title
                        }`, bg: "success", status: "circle-check"
                });
                FetchonUpdate();
            }

            setTimeout(() => {

                // FetchTasks();

                settoast({ ...toast, show: false });
            }, 1500)
        } catch (error) {
            console.log(error.message);
            seterror(error.message);
        }
    }

    function getProgressClass(progress) {
        if (progress === 100) return "done";
        if (progress === 0) return "empty";
        return "prog";
    }

    useEffect(() => {
        FetchCategory();
        FetchStatus();
        getProgressClass();
        setedittask(seltask);
    }, [seltask]);

    return (
        <>
            {/* <Button className='modalbtn' onClick={handleShow}>
                <FontAwesomeIcon icon={"fa fa-square-plus"} /> Add Task
            </Button> */}

            <Row className='d-flex justify-content-center'>
                <Col className='d-flex justify-content-center'>
                    <Modal show={show} onHide={onClose} >
                        <Card className='card-add'>
                            <Modal.Header className='bg-company m-0 mb-0'>
                                <Modal.Title className='text-white fs-5'>Update Task Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <FloatingLabel
                                        controlId="floatingInput.title"
                                        label="Title"
                                        className="mb-3"
                                    >
                                        <Form.Control className="border-custom" type="text" placeholder="Title" autoFocus value={edittask.Title} onChange={e => setedittask({ ...edittask, Title: e.target.value })} />
                                    </FloatingLabel>


                                    <Row>
                                        <Col className='col-6'>
                                            <FloatingLabel
                                                controlId="floatingInput.date"
                                                label="Due Date"
                                                className="mb-3"
                                            >
                                                <Form.Control className="border-custom" type="date" placeholder="Due Date" value={edittask.DueDate ? new Date(edittask.DueDate).toISOString().split("T")[0]
                                                    : ""} onChange={e => setedittask({ ...edittask, DueDate: e.target.value })} />
                                            </FloatingLabel>
                                        </Col>

                                        <Col className="col-6">
                                            <FloatingLabel
                                                controlId="floatingInput.time"
                                                label="Due Time"
                                                className="mb-3"
                                            >
                                                <Form.Control className="border-custom" type="time" placeholder="Due Time" value={edittask.DueTime ? edittask.DueTime.slice(0, 5) // handles "HH:mm:ss" or "HH:mm"
                                                    : ""} onChange={e => setedittask({ ...edittask, DueTime: e.target.value })} />
                                            </FloatingLabel>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col className='col-6'>
                                            <FloatingLabel className='mb-3' controlId="floatingSelect" label="Category">
                                                <Form.Select className="border-custom" value={edittask.Category?._id} onChange={e =>
                                                    setedittask({
                                                        ...edittask,
                                                        Category: category.find(c => c._id === e.target.value) || edittask.Status
                                                    })
                                                }>
                                                    <option value={seltask.Category._id}>{seltask.Category.Name}</option>
                                                    {
                                                        category ? (
                                                            category.map((c) => (
                                                                <option key={c._id} value={c._id}>{c.Name}</option>
                                                            ))
                                                        ) : (
                                                            <option>Error loading options</option>
                                                        )
                                                    }
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>

                                        <Col className='col-6'>
                                            <FloatingLabel controlId="floatingSelect.status" className='mb-3' label="Status">
                                                <Form.Select className="border-custom" name='Status' value={edittask.Status?._id} onChange={e => {
                                                    let value = e.target.value;
                                                    if (value === "68aea76131008f1c70325476") edittask.Progress = 100;
                                                    setedittask({
                                                        ...edittask,
                                                        Status: status.find(s => s._id === e.target.value) || edittask.Status
                                                    });
                                                }
                                                }>
                                                    <option value={seltask.Status._id}>{seltask.Status.Name}</option>
                                                    {
                                                        status ? (
                                                            status.map((s) => (
                                                                <option key={s._id} value={s._id} > {s.Name}</option>
                                                            ))
                                                        ) : (
                                                            <option key={0}>Error loading options</option>
                                                        )
                                                    }
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                    </Row>

                                    {/* <FloatingLabel
                                        controlId="floatingInput.progress"
                                        label="Progress"
                                        className="mb-3"
                                    >
                                        <Form.Control className="border-custom" type="number" name='Progress' placeholder="Progress" max={100} min={0} value={edittask.Progress} onChange={e => {
                                            let value = Number(e.target.value);
                                            if (value < 0) value = 0;
                                            else if (value == 0) edittask.Status._id = "68aea43c31008f1c70325470";
                                            else if (value > 100) value = 100;
                                            else if (value >= 1 || value < 100) edittask.Status._id = "68aea4b331008f1c70325472";
                                            else if (edittask.Progress === 100) edittask.Status._id = "68aea76131008f1c70325476";
                                            setedittask({ ...edittask, Progress: value })
                                        }} />
                                    </FloatingLabel> */}

                                    <Form.Group className="mb-3 progressmain">
                                        <Form.Label>Progress</Form.Label>
                                        <Form.Range
                                            min={0}
                                            max={100}
                                            value={edittask.Progress}
                                            className={getProgressClass(edittask.Progress)}
                                            onChange={e => {
                                                let value = Number(e.target.value);
                                                if (value < 0) value = 0;
                                                if (value > 100) value = 100;

                                                // Sync status with progress
                                                if (value === 0) edittask.Status._id = "68aea43c31008f1c70325470";
                                                else if (value === 100) edittask.Status._id = "68aea76131008f1c70325476";
                                                else edittask.Status._id = "68aea4b331008f1c70325472";

                                                setedittask({ ...edittask, Progress: value });
                                            }}
                                        />
                                        <ProgressBar
                                            id='progresslawa'
                                            now={edittask.Progress}
                                            label={`${edittask.Progress}%`}
                                            className={getProgressClass(edittask.Progress)}
                                        />
                                    </Form.Group>

                                    <FloatingLabel
                                        controlId="floatingInput.desc"
                                        label="Description"
                                        className="mb-3"
                                    >
                                        <Form.Control className="border-custom" as="textarea" style={{ height: '150px' }} placeholder="Description" value={edittask.Desc} onChange={e => setedittask({ ...edittask, Desc: e.target.value })} />
                                    </FloatingLabel>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className='bg-danger btn-modal' onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button className='modalbtn2' onClick={UpdateData}>
                                    <FontAwesomeIcon icon="fa fa-save" /> Save
                                </Button>
                            </Modal.Footer>
                        </Card>
                    </Modal >
                </Col>
            </Row >
            < ToastAlert show={toast.show} onClose={() => settoast({ ...toast, show: false })} header_toast={toast.header_toast} bg={toast.bg} status={toast.status} text={toast.text} />

        </>
    );
}

export default ModalEdit;