import React, { useEffect, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AdminMentorship from "../components/Admin/AdminMentorship";
import Mentorship from "../components/Admin/AdminMentorship";
import NewProgram from "../components/Admin/NewProgram";
// import Auth from "../helpers/Auth";

const Layout = React.lazy(() => import("../components/Layout/ProtectedRoutes"));

const SignUp = React.lazy(() => import("../components/Auth/SignUp"));
const SignIn = React.lazy(() => import("../components/Auth/SignIn"));
const ForgotPassword = React.lazy(() => import("../components/Auth/ForgotPassword"));
const ResetPassword = React.lazy(() => import("../components/Auth/ResetPassword"));

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      // Auth.getUserDetail() ?
      localStorage.getItem('user') ?
        <Component {...props} />
        :
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location },
          }}
        />
    }
  />
);

const UnAuthRoutes = ({ }) => {
  const loading = () => "Loading...";

  return (
    <Switch>
      <Redirect exact from="/" to="/signin" />

      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/forgotPassword" component={ForgotPassword} />
      <Route exact path="/resetPassword/:token" component={ResetPassword} />
      <ProtectedRoute path="/" component={Layout} />

      {/* <Redirect from="*" to="/signup" /> */}
    </Switch>
  );
};

export default UnAuthRoutes;
