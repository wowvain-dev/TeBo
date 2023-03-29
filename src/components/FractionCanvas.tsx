import '../pages/exercises/matematica/aritmetica/fractii.sass';
import Fraction from 'fraction.js';
import {useRef, useEffect, useState} from 'react';

type FractionCanvasProps = {
    nominator: number
    denominator: number,
}

export function FractionCanvas({ nominator, denominator }: FractionCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>();
    const [context, setContext] = useState<CanvasRenderingContext2D | null>();

    console.log(`nominator: ${nominator}; denominator: ${denominator}`);

    const draw = (ctx: CanvasRenderingContext2D) => {
        ctx.canvas.height = containerRef?.current?.clientHeight ?? 0;
        ctx.canvas.width = containerRef?.current?.clientWidth ?? 0;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        let parts: number;

        parts = Math.floor(nominator / denominator);

        if (nominator % denominator !== 0) parts += 1;

        for (var part = 0; part < parts; part++) {
            let x = (ctx.canvas.width / parts) * part + (ctx.canvas.width / parts) / 2;
            let y = (ctx.canvas.height / 2);

        for (var i = 0; i < denominator; i++) {
            if (i >= nominator) {
                drawSector(ctx, `#fefefe`, x, y, i);
            } else {
                var hueValue = i * 10 + 217;
                drawSector(ctx, `hsl(${hueValue}, 80%, 60%`, x, y, i);
                // ctx.fillStyle = 'hsl(' + hueValue + ',80%, 60%)';
            }
        }
        nominator -= denominator;
        }

    };

    const drawSector = (ctx: CanvasRenderingContext2D, color: string, x: number, y: number, i: number) => {
         ctx.beginPath();
         ctx.moveTo(x, y);
         ctx.arc(x, y, 65, i * (2 * Math.PI / denominator), (i + 1) * (2 * Math.PI / denominator), false);
         ctx.lineWidth = 2;
         ctx.fillStyle = color;
         ctx.fill();
         ctx.lineWidth = 1;
         ctx.strokeStyle = '#444';
         ctx.stroke();
    }

    useEffect(
        () => {
            if (canvasRef.current === null) return;
            setCanvas(canvasRef.current);
            setContext(canvas?.getContext('2d'));
            if (context === null || context === undefined) return;

            draw(context);
        }, [draw, nominator, denominator]
    );

    useEffect(() => {

    }, []);

    return (
        <div ref={containerRef} className="canvas">
            <canvas ref={canvasRef} />
        </div>
    );
}