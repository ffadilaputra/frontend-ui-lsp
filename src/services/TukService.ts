import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class TukService extends ServiceGenerator<ITuk> {
  protected endpoint = api.endpointTuk + "tuk"
}
