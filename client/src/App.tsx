import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import SigninPage from "./pages/Auth/Signin";
import SignupPage from "./pages/Auth/Signup";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth/signin" element={<SigninPage />} />
                <Route path="/auth/signup" element={<SignupPage />} />
                {/* <Route path="/user" element={<UserRoute />}>
                    <Route path="tasks" element={<TasksPage />} />
                </Route> */}

                {/* Catch-all route */}
                {/* <Route path="*" element={<ErrorPage />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
