import { useEffect, useState } from "react";
import CardList from "../components/cardlist/cardlist"
import SecHeader from "../components/secondaryheader/secheader"
import './home.css'
import Loader from "../components/loader/loader";
import { Container } from "react-bootstrap";

function Work({ tasks, FetchTasks, BEurl, FetchonUpdate }) {
    const [worktasks, setworkTasks] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        setisLoading(true);
        FetchTasks();
    }, []);

    useEffect(() => {
        const WorkTasks = tasks.filter(task => task.Category._id === "68aea828acb4e0387c3ac529");
        setworkTasks(WorkTasks);
        setTimeout(() => {
            setisLoading(false);
        }, 1);
    }, [tasks]);


    return (
        <>
            <Container fluid>

                <SecHeader heading={"Work"} total={worktasks.length} icon_nav="fa fa-briefcase" />
                {
                    isLoading ? (
                        <Loader />
                    ) :
                        <CardList FetchonUpdate={FetchonUpdate} BEurl={BEurl} tasks={worktasks} />
                }
            </Container>
        </>
    )
}


export default Work
