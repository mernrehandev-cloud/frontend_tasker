import { useEffect, useState } from "react";
import CardList from "../components/cardlist/cardlist"
import Loader from "../components/loader/loader";
import SecHeader from "../components/secondaryheader/secheader"
import './home.css'
import { Container } from "react-bootstrap";

function Fav({ tasks, FetchTasks, BEurl, FetchonUpdate }) {
    const [favtasks, setfavTasks] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
        setisLoading(true);
        FetchTasks();
    }, []);

    useEffect(() => {
        const FavTasks = tasks.filter(task => task.Category._id === "68aea84facb4e0387c3ac52d");
        setfavTasks(FavTasks);
        setTimeout(() => {
            setisLoading(false);
        }, 700);
    }, [tasks]);

    return (
        <>
            <Container fluid>
                <SecHeader heading={"Favourite"} total={favtasks.length} icon_nav="fa fa-bookmark" />
                {
                    isLoading ? (
                        <Loader />
                    ) : <CardList FetchonUpdate={FetchonUpdate} BEurl={BEurl} tasks={favtasks} />
                }
            </Container>
        </>
    )
}

export default Fav