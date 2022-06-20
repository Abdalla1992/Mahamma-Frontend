export interface ProjectRiskPlan{
    id: number;
    projectId: number;
    issue: string;
    impact: string;
    action: string;
    owner: string;
}