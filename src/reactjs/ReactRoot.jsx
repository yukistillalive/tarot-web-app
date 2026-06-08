
import { Details } from "./detailsPresenter.jsx";
import {SuspenseView} from "/src/views/suspenseView.jsx";
import { Dash } from "./dashPresenter.jsx";
import { Headbar } from "./headbarPresenter.jsx";
import { History } from "./historyPresenter.jsx";
import { Library } from "./libraryPresenter.jsx";
import { Results } from "./resultsPresenter.jsx";
import { ApiTest } from "./apiTestPresenter.jsx";
import { Tutorial } from "./tutorialPresenter.jsx";
import { Login } from "./loginPresenter.jsx";
import { Register } from "./registerPresenter.jsx";
import { Profile } from "./profilePresenter.jsx";



import { observer } from "mobx-react-lite";
import {  createHashRouter,  RouterProvider, useParams, Navigate, Outlet} from "react-router-dom";



//the root component passes the model further to each Presenter
const ReactRoot = observer( //  will be added in week 3

    function ReactRoot(props){
            if (!props.model.authInitialized) return null;
            return (
            <div >
                <RouterProvider router={makeRouter(props.model)}/>
                {/* <TextCursor
                    text="⚛️"
                    spacing={80}
                    followMouseDirection
                    randomFloat
                    exitDuration={0.3}
                    removalInterval={20}
                    maxPoints={10}
                /> */}
            </div>
            );
        }


);


function LayoutWithHeadbar({model}) {
    return (
        <div>
            <Headbar model={model} />
            <Outlet />
        </div>
    );
}


export function makeRouter(model){

    if (!model.isLoggedIn) {
        return createHashRouter([
            {
                path: "/login",
                element: <Login model={model} />,
            },
            {
                path: "/register",
                element: <Register model={model} />,
            },
            {
                path: "*",
                element: <Navigate to="/login" />,
            },
        ]);
    }

    return createHashRouter([
    {
        path: "/",
        element: <LayoutWithHeadbar model={model} />,
        children: [
            {
                index: true,
                element: <Dash model={model} />,
            },
            {
                path: "details/:cardId",
                element: <Details model={model} />,
            },
            {
                path: "history",
                element: <History model={model} />,
            },
            {
                path: "library",
                element: <Library model={model} />,
            },
            {
                path: "results/:recordId",
                element: <Results model={model} />,
            },
            {
                path: "tutorial",
                element: <Tutorial model={model} />,
            },
            {
                path: "apitest",
                element: <ApiTest model={model} />,
            },
            {
                path: "profile",
                element: <Profile model={model} />,
            },
        ],
    },
    {
        path: "/login",
        element: <Navigate to="/" />,
    },
    {
        path: "/register",
        element: <Navigate to="/" />,
    },
])
}



export { ReactRoot }
