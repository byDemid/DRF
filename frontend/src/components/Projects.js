import React from "react";
import {Link} from "react-router-dom";

const ProjectItem = ({project, deleteProjects}) => {
    return (
        <tr>
            <td>
                <Link to={`/projects/${project.id}`}>{project.name}</Link>
            </td>
            <td>{project.repo_url}</td>
            <td>{project.users}</td>

            <td>
                <button onClick={() => deleteProjects(project.id)} type='button'>Delete</button>
            </td>

        </tr>
    )
}

const ProjectList = ({projects, deleteProjects}) => {
    return (
        <div>
            <table className="form-range">
                <thead>
                <tr>
                    <th>Project</th>
                    <th>URL</th>
                    <th>Users</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {projects.map((project) => <ProjectItem project={project} deleteProjects={deleteProjects}/>)}
                </tbody>
            </table>

            <Link to={'/projects/create'}>Create</Link>
        </div>

    )
}

export default ProjectList;
