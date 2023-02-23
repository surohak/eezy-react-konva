import { observer } from 'mobx-react-lite';
import { useStore } from '../store/design';
import { useState } from 'react';
import { convertImageToBlackAndWhite, downloadFile, imageDataToBlackAndWhite } from './utils';

const Toolbar = ({ selected, stage }) => {
  const { setElements } = useStore();

  const [src, setSrc] = useState('');

  const onClickDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(stage.toJSON()));
    downloadFile(dataStr, 'design.json')
  }

  const onClickLoadFromJSON = (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const obj = JSON.parse(JSON.parse(e.target.result as string));
      const stars = obj.children[0].children.filter(item => item.className === 'Star').map(item => item.attrs);
      console.log(stars)
      setElements(stars);
    };
    reader.readAsText(event.target.files[0]);
  }

  const onClickGeneratePreview = () => {
    const ratio = Math.min(200 / stage.width(), 300 / stage.height());

    const dataUrl = stage.toDataURL({
      pixelRatio: ratio,
    });

    convertImageToBlackAndWhite(dataUrl, (src) => setSrc(src))
  }


  return (
    <>
      <div style={{
        position: 'absolute',
        top: 10,
        left: 0,
        right: 0,
        margin: 'auto',
        width: '90%',
        backgroundColor: 'gray',
        borderRadius: 8,
        padding: 4,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'column',
        height: 60,
      }}>
        <div>Toolbar</div>
        <div style={{ display: 'flex', flexDirection: 'row', columnGap: 10, alignItems: 'center' }}>
          {selected && (
            <>
              <input type="range" min={1} max={10} step={1} value={selected.numPoints} onChange={(e) => selected.set({ numPoints: (Number(e.target.value))})}/>
              <input type="color" value={selected.fill} onChange={e => selected.set({ fill: e.target.value })}/>
            </>
          )}
          <button onClick={onClickDownloadJSON}>Download JSON</button>
          <label htmlFor="file" className="btn">Select JSON</label>
          <input id="file" style={{ display: 'none'}} type="file" onChange={onClickLoadFromJSON} />
          <button onClick={onClickGeneratePreview}>Generate Preview</button>
        </div>
      </div>
      {src && <img src={src} alt="" style={{ position: 'absolute', bottom: 0, right: 0 }}/>}
    </>
  )
}

export default observer(Toolbar);
