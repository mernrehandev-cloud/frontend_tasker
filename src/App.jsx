import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Navcomp from "./components/navbar/navbar";
import './App.css';
import Footermain from "./components/footer/footer";
import Fav from "./pages/fav";
import Work from "./pages/work";
import Personal from "./pages/personal";
import Learning from "./pages/learning";
import { useEffect, useState } from "react";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import NotFound from "./components/notfound/notfound";
import ToastAlert from "./components/toastalert/toast";
import Loader from "./components/loader/loader";
import ErrorComp from "./components/error/error";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [category, setcategory] = useState([]);
  const [error, seterror] = useState(null);
  const [users, setUsers] = useState([]);
  let BEurl = import.meta.env.VITE_BackendURI;

  const [toast, settoast] = useState({ show: false });

  async function FetchTasks() {
    try {
      setisLoading(true);
      const res = await fetch(`${BEurl}/tasks`);

      if (res) {
        const data = await res.json();
        if (data.length > 0) {
          setTasks(data);
        }
      }
    } catch (error) {
      console.log('Error fetching data:');
      seterror(error.message || "Failed to Fetch Data")
    }
    finally {
        setisLoading(false);
    }
  }

  async function FetchonUpdate() {
    try {
      // setisLoading(true);
      const res = await fetch(`${BEurl}/tasks`);

      if (res) {
        const data = await res.json();
        if (data.length > 0) {
          setTasks(data);
        }
      }
    } catch (error) {
      console.log('Error fetching data:');
      seterror(error.message || "Failed to Fetch Data")
    }
  }

  async function FetchUser() {
    try {
      const res = await fetch(`${BEurl}/users`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);


      const data = await res.json();
      if (data.length > 0) {
        setUsers(data);
      }
      // console.log(`data: ${data[0].Image}`);
      // console.log(`users: ${users[0].Image}`);

    } catch (error) {
      console.log('Error fetching data:');
      seterror(error.message || "Failed to Fetch Data")
    }
  }

  async function FetchCategory() {
    try {
      const res = await fetch(`${BEurl}/task_category`);
      if (res) {
        const data = await res.json();
        if (data.length > 0) {
          setcategory(data);
        }
      }
      else {
        alert("Failed to Fetch Category")
      }
    } catch (error) {
      seterror(error.message || "Failed to Fetch Data")
    }
  }

  useEffect(() => {
    FetchTasks();
    FetchUser();

    settoast({
      show: true, header_toast: "Successfully Edited Task", text: `Title: Read Design`, bg: "success", status: "circle-check"
    });
  }, []);

  return (
    <div className="bg-light app-container">
      <Navcomp FetchTasks={FetchTasks} srcimg="/images/logo.png" users={users} FetchCategory={FetchCategory} category={category} BEurl={BEurl} />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home BEurl={BEurl} tasks={tasks} FetchTasks={FetchTasks} isLoading={isLoading} error={error} FetchonUpdate={FetchonUpdate} />} />
          <Route path="/fav" element={<Fav BEurl={BEurl} FetchonUpdate={FetchonUpdate} tasks={tasks} FetchTasks={FetchTasks} />} />
          <Route path="/work" element={<Work BEurl={BEurl} FetchonUpdate={FetchonUpdate} tasks={tasks} FetchTasks={FetchTasks} />} />
          <Route path="/personal" element={<Personal BEurl={BEurl} FetchonUpdate={FetchonUpdate} tasks={tasks} FetchTasks={FetchTasks} />} />
          <Route path="/learning" element={<Learning BEurl={BEurl} FetchonUpdate={FetchonUpdate} tasks={tasks} FetchTasks={FetchTasks} />} />
          <Route path="/login" element={<Login BEurl={BEurl} />} />
          <Route path="/register" element={<Register BEurl={BEurl} />} />

          <Route path="/profile" element={<Profile users={users} FetchUser={FetchUser} BEurl={BEurl} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footermain />
    </div>
  );
}

export default App;
