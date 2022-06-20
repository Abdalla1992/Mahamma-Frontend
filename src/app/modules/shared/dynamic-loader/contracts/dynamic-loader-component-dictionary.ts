import { ComponentItem } from "./dynamic-component";

export abstract class DynamicLoaderComponentsDictionary {
    abstract getDynamicComponents(): ComponentItem[];
}