import wrong_llama from '../assets/WRONG-LLAMA-red.png';
import {Modal} from '@nextui-org/react';
import {Warning2} from "iconsax-react";
import React from "react";

export type TryAgainModalProps = {
	show: boolean,
	setShow: (e: boolean) => void
};

export const TryAgainModal = ({show, setShow}: TryAgainModalProps) => {
	return (
		<Modal width='50vw' open={show} blur onClose={() => setShow(false)}
		       style={{height: '60vh'}}
		>
			<Modal.Header>
			</Modal.Header>
			<Modal.Body
				style={{display: 'flex', justifyContent: 'center', alignItems: 'center',
					overflow: 'hidden'
				}}
			>
				<img src={wrong_llama}
				     style={{opacity: '100%', scale: '100%', zIndex: '0', height: '300px'}}
				/>
				<h4 style={{fontFamily: "DM Sans", textAlign: "center", fontWeight: "normal", fontSize: '50px'}}>Ai fost
					aproape!</h4>
				<h5 style={{fontFamily: "DM Sans", textAlign: "center", fontWeight: "normal", fontSize: '30px'}}>Mai
					incearca!</h5>
			</Modal.Body>
		</Modal>
	);
};