import { useState } from 'react';
import NewProject from './Components/NewProject';
import NoProject from './Components/NoProject';
import SelectedProject from './Components/SelectedProject';
import Sidebar from './Components/Sidebar';

function App() {
	const [projectsState, setProjectsState] = useState({
		selectedProjectId: undefined,
		projects: [],
		tasks: [],
	});

	const handleAddTask = (text) => {
		setProjectsState((prevState) => {
			const taskId = Math.random();
			const newTask = {
				text: text,
				projectId: prevState.selectedProjectId,
				id: taskId,
			};

			return {
				...prevState,
				tasks: [newTask, ...prevState.tasks],
			};
		});
	};

	const handleDeleteTask = (id) => {
		setProjectsState((prevState) => {
			return {
				...prevState,
				tasks: prevState.tasks.filter((task) => task.id !== id),
			};
		});
	};

	const handleStartAddProject = () => {
		setProjectsState((prevState) => {
			return {
				...prevState,
				selectedProjectId: null,
			};
		});
	};

	const handleAddProject = (projectData) => {
		setProjectsState((prevState) => {
			const newProject = {
				...projectData,
				id: Math.random(),
			};

			return {
				...prevState,
				selectedProjectId: undefined,
				projects: [...prevState.projects, newProject],
			};
		});
	};

	const handleCancelAddProject = () => {
		setProjectsState((prevState) => {
			return {
				...prevState,
				selectedProjectId: undefined,
			};
		});
	};

	const handleSelectProject = (id) => {
		setProjectsState((prevState) => {
			return {
				...prevState,
				selectedProjectId: id,
			};
		});
	};

	const handleDeleteProject = () => {
		setProjectsState((prevState) => {
			return {
				...prevState,
				selectedProjectId: undefined,
				projects: prevState.projects.filter(
					(project) => project.id !== prevState.selectedProjectId
				),
			};
		});
	};
	const selectedProject = projectsState.projects.find(
		(project) => project.id === projectsState.selectedProjectId
	);

	let content = (
		<SelectedProject
			project={selectedProject}
			onDelete={handleDeleteProject}
			onAddTask={handleAddTask}
			onDeleteTask={handleDeleteTask}
			tasks={projectsState.tasks}
      selectedProjectId={projectsState.selectedProjectId}
		/>
	);
	if (projectsState.selectedProjectId === null) {
		content = (
			<NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
		);
	} else if (projectsState.selectedProjectId === undefined) {
		content = <NoProject onStartAddProject={handleStartAddProject} />;
	}

	return (
		<main className='h-screen my-8 flex gap-8'>
			<Sidebar
				onSelectProject={handleSelectProject}
				onStartAddProject={handleStartAddProject}
				projects={projectsState.projects}
			/>
			{content}
		</main>
	);
}

export default App;
