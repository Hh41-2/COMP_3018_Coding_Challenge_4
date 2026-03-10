import { Request, Response, NextFunction } from "express";
import { Project } from "../models/interfaces";
import * as projectService from "../services/projectService";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { generalResponse } from "../models/responseModel";

export const healthCheck = (req: Request, res: Response) => {
       res.status(200).json({
              status: "OK",
              uptime: process.uptime(),
              timestamp: new Date().toISOString(),
              version: "1.0.0",
       });
}

export const createProject = (req: Request, res: Response, next: NextFunction) => {
       try{ 
              const newProject: Project = projectService.createProject(req.body)
              res.status(HTTP_STATUS.CREATED).json(generalResponse("Created", undefined, newProject))
       } catch (error) {
              next(error);
       }

}

export const getAllProject = (req: Request, res: Response, next: NextFunction) => {
       try{ 
              const projectList: Project[] = projectService.getAllProject();
              res.status(HTTP_STATUS.OK).json(generalResponse("Retrieved", projectList.length, projectList))
       } catch (error) {
              next(error);
       }

}

export const getProject = (req: Request, res: Response, next: NextFunction) => {
       try{ 
              const id: number = Number(req.params.id);
              if(id <= 0 || isNaN(id)){
                     res.status(HTTP_STATUS.BAD_REQUEST).json(generalResponse("Invalid id"));
                     return;
              }

              const projectById = projectService.getProjectById(id);
              
              if(projectById === null){
                     res.status(HTTP_STATUS.NOT_FOUND).json(generalResponse("Project not found"));
                     return;
              }
              res.status(HTTP_STATUS.OK).json(generalResponse("Retrieved", undefined, projectById));
       } catch (error) {
              next(error);
       }
}

export const deleteProject = (req: Request, res: Response, next: NextFunction) => {
       try{
              const id: number = Number(req.params.id);
              if(id <= 0 || isNaN(id)){
                     res.status(HTTP_STATUS.BAD_REQUEST).json(generalResponse("Invalid id"));
                     return;
              }
              const deletedProject = projectService.deleteProject(id);

              if (deletedProject === null) {
                     res.status(HTTP_STATUS.NOT_FOUND).json(generalResponse("Project not found"));
                     return;
              }
              
              res.status(HTTP_STATUS.OK).json(generalResponse("Deleted"));

       } catch (error) {
              next(error)
       }
}

export const updateProject = (req: Request, res: Response, next: NextFunction) => {
       try{
              const id: number = Number(req.params.id);
              if(id <= 0 || isNaN(id)){
                     res.status(HTTP_STATUS.BAD_REQUEST).json(generalResponse("Invalid id"));
                     return;
              }


              const { name, status } = req.body;

              const updatedProject = projectService.updateProject(id, name, status);
                     
              if(updatedProject === null){
                     res.status(HTTP_STATUS.NOT_FOUND).json(generalResponse("Project not found"));
                     return;
              }
              
              res.status(HTTP_STATUS.OK).json(generalResponse("Updated", undefined, updatedProject));

       } catch (error) {
              next(error)
       }
}