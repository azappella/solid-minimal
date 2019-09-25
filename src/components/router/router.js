import { RouterProvider } from "./router-context";

export const Router = (props) => (
    <RouterProvider history={props.history}>
        {(props.children)}
    </RouterProvider>
);