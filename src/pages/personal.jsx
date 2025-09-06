import { useEffect, useState } from "react";
import CardList from "../components/cardlist/cardlist"
import SecHeader from "../components/secondaryheader/secheader"
import './home.css'
import Loader from "../components/loader/loader";
import { Container } from "react-bootstrap";

function Personal({ tasks, FetchTasks, BEurl, FetchonUpdate }) {
    const [perstasks, setpersTasks] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        setisLoading(true);
        FetchTasks();
    }, []);

    useEffect(() => {
        const PerTasks = tasks.filter(task => task.Category._id === "68aea841acb4e0387c3ac52b");
        setpersTasks(PerTasks);
        setTimeout(() => {
            setisLoading(false);
        }, 1);
    }, [tasks]);

    return (
        <>
            <Container fluid>
                <SecHeader heading={"Personal"} total={perstasks.length} icon_nav="fa fa-user" />
                {
                    isLoading ? (
                        <Loader />
                    ) :
                        <CardList FetchonUpdate={FetchonUpdate} BEurl={BEurl} tasks={perstasks} />
                }
            </Container>
        </>
    )
}


export default Personal
