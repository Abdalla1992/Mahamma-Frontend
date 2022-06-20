import { BaseModel } from "../base/base.model";

export interface AgendaTopic extends BaseModel {
    topic: string;
    durationInMinutes: number;
}