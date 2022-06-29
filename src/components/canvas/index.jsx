import { useEffect, useRef, useState } from 'react';
import Tools from '../tools/index.jsx'

const Canvas = ({width,height}) =>{
  const canvasRef = useRef()
  const ctxRef = useRef()
  let ongoingTouches = []
  let previousTouches = []
  const [ color, setColor ] = useState('black')

  useEffect(()=>{
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.addEventListener('touchstart',start,{passive:false})
    canvas.addEventListener('touchmove',draw,{passive:false})
    ctx.lineCap = 'round'
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctxRef.current = ctx;
  },[color])

  function start(e){
    e.preventDefault()
    const touches = e.changedTouches
    for (let i = 0; i < touches.length; i++) {
      ctxRef.current.beginPath()
    }
    previousTouches = e.targetTouches
  }

  function draw(e){
    ongoingTouches = e.targetTouches
    e.preventDefault()
    const bound = canvasRef.current.getBoundingClientRect();
    for (let i = 0; i < ongoingTouches.length; i++) {
      ctxRef.current.moveTo(previousTouches[i].clientX - bound.left,previousTouches[i].clientY - bound.top)
      ctxRef.current.lineTo(ongoingTouches[i].clientX - bound.left,ongoingTouches[i].clientY - bound.top)
      ctxRef.current.stroke()
    }
    previousTouches = ongoingTouches
  }

  function stop(e){
    ongoingTouches = e.targetTouches
    if(e.targetTouches.length === 0){
      previousTouches = []
      ongoingTouches = []
    }
  }

  return (
    <>
    <canvas
      ref={canvasRef} 
      touchmove='draw'
      width={width}
      height={height}
      style={{border:'1px solid black',margin:'10px',overflow:'hidden'}}
      touchstart='start'
      onTouchEnd={stop}>
        Not Working
    </canvas>
    <Tools setColor={setColor} clear={ctxRef} width={width} height={height} color={color}/>
    </>
  );
}

export default Canvas;
