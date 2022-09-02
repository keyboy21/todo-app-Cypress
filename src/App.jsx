import React, { useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";
import { fetchTodos } from "./redux/addtodo_reducer";
const AddTodoForm = React.lazy(() => import("./components/AddTodoForm"));
const TodoList = React.lazy(() => import("./components/TodoList"));
const TotalCompleteItems = React.lazy(() => import("./components/TotalCompleteItems"));

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="container bg-white p-4 mt-5">
      <h1>Todo List</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <AddTodoForm />
        <TodoList />
        <TotalCompleteItems />
      </Suspense>
    </div>
  );
};

export default App;
