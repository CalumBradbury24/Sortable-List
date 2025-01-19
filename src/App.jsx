import { useReducer } from "react";
import "./App.css";
import { SortableList } from "./SortableList";

const initialState = {
  items: [...new Array(50)].map((_, index) => {
    return {
      id: index,
    };
  }),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "reorder":
      return { ...state, items: action.payload };
  }
};

function App() {
  const [{ items }, dispatch] = useReducer(reducer, initialState);
  console.log("items -> ", items);
  return (
    <div style={{ width: "500px" }}>
      <SortableList
        items={items}
        onChange={dispatch}
        renderItem={(item) => (
          <SortableList.SortableItem id={item.id} key={item.id}>
            <p>{item.id}</p>
            <SortableList.DragHandle />
          </SortableList.SortableItem>
        )}
      />
    </div>
  );
}

export default App;
