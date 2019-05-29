import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class SkemaService extends ServiceGenerator<ISkema> {
  protected endpoint = api.endpointTuk + "skema"
}
