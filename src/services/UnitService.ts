import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class UnitService extends ServiceGenerator<IUnit> {
  protected endpoint = api.endpoint + "manage/unit"
}
