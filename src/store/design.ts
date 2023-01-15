import { Instance, types } from "mobx-state-tree";
import { createContext, useContext } from "react";
import { randomInRange } from "../util/randomInRange";
import { Element } from "./element";

function generateInitialState() {
  const initialState = [];

  for (let i = 0; i < 10; i++) {
    initialState.push({
      id: `id-${i}`,
      x: randomInRange(window.innerWidth),
      y: randomInRange(window.innerHeight),
      numPoints: 5,
    });
  }

  return initialState;
}

export const Store = types.model("Store", {
  elements: types.array(Element),
});

export type StoreType = Instance<typeof Store>;

const store = Store.create({
  elements: generateInitialState(),
});

export default store;

export const StoreContext = createContext<StoreType>(store);

export const useStore = () => useContext(StoreContext);
