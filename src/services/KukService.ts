import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class KukService extends ServiceGenerator<IKuk> {
  protected endpoint = api.endpoint + "manage/kuk"
}
