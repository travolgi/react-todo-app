import ModalModifyTask from './ModalModifyTask';

export default function BulletMenu({ handleDelete, handleModify, val }) {
	const changeDisplay = e => {
		e.preventDefault();
		let menu = e.target.childNodes[0];
		if(menu === undefined){ return }
		if(!menu.nodeValue){
			menu.classList.toggle('d-block')
		}
	}
	const showModInput = e => {
		let input = e.target.parentNode.parentNode.childNodes[1];
		let subMenu = e.target.parentNode;
		input.classList.toggle('d-block');
		subMenu.classList.toggle('d-block');
	}
	return(
		<span className="bullMenu" onClick={changeDisplay}>
			<div className="subMenu">
				<p onClick={showModInput}>Modifica</p>
				<p onClick={handleDelete}><span className="delete" /> Elimina</p>
			</div>
			<ModalModifyTask handleModify={handleModify} val={val} />
		</span>
	);
}