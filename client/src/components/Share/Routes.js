import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from '../../pages/Home/HomePage'
import UserPage from '../../pages/User/UserPage'
import CategoryPage from '../../pages/Category/CategoryPage'

import AddBook from "../Book/AddBook";
import ViewBook from "../Book/ViewBook";
import EditUser from "../User/EditUser";
import EditCategory from "../Category/EditCategory";
import AddCategory from "../Category/AddCategory";

export default function Routes(props) {

    const routes = [
        { path: '/user/:id/edit', main: ({ match, history }) => <EditUser sessionUser={props.sessionUser} match={match} history={history} /> },
        { path: '/category/:id/edit', main: ({ match, history }) => <EditCategory match={match} history={history} /> },
        { path: '/category/add', main: ({ history }) => <AddCategory history={history} /> },
        { path: '/home', main: () => <HomePage sessionUser={props.sessionUser} /> },
        { path: '/user', main: () => <UserPage sessionUser={props.sessionUser} /> },
        { path: '/category', main: ({ history }) => <CategoryPage sessionUser={props.sessionUser} history={history} /> },
        { path: '/borrow', main: () => <HomePage /> },
        { path: '/contact', main: () => <HomePage /> },

        { path: '/book/add', main: ({ history }) => <AddBook history={history} /> },
        { path: '/book/:id/edit', main: ({ match, history }) => <AddBook match={match} history={history} /> },
        { path: '/book/:id/view', main: ({ match, history }) => <ViewBook match={match} history={history} /> },

        { path: '/contact', main: () => <HomePage /> },
        { path: '/contact', main: () => <HomePage /> },
    ];

    function DevideRequest(routes) {
        var listLink = null;
        listLink = routes.map((route, index) => {
            return (<Route key={index} path={route.path} component={route.main} />)
        })
        return listLink;
    }


    return (
        <Switch>{DevideRequest(routes)}</Switch>
    );
}
