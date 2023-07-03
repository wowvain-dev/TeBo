import bg from '@/assets/background_diplome.png';
import stamp from '@/assets/rubber_stamp-logo-diplome.png';
import '../diploma.scss';
import {Modal, Spacer} from "@nextui-org/react";
import {useDiplomaContext, useSettingsContext} from "@/services/context";
import {DiplomaManager} from "@/services/DiplomaManager";
import {Image} from 'antd';

interface DiplomaProps {
	subject: string,
	open: boolean,
	setClose: (a: boolean) => void
}

export function Diploma({subject, open, setClose}: DiplomaProps) {
	const settings = useSettingsContext();
	const avatar = settings.value.settings.avatar;
	const color = settings.value.settings.avatar.color;

	return (
		<div>
			<Modal open={open} closeButton aria-labelledby="modal-title"
				onClose={() => setClose(false)} className={"diploma " + color} width="600px" blur
				   css={{
					   minWidth: 'calc(85vw)px',
					   // backgroundImage: `url(${bg})`,
					   backgroundSize: 'cover',
					   paddingTop: 0
				   }}
			>
				<Modal.Header css={{
					background: `url(${bg})`,
					backgroundSize: `cover`,
					borderBottom: `1px solid #ccc`,
					paddingTop: `14px`,
				}}>
					<h2 style={{
						padding: 5, background: "#fff", borderRadius: "14px",
						paddingLeft: 50, paddingRight: 50,
						border: `2px solid #ccc`
					}}>Diplomă de Merit</h2>
				</Modal.Header>
				<Modal.Body>
					<div className="diploma-body">
						<div className="diploma-content">
							<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
								<p className="diploma-content-header">Felicitări
									<span style={{
										paddingLeft: '50px', paddingRight: '50px',
										marginLeft: '10px',
										borderBottom: "2px solid #ccc"
									}}>{settings.value.settings.name}</span>!
								</p>
								<Spacer y={.5}/>
								<Image src={stamp} width={125} height={125}
									style={{
										rotate: `20deg`,
										opacity: .4
									}}
								/>
							</div>
							<Spacer y={2}/>
							<p>Ai terminat capitolul de {subject}!</p>
							<p>Te poți întoarce în meniul principal pentru a începe următoarea aventură!</p>
						</div>
						<Spacer x={1}/>
						<div className="diploma-avatar">
							<Image preview={false} width={150} height={200}
								src={
									subject === "aritmetică" ? avatar.getAlgebra(true)
										: subject === "geometrie" ? avatar.getGeometrie(true)
										: subject === "română" ? avatar.getRomana(true) : avatar.getBody()
								}
							/>
						</div>
					</div>
					<span style={{textAlign: 'center', fontSize: '20px'}}>SUCCES ÎN CONTINUARE!</span>
				</Modal.Body>
			</Modal>
		</div>
	)
}