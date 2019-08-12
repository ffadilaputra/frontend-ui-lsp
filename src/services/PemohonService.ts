import { api } from "../config"
import { ServiceGenerator } from "./ServiceGenerator"

export class PemohonService extends ServiceGenerator<IPemohon> {
  protected endpoint = api.endpoint + "pemohon/users"
}
