export default function InputTask({ addTask }) {
	return(
		<input
			id="addTask"
			onKeyPress={addTask}
			placeholder="+ Aggiungi un'attività"
		/>
	);
}