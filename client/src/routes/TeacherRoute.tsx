import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { User } from "../contexts/User";

export default function TeacherRoute() {
    const {
        state: { userInfo },
    } = useContext(User);

    if (userInfo && userInfo.role == "teacher") {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
}
