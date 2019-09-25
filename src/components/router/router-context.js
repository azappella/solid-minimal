import { createState, createContext, useContext } from "solid-js";

const RouterContext = createContext([{ history: null }, {}]);

export function RouterProvider(props) {
  const [state, setState] = createState({ history: props.history || null });
  const store = [state];

  // prettier-ignore
  return <RouterContext.Provider value={store}>{(
    props.children
  )}</RouterContext.Provider>
}

export function useRouter() {
  return useContext(RouterContext);
}
