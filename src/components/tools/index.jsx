import './style.css'
import { HexColorPicker } from 'react-colorful'

const Tools = ({setColor,clear,width,height,color}) =>{

  function setc(e){
    setColor(e.target.style.backgroundColor)
  }

  function clearRect(){
    clear.current.clearRect(0,0,width,height)
  }

  return (
    <div className='tools'>
      <div className='color-picker'>
        <HexColorPicker style={{width:'150px',height:'200px',marginRight:'10px'}} color={color} onChange={setColor} />
        <div style={{backgroundColor:color,height:'30px',width:'30px',borderRadius:'20px',marginTop:'10px'}}></div>
      </div>
      <div className='boxes'>
        <div className='colors' style={{backgroundColor:'red',minWidth:'25px'}} onClick={setc}></div>
        <div className='colors' style={{backgroundColor:'blue',minWidth:'25px'}} onClick={setc}></div>
        <div className='colors' style={{backgroundColor:'green',minWidth:'25px'}} onClick={setc}></div>
        <div className='colors' style={{backgroundColor:'yellow',minWidth:'25px'}}onClick={setc}></div>
        <button className='btn' onClick={clearRect}>Clear</button>
      </div> 
    </div>
  );
}

export default Tools;
