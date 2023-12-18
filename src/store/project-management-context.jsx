import { createContext, useReducer, useState } from "react";


export const ProjectsContext = createContext({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],

    selectProject: () => { },
    startAddProject: () => { },
    cancelAddProject: () => { },
    AddProject: () => { },
    deleteProject: () => { },
    addTask: () => { },
    deleteTask: () => { },
});

export default function ProjectManagementContextProvider({ children }) {
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


    const contextValue = {
        selectedProjectId: projectsState.selectedProjectId,
        projects: projectsState.projects,
        tasks: projectsState.tasks,

        selectProject: handleSelectProject,
        startAddProject: handleStartAddProject,
        cancelAddProject: handleCancelAddProject,
        AddProject: handleAddProject,
        deleteProject: handleDeleteProject,
        addTask: handleAddTask,
        deleteTask: handleDeleteTask,
    }

    return (<ProjectsContext.Provider value={contextValue}>
        {children}
    </ProjectsContext.Provider>)
}