import { useEffect, useState } from "react";
import CardList from "../components/cardlist/cardlist"
import SecHeader from "../components/secondaryheader/secheader"
import './home.css'
import Loader from "../components/loader/loader";
import { Container } from "react-bootstrap";

function Learning({ tasks, FetchTasks, FetchonUpdate, BEurl }) {
    const [learntasks, setlearntasks] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        setisLoading(true);
        FetchTasks();
    }, []);

    useEffect(() => {
        const Learntasks = tasks.filter(task => task.Category._id === "68aea84facb4e0387c3ac52d");
        setlearntasks(Learntasks);
        setTimeout(() => {
            setisLoading(false);
        }, 1);
    }, [tasks]);

    return (
        <>
            <Container fluid>
                <SecHeader heading={"Learning"} total={learntasks.length} icon_nav="fa fa-graduation-cap" />
                {
                    isLoading ? (
                        <Loader />
                    ) :
                        <CardList BEurl={BEurl} tasks={learntasks} FetchonUpdate={FetchonUpdate} />
                }
            </Container>
        </>
    )
}


export default Learning
