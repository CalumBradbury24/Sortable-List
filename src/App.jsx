import { createContext, useContext, useMemo, useReducer } from "react";
import "./App.css";
import { SortableList } from "./SortableList";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./Item.css";

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

const SortableItemContext = createContext({
  attributes: {},
  listeners: undefined,
  ref() {},
});

function Item({ children, id }) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  );
  const style = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <SortableItemContext.Provider value={context}>
      <li className="SortableItem" ref={setNodeRef} style={style}>
        {children}
      </li>
    </SortableItemContext.Provider>
  );
}

export function DragHandle() {
  const { attributes, listeners, ref } = useContext(SortableItemContext);

  return (
    <button className="DragHandle" {...attributes} {...listeners} ref={ref}>
      <svg viewBox="0 0 20 20" width="12">
        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
      </svg>
    </button>
  );
}

function App() {
  const [{ items }, dispatch] = useReducer(reducer, initialState);
  return (
    <div style={{ width: "500px" }}>
      <SortableList
        items={items}
        onChange={dispatch}
        renderItem={(item) => (
          <Item id={item.id} key={item.id}>
            <p>{item.id}</p>
            <DragHandle />
          </Item>
        )}
      />
    </div>
  );
}

export default App;
