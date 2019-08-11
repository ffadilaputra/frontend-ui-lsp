import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class ElemenService extends ServiceGenerator<IElemen> {
  protected endpoint = api.endpoint + "manage/elemen"
}
