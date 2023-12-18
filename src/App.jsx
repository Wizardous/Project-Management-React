import { useState } from "react";

import { NewProject } from "./Components/NewProject";
import { NoProjectSelected } from "./Components/NoProjectSelected";
import { ProjectsSidebar } from "./Components/ProjectsSidebar";
import { SelectedProject } from "./Components/SelectedProject";
import ProjectManagementContextProvider from "./store/project-management-context";

function App() {
	const [projectsState, setProjectsState] = useState({
		selectedProjectId: undefined,
		projects: [],
		tasks: []
	});

	function handleAddTask(text) {
		setProjectsState(prevState => {
			const taskId = Math.random();
			const newTask = {
				text: text,
				projectId: prevState.selectedProjectId,
				id: taskId
			}
			return {
				...prevState,
				tasks: [newTask, ...prevState.tasks]
			}
		})
	}

	function handleDeleteTask(id) {
		setProjectsState(prevState => {
			return {
				...prevState,
				tasks: prevState.tasks.filter(
					(task) => task.id !== id
				)
			}
		});
	}

	function handleSelectProject(id) {
		setProjectsState(prevState => {
			return {
				...prevState,
				selectedProjectId: id
			}
		});
	}

	function handleStartAddProject() {
		setProjectsState(prevState => {
			return {
				...prevState,
				selectedProjectId: null
			}
		});
	}

	function handleAddProject(projectData) {
		setProjectsState(prevState => {
			const newProject = {
				...projectData,
				id: Math.random()
			}
			return {
				...prevState,
				selectedProjectId: undefined,
				projects: [...prevState.projects, newProject]
			}
		})
	}

	function handleDeleteProject() {
		setProjectsState(prevState => {
			return {
				...prevState,
				selectedProjectId: undefined,
				projects: prevState.projects.filter(
					(project) => project.id !== prevState.selectedProjectId
				)
			}
		});
	}

	function handleCancelAddProject() {
		setProjectsState(prevState => {
			return {
				...prevState,
				selectedProjectId: undefined
			}
		});
	}


	const selectedProject = projectsState.projects.find(
		project => project.id === projectsState.selectedProjectId
	);

	let content = (
		<SelectedProject
			project={selectedProject}
			onDelete={handleDeleteProject}
			onAddTask={handleAddTask}
			onDeleteTask={handleDeleteTask}
			tasks={projectsState.tasks}
		/>
	);

	if (projectsState.selectedProjectId === null) {
		content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
	} else if (projectsState.selectedProjectId === undefined) {
		content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
	}

	return (
		<ProjectManagementContextProvider>
			<main className="h-screen my-8 flex gap-8">
				<ProjectsSidebar
					onStartAddProject={handleStartAddProject}
					projects={projectsState.projects}
					onSelectProject={handleSelectProject}
					selectedProjectId={projectsState.selectedProjectId}
				/>
				{content}
			</main>
		</ProjectManagementContextProvider>
	);
}

export default App;
