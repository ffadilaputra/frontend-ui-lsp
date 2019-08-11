import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class TukService extends ServiceGenerator<ITuk> {
  protected endpoint = api.endpoint + "manage/tuk"
}
