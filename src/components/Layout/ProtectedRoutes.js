import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import InviteUser from '../InviteUser/InviteUser';
import Meeting from '../Meeting/Meeting';
import UserDirectory from '../UserDirectory/UserDirectory';
import Header from './Header';
import Sidebar from './Sidebar';
const Dashboard = React.lazy(() => import("../Dashboard/Dashboard"));
const Profile = React.lazy(() => import("../Profile/Profile"));
const Mentorship = React.lazy(() => import("../Mentorship/Mentorship"));
const MentorshipDetails = React.lazy(() => import("../Mentorship/MentorshipDetails"));

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
        <Redirect exact from="/" to="/dashboard" />

        <RouteWrapper exact={true} path="/" component={Dashboard} layout={DefaultLayout} />
        <RouteWrapper exact={true} path="/dashboard" component={Dashboard} layout={DefaultLayout} />
        <RouteWrapper exact={true} path="/profile" component={Profile} layout={DefaultLayout} />
        <RouteWrapper exact={true} path="/profile/:id" component={Profile} layout={DefaultLayout} />

        <RouteWrapper exact={true} path="/mentorship" component={Mentorship} layout={DefaultLayout} />
        <RouteWrapper exact={true} path="/mentorshipDetails/:id/:type/:status" component={MentorshipDetails} layout={DefaultLayout} />
        <RouteWrapper exact={true} path="/userdirectory" component={UserDirectory} layout={DefaultLayout} />

        <RouteWrapper exact={true} path="/user/inviteuser" component={InviteUser} layout={DefaultLayout} />
        <RouteWrapper exact={true} path="/meeting" component={Meeting} layout={DefaultLayout} />



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
