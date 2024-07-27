import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { User } from "../contexts/User";

export default function LearnerRoute() {
    const {
        state: { userInfo },
    } = useContext(User);

    if (userInfo && userInfo.role == "learner") {
        return <Outlet />;
    } else {
        return <Navigate to="/auth/signin" />;
    }
}
