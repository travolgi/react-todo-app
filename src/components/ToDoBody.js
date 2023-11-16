import React from 'react';
import InputTask from './InputTask';
import CheckDone from './CheckDone';
import BulletMenu from './BulletMenu';

export default class ToDoBody extends React.Component {
	constructor(props){
		super(props);
		this.state = JSON.parse(window.localStorage.getItem('stateTasks')) || { tasks: [] };
		this.addTask = this.addTask.bind(this);
		this.toggleDone = this.toggleDone.bind(this);
		this.modifyTask = this.modifyTask.bind(this);
		this.deleteTask = this.deleteTask.bind(this);
	}

	componentDidUpdate() {
		window.localStorage.setItem('stateTasks', JSON.stringify(this.state));
	}

	sortTasks(arr){
		return arr.sort((a, b) => a.done - b.done);
	}
	addTask(e){
		if(e.key === 'Enter' && e.target.value.trim().length < 3) {
			alert('Inserisci minimo 3 caratteri.')
		}
		if(e.key === 'Enter' && e.target.value.trim().length >= 3) {
			let newTask = {
				name: e.target.value.trim(),
				id: Date.now(),
				done: false
			};
			this.setState(prevState => (
				{ tasks: this.sortTasks([newTask].concat(prevState.tasks)) }
			));
			e.target.value = '';
		}
	}
	toggleDone(e){		
		const idTask = parseInt(e.target.parentNode.id);	
		const updateTasks = [...this.state.tasks].map(ele => 
			ele.id === idTask ? Object.assign(ele, { done: !ele.done }) : ele
		);
		
		const markedDone = updateTasks.filter(ele => ele.id === idTask)[0].done;
		const logo = document.querySelector('svg.logo');
		if(markedDone) {
			logo.style.animation = 'none';
			void logo.offsetWidth;
			logo.style.animation = 'logo-spin 1600ms ease-out 1';
		}

		this.sortTasks(updateTasks);
		this.setState({ tasks: updateTasks });	
	}
	modifyTask(e){
		const idTask = parseInt(e.target.parentNode.parentNode.id);	
		if(e.key === 'Enter' && e.target.value.trim().length < 3) {
			alert('Devi inserire minimo 3 caratteri.')
		}
		if(e.key === 'Enter' && e.target.value.trim().length >= 3) {
			const updateTasks = [...this.state.tasks].map(ele => 
				ele.id === idTask ? Object.assign(ele, { name: e.target.value }) : ele
			);
			this.setState({ tasks: updateTasks });
			e.target.classList.remove('d-block');
			e.target.value = '';
		}
	}
	deleteTask(e){
		const idTask = parseInt(e.target.parentNode.parentNode.parentNode.id);		
		this.setState(prevState => (
			{ tasks: prevState.tasks.filter(ele => ele.id !== idTask) }
		));
	}
	
	render(){
		return(
			<section>
				<label htmlFor="addTask">Cose da fare oggi?</label>
				<InputTask addTask={this.addTask} />
				<ul>
					{this.state.tasks.map(task => 
						<li key={task.id} id={task.id} className={task.done ? "done" : undefined}>
							<CheckDone toggle={this.toggleDone} valDone={task.done} />
							<span className="nameTask">{task.name}</span>
							<BulletMenu handleModify={this.modifyTask} val={task.name} handleDelete={this.deleteTask} />
						</li>
					)}
				</ul>
			</section>
		);
	}
}