import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import SigninPage from "./pages/Auth/Signin";
import SignupPage from "./pages/Auth/Signup";
import TeacherRoute from "./routes/TeacherRoute";
import { TeacherDashboard } from "./pages/TeacherPanel";
import { CoursesPage } from "./pages/TeacherPanel/Course";
import { ProfilePage } from "./pages/TeacherPanel/Profile";
import { EditCourse } from "./pages/TeacherPanel/EditCourse";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth/signin" element={<SigninPage />} />
                <Route path="/auth/signup" element={<SignupPage />} />
                <Route path="/teacher" element={<TeacherRoute />}>
                    <Route path="dashboard" element={<TeacherDashboard />} />
                    <Route path="courses" element={<CoursesPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="course/edit/:slug" element={<EditCourse />} />
                </Route>

                {/* Catch-all route */}
                {/* <Route path="*" element={<ErrorPage />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
