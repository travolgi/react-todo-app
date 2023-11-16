export default function ModalModifyTask({ handleModify, val }){
	return(
		<input
			className="modTask"
			onKeyPress={handleModify}
			placeholder={"✎ " + val}
		/>
	);
}