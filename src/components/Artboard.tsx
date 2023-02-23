import { observer } from "mobx-react-lite";
import { Layer, Stage, Transformer } from 'react-konva';
import { StarElement } from "../elements/StarElement";
import { useStore } from "../store/design";
import { useRef, useState } from 'react';
import Toolbar from './Toolbar.tsx'

function ArtboardImpl() {
  const { elements } = useStore();

  const [selected, setSelected] = useState(null);

  const stageRef = useRef();

  const onClickStage = (e) => {
    const tr = stageRef.current.findOne('.tr');

    if (e.target.getType() === 'Stage') {
      tr.nodes([]);
      setSelected(null);
      return;
    }
    console.log(e.target)
    tr.nodes([e.target])
    setSelected(elements.find(item => item.id === e.target.id()));
  }

  return (
    <>
      <Stage ref={stageRef} width={window.innerWidth} height={window.innerHeight} onClick={onClickStage}>
        <Layer>
          {elements.map((element) => (
            <StarElement element={element} key={element.id} />
          ))}
          <Transformer onTransformEnd={e => selected.set(e.target.attrs)} name="tr" anchorCornerRadius={8} anchorFill="#ff7900" anchorStroke="white" borderStroke="blue" />
        </Layer>
      </Stage>
      <Toolbar selected={selected} stage={stageRef.current} />
    </>
  );
}

export const Artboard = observer(ArtboardImpl);
