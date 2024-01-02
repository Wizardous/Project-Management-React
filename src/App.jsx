import { useState, useContext } from "react";

import { NewProject } from "./Components/NewProject";
import { NoProjectSelected } from "./Components/NoProjectSelected";
import { ProjectsSidebar } from "./Components/ProjectsSidebar";
import { SelectedProject } from "./Components/SelectedProject";

import { ProjectsContext } from "./store/project-management-context";


function App() {
	const { selectedProjectId } = useContext(ProjectsContext);

	let content;
	if (selectedProjectId === null) {
		content = <NewProject />
	} else if (selectedProjectId === undefined) {
		content = <NoProjectSelected />
	} else {
		content = (<SelectedProject />)
	}

	return (
		<main className="h-screen my-8 flex gap-8">
			<ProjectsSidebar />
			{content}
		</main>
	);
}

export default App;
