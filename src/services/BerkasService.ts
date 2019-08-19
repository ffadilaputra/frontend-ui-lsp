import { api } from "../config";
import { ServiceGenerator } from "./ServiceGenerator";

export class BerkasService extends ServiceGenerator<IBerkas> {
  protected endpoint = api.endpoint + "berkas";
}
