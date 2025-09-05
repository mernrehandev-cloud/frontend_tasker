import { useEffect, useState } from "react";
import CardList from "../components/cardlist/cardlist"
import SecHeader from "../components/secondaryheader/secheader"
import './home.css'
import { Container } from "react-bootstrap";
import Loader from "../components/loader/loader";
import ErrorComp from "../components/error/error";
import ToastAlert from "../components/toastalert/toast";

function Home({ tasks, FetchTasks, isLoading, error, FetchonUpdate, BEurl }) {
    // const [isLoading, setisLoading] = useState(false);
    // const [seltask, setseltask] = useState({});

    const [toast, settoast] = useState({ show: false });

    async function deltask(task) {
        try {
            const req = await fetch(`${BEurl}/tasks/${task._id}`, {
                method: "DELETE"
            });

            console.log("show alert of success");
            settoast({ show: true, header_toast: "Successfully Deleted Task", text: `${task.Title}`, bg: "success", status: "circle-check" });
            FetchTasks();
        } catch (error) {
            console.log(`show alert of error: ${error.message}`);
        }
    }

    useEffect(() => {
        FetchTasks();
    }, []);

    return (
        <>
            <Container fluid>
                <SecHeader heading={"All Tasks"} total={tasks.length} icon_nav="fa fa-list-ul" />
                {
                    isLoading ? (
                        <Loader />
                    ) : error ? (
                        <ErrorComp BEurl={BEurl} />
                    ) : (
                        <CardList tasks={tasks} BEurl={BEurl} onDelete={deltask} FetchTasks={FetchTasks} FetchonUpdate={FetchonUpdate} />
                    )
                }

                < ToastAlert show={toast.show} onClose={() => settoast({ ...toast, show: false })} header_toast={toast.header_toast} bg={toast.bg} status={toast.status} text={toast.text} />
            </Container>
        </>
    )
}

export default Home