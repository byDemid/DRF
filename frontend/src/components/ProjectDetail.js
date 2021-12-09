import React from "react";
import {useParams} from "react-router-dom";


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.repo_url}</td>
        </tr>
    )
}

const ProjectDetail = ({projects}) => {
    let {id} = useParams();
    let filter_project = projects.filter((project) => project.id === +id);
    return (
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Project</th>
                <th>URL</th>
            </tr>
            </thead>
            <tbody>
            {filter_project.map((project) => <ProjectItem project={project}/>)}
            </tbody>
        </table>
    )
}
export default ProjectDetail;
