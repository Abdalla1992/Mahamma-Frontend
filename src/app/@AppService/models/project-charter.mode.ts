import { BaseModel } from "./base/base.model";

export interface ProjectCharter extends BaseModel {
    projectId: any;
    summary: string;
    goals: string;
    deliverables: string;
    scope: string;
    benefits: string;
    costs: string;
    misalignments: string;
}