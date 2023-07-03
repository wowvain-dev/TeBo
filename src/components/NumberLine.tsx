import './NumberLine.sass';
import {useRef, useEffect, useState} from "react";
import {Button, Spacer} from "@nextui-org/react";
import {Add, Minus} from "iconsax-react";

export type NumberLineProps = {
	label: string,
	plusCallback: () => void,
	minusCallback: () => void,
	value: number
};

export function NumberLine({label, plusCallback, minusCallback, value}: NumberLineProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const [canvas, setCanvas] = useState<HTMLCanvasElement | null>();
	const [context, setContext] = useState<CanvasRenderingContext2D | null>();

	const draw = (ctx: CanvasRenderingContext2D) => {

		ctx.canvas.height = containerRef?.current?.clientHeight ?? 0;
		ctx.canvas.width = containerRef?.current?.clientWidth ?? 0;
		let y: number = ctx.canvas.height;
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.beginPath();
		ctx.moveTo(ctx.canvas.width / 2, 0);
		ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height);
		ctx.lineWidth = 2;
		ctx.strokeStyle = '#ccc';
		ctx.stroke();

		for (let i = 0; i < value; i++) {
			ctx.moveTo(ctx.canvas.width / 2, (y - i * 20) - 10);
			ctx.arc(ctx.canvas.width / 2, (y - i * 20) - 10, 10, 0, Math.PI * 2, false);
			ctx.fillStyle = '#0094fd';
			ctx.fill();
		}
	};

	useEffect(() => {
		if (canvasRef.current === null) return;
		setCanvas(canvasRef.current);
		setContext(canvas?.getContext('2d'));
		if (context === null || context === undefined) return;

		draw(context);
	}, [draw]);

	return (
		<div className="number-line">
			<div className="stick" ref={containerRef}>
				<canvas ref={canvasRef} />
			</div>
			<div className="base">
				<span>{label}</span>
				<div className="base-buttons">
					<Button auto flat color='secondary'
						css={{marginLeft: '5px', width: '16x', height: '20px'}}
					        onPress={() => {
								minusCallback();
					        }}
					><Minus size={20}/></Button>
					<Button auto
						css={{marginLeft: '5px', width: '16x', height: '20px'}}
					        onPress={() => {
								plusCallback();
							}}
					><Add size={20}/></Button>
				</div>
			</div>
		</div>
	);
}