import { Instance, types } from "mobx-state-tree";

const ElementAttrs = {
  id: "",
  x: 0,
  y: 0,
  numPoints: 5,
  fill: '',
  scaleX: 1,
  scaleY: 1,
  rotation: 0,
};

export type ElementAttrsType = typeof ElementAttrs;

export const Element = types.model("Element", ElementAttrs).actions((self) => ({
  set(attrs: Partial<ElementAttrsType>) {
    Object.assign(self, attrs);
  }
}));

export type ElementType = Instance<typeof Element>;
