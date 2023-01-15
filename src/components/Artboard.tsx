import { observer } from "mobx-react-lite";
import { Layer, Stage } from "react-konva";
import { StarElement } from "../elements/StarElement";
import { useStore } from "../store/design";

function ArtboardImpl() {
  const { elements } = useStore();

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {elements.map((element) => (
          <StarElement element={element} key={element.id} />
        ))}
      </Layer>
    </Stage>
  );
}

export const Artboard = observer(ArtboardImpl);
