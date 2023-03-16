import { Routes, Route } from "react-router-dom";
import Cse, { subject } from "./screens/Admin/Subject";
import { dept } from "./screens/Admin/Admin_Department";
import Login from "./screens/Login";
import { afaculty } from "./screens/Admin/Admin_Faculty";
import { facultysubject } from "./screens/Faculty/FacultySubject";
import { fqp } from "./screens/Faculty/QuestionPapers";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/faculty/subjects" element={facultysubject} />
        <Route path="/admin/dept" element={dept} />
        <Route path="/admin/dept/:subjectCode" element={subject} />
        <Route path="/admin/faculty" element={afaculty} />
        <Route path="/faculty/questionpapers" element={fqp} />
      </Routes>
    </div>
  );
}
export default App;
