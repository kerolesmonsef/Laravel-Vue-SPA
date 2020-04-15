import Home from "./components/Home";
import TestComp from "./components/TestComp";
import Login from "./components/auth/Login";
import New from "./components/Posts/New";
import List from "./components/Posts/List";
import ViewPost from "./components/Posts/ViewPost";
import Main from "./components/Posts/Main";
import SignUp from "./components/auth/SignUp";


const routes = [
    {
        path: '/',
        component: List,
        name: "home",
    },
    {
        path: "/login",
        component: Login,
        name: 'login'
    },
    {
        path: "/signUp",
        component: SignUp,
        name: 'signUp'
    },
    {
        path: "/test_route/:id/:mama_id",
        component: TestComp,
        props: true
    },
    {
        path: "/posts",
        component: Main,
        children: [
            {
                path: "/", // www.domain.com/posts
                component: List,
            },
            {
                path: "new", // www.domain.com/posts/new
                component: New,
                name: "newPost"
            },
            {
                path: ":id",// www.domain.com/1545
                component: ViewPost,
            },


        ]
    }
]
export default routes;
