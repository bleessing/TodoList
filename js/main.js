// находим элементы формы
 const  form = document.querySelector('#form');
 const taskInput = document.querySelector('#taskInput')
 const  tasksList = document.querySelector('#tasksList')
 const emptyList = document.querySelector('#emptyList')

 let tasks = []


 if(localStorage.getItem('tasks')){
	

	tasks = JSON.parse(localStorage.getItem('tasks'))
	tasks.forEach((task) => renderTask(task));
	
 }

 
	

	
 
	



checkEmptyList()

// добавление задачи
 form.addEventListener('submit', addTask)
	
//  удаление задачи из списка
tasksList.addEventListener('click', deleteTask)


// Отмечаем задачу завершенной
tasksList.addEventListener('click', doneTask)


// функции
 function addTask (event){
	//  отмена отправки формы
	event.preventDefault()
	// достаем текст задачи из поля ввода
	 const taskText = taskInput.value;


	//  описываем задачу в виде объекта 
	 const newTask ={
		id: Date.now(),
		text: taskText,
		done: false,
	 };
	//  добавление задачи в массив с задачами
	tasks.push(newTask)
	saveToLocalStorage()
	renderTask(newTask)
	
	
// очищаем поле ввода и возвращаем на него фокус
taskInput.value = ''
taskInput.focus()


checkEmptyList()
saveToLocalStorage()






 }

 function deleteTask(event){
	


	if(event.target.dataset.action === 'delete'){
		
		 const parenNode = event.target.closest('.list-group-item')


		//  определяем ID задачи
		const id = Number(parenNode.id)
		// находим индекс задачи в массиве
		// const index = tasks.findIndex((task)=> task.id === id);
		
		// удаление задачи из массива
		// tasks.splice(index, 1)



		// удаляем задачу через фильтрацию массива
		tasks = tasks.filter((task)=> task.id !== id)
		console.log(tasks);

		saveToLocalStorage()
// удаление задачи из разметки
		 parenNode.remove();

		 checkEmptyList();
		

	}

 
 }

 function doneTask(event){
	// Проверка что клик был по кнопке "задача выполнена"
	if(event.target.dataset.action === "done"){
		const parenNode = event.target.closest('.list-group-item')
// орпеделение id задачи
        const id = Number(parenNode.id);
		const task =  tasks.find((task) =>  task.id === id)
		task.done = !task.done
		
		saveToLocalStorage()


		const taskTitle =  parenNode.querySelector('.task-title')
		taskTitle.classList.toggle('task-title--done')
		
	}
 }

 function checkEmptyList(){
	
	if (tasks.length === 0){
		const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
		<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
		<div class="empty-list__title">Список дел пуст</div>
	</li>`;
		tasksList.insertAdjacentHTML('afterbegin', emptyListHTML)

	}

	if (tasks.length > 0){
		const emptyListEl = document.querySelector('#emptyList')
		emptyListEl ? emptyListEl.remove() : null;
	}
 }


 function saveToLocalStorage(){
	localStorage.setItem('tasks', JSON.stringify(tasks))
 }


 
function renderTask(task){
	const cssClass = task.done ? "task-title task-title--done" :"task-title"


	 // добавдение задачи на экран 

	const taskHTML = ` <li id ="${task.id}" class="list-group-item d-flex justify-content-between task-item">
	<span class=${cssClass}>${task.text}</span>
	<div class="task-item__buttons">
		<button type="button" data-action="done" class="btn-action">
			<img src="./img/tick.svg" alt="Done" width="18" height="18">
		</button>
		<button type="button" data-action="delete" class="btn-action">
			<img src="./img/cross.svg" alt="Done" width="18" height="18">
		</button>
	</div>
</li> `;

// добавление на старницу
tasksList.insertAdjacentHTML('beforeend', taskHTML)

}