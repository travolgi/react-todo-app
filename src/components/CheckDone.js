export default function CheckDone({ toggle, valDone }) {
	return(
		<span
			onClick={toggle}
			className={valDone ? "done" : "markdone"}
		/>
	);
}