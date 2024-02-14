import { useEffect, useState, memo, createContext, useContext } from "react";

const CounterContext = createContext(0);

const GrandChild = memo(function GrandChild() {
    const appCount = useContext(CounterContext);

    console.log("Render <GrandChild />");
    return (
        <>
            <div>GrandChild component</div>
            <div>Count (App): {appCount}</div>
        </>
    );
});

function Child() {
    const [childCounter, setChildCounter] = useState(10);
    const appCount = useContext(CounterContext);
    console.log("Render <Child />");

    const increment = () => setChildCounter((prevCount) => prevCount + 1);
    return (
        <>
            <div>Child component</div>
            <div>Count (parent): {appCount}</div>
            <div>Count (Child): {childCounter}</div>
            <button onClick={increment}>+1 (Child)</button>
            <hr />
            <GrandChild />
        </>
    );
}

export default function App() {
    const [count, setCount] = useState(0);

    const increment = () => setCount((prevCount) => prevCount + 1);

    console.log("Render <App />");

    return (
        <>
            <div>Count (App): {count}</div>
            <button onClick={increment}>+1 (App)</button>
            <hr />
            <CounterContext.Provider value={count}>
                <Child appCount={count} />
            </CounterContext.Provider>
        </>
    );
}
