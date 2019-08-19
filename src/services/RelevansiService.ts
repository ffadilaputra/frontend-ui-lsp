import { api } from "../config";
import { ServiceGenerator } from "./ServiceGenerator";

export class RelevansiService extends ServiceGenerator<IRelevansi> {
  protected endpoint = api.endpoint + "relevansi";
}
