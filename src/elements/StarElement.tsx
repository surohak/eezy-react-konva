import { Star } from "react-konva";
import { ElementType } from "../store/element";
import { observer } from "mobx-react-lite";

interface StarProps {
  element: ElementType;
}

export function StarElementImpl(props: StarProps) {
  const { element } = props;

  return (
    <Star
      id={element.id}
      x={element.x}
      y={element.y}
      numPoints={5}
      innerRadius={20}
      outerRadius={40}
      fill={"#ff7900"}
    />
  );
}

export const StarElement = observer(StarElementImpl);
