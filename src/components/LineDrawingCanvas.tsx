// import React, {useRef, useState} from 'react';
//
// interface VectorPath {
//     startPoint: { x: number; y: number };
//     endPoint: { x: number; y: number };
// }
//
// interface DrawingProps {
//     canvasWidth: number;
//     canvasHeight: number;
// }
//
// const LineDrawingCanvas: React.FC<DrawingProps> = ({canvasWidth, canvasHeight}) => {
//     const canvasRef = useRef<HTMLCanvasElement>(null);
//     const [isDrawing, setIsDrawing] = useState(false);
//     const [vectorPath, setVectorPath] = useState<VectorPath | null>(null);
//
//     const startDrawing = (e: MouseEvent) => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;
//
//         const initialPosition = {x: e.clientX, y: e.clientY};
//         setVectorPath({startPoint: initialPosition, endPoint: initialPosition});
//         setIsDrawing(true);
//     };
//
//     const endDrawing = () => {
//         setIsDrawing(false);
//     };
//
//     const handleMouseMove = (e: MouseEvent) => {
//         if (!isDrawing) return;
//
//         const canvas = canvasRef.current;
//         if (!canvas) return;
//
//         const currentPos = {x: e.clientX, y: e.clientY};
//         const distance = Math.sqrt(
//             Math.pow(currentPos.x - vectorPath!.startPoint.x, 2) + Math.pow(currentPos.y - vectorPath!.startPoint.y, 2)
//         );
//
//         if (distance < 10) return; // if the distance is less than 10px, don't draw the line
//
//         setVectorPath((prev) => ({...prev!, endPoint: currentPos}));
//
//         const ctx = canvas.getContext('2d');
//         if (ctx) {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//             ctx.beginPath();
//             ctx.moveTo(vectorPath!.startPoint.x, vectorPath!.startPoint.y);
//             ctx.lineTo(currentPos.x, currentPos.y);
//             ctx.stroke();
//         }
//     };
//
//     return (
//         <canvas
//             ref={canvasRef}
//             onMouseDown={startDrawing}
//             onMouseUp={endDrawing}
//             onMouseMove={handleMouseMove}
//             width={canvasWidth}
//             height={canvasHeight}
//             style={{border: '1px solid black'}}
//         />
//     );
// };
//
// export default LineDrawingCanvas;

import {Card} from "@nextui-org/react";

export default function LineDrawingCanvas() {
    return (
        <div>
        </div>
    );
}