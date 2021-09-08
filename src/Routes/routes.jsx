import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
// import Auth from "../helpers/Auth";
import UnAuthRoutes from "./UnAuthRoutes";
import Loader from "../components/Common/Loader";
import Auth from "../helpers/Auth";
const Layout = React.lazy(() => import("../components/Layout/ProtectedRoutes"));
const AdminRoutes = React.lazy(() => import("../components/Layout/adminRoutes"));

const MainRoutes = () => {
    return (
        <Switch>
            <Suspense fallback={<Loader />}>
                <Route
                    path="/"
                    render={() => {
                        if (!Auth.getToken())
                            return <UnAuthRoutes />;
                        if (Auth.getUserData()) {
                            return <Layout />;
                        } else {
                            return <AdminRoutes />;
                        };
                    }}
                />
            </Suspense>
        </Switch>
    );
};

export default MainRoutes;
