import { Routes, Route } from "react-router-dom";
import Cse, { dcse } from "./screens/Admin/Cse";
import { dept } from "./screens/Admin/Admin_Department";
import Login from "./screens/Login";
import { afaculty } from "./screens/Admin/Admin_Faculty";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin/dept" element={dept} />
      <Route path="/admin/dept/cse" element={dcse} />
      <Route path="/admin/faculty" element={afaculty} />
    </Routes>
  );
}
export default App;
