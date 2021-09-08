import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
const AdminDashboard = React.lazy(() => import("../AdminDashboard/AdminDashboard"));
const NewProgram = React.lazy(() => import("../Admin/NewProgram"));
const AdminMentorship = React.lazy(() => import("../Admin/AdminMentorship"));

const DefaultLayout = ({ children }) => (
    <>
        <Header />
        <Sidebar />
        <div className="text-top-space">
            {children}
        </div>
    </>
);

const ProtectedRoutes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Redirect exact from="/" to="/adminDashboard" />

                <RouteWrapper exact={true} path="/" component={AdminDashboard} layout={DefaultLayout} />
                <RouteWrapper exact={true} path="/adminDashboard" component={AdminDashboard} layout={DefaultLayout} />
                <RouteWrapper exact={true} path="/adminMentorship" component={AdminMentorship} layout={DefaultLayout} />
                <RouteWrapper exact={true} path="/createMentorshipProgram" component={NewProgram} layout={DefaultLayout} />
                <RouteWrapper exact={true} path="/createMentorshipProgram/:id" component={NewProgram} layout={DefaultLayout} />

                <Route path="*" component={() => (<div> 404 Page Not found </div>)} />

            </Switch>
        </BrowserRouter>
    );
}

function RouteWrapper({ component: Component, layout: Layout, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => (
                <Layout {...props}>
                    <Component {...props} />
                </Layout>
            )}
        />
    );
}

export default ProtectedRoutes
