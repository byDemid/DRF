import React from "react";
import {Link} from "react-router-dom";

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                <Link to={`/projects/${project.id}`}>{project.name}</Link>
            </td>
            <td>{project.repo_url}</td>
            <td>{project.users}</td>

        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table className="form-range">
            <thead>
            <tr>
                <th>Project</th>
                <th>URL</th>
                <th>Users</th>
            </tr>
            </thead>
            <tbody>
            {projects.map((project) => <ProjectItem project={project}/>)}
            </tbody>
        </table>
    )
}

export default ProjectList;
