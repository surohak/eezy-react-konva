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
      numPoints={element.numPoints}
      innerRadius={20}
      outerRadius={40}
      fill={element.fill}
      scaleX={element.scaleX}
      scaleY={element.scaleY}
      rotation={element.rotation}
      draggable
    />
  );
}

export const StarElement = observer(StarElementImpl);
