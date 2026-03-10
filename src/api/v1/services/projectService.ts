import {Project} from "../models/interfaces";

export const projectList: Project[] = [
       {
              id: 1,
              name: "Website Redesign",
              status: "active",
              createdAt: "2025-01-10T10:00:00.000Z"
       },
       {
              id: 2,
              name: "Mobile App v2",
              status: "planning",
              createdAt: "2025-01-10T10:00:00.000Z"
       },
       {
              id: 3,
              name: "API Migration",
              status: "active",
              createdAt: "2025-01-10T10:00:00.000Z"
       },
       {
              id: 4,
              name: "Security Audit",
              status: "completed",
              createdAt: "2025-01-10T10:00:00.000Z"
       },
];

export const getAllProject = (): Project[] => {
       return projectList;
}

export const getProjectById = (id: number): Project | null => {
       const project: Project | undefined = projectList.find( (x) => x.id === id);
       return project ? project : null;
}

export const createProject = (project: Project): Project => {
       const newProject: Project = {
              id: project.id,
              name: project.name,
              status: project.status,
              createdAt: new Date().toISOString()
       }

       projectList.push(newProject);

       return newProject;
}

export const updateProject = (id: number ,name?: string, status?: string): Project | null => {
       const projectById: Project | undefined = projectList.find( (x) => x.id === id);
       if(projectById === undefined) {
              return null;
       }

       if(name !== undefined){
              projectById.name = name
       }

       if(status !== undefined){
              projectById.status = status
       }


       return projectById;
}

export const deleteProject = (id: number) => {
       const index: number = projectList.findIndex( (x) => x.id === id);
       if(index < 0){
              return null;
       }

       projectList.splice(index, 1);
}
