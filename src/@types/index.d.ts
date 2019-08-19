declare interface IRoute {
  label?: string;
  icon?: string;
  path: string;
  component: React.FunctionComponent | React.Components;
  hide?: boolean;
  private?: boolean;
  name: string;
}

declare interface IField {
  name: string;
  label: string;
  type?: "text" | "password" | "option" | "image" | "date";
  validations?: string[];
  optionData?: IOptionData;
  hide?: boolean;
}

declare interface IOptionData {
  data: any[];
  textKey: string;
  valueKey: string;
}

declare interface ITuk {
  _id: string;
  nama: string;
}

declare interface IJudul {
  _id: string;
  judul: string;
  id_tuk: IUnit;
}

declare interface ISkema {
  _id: string;
  nama: string;
  id_tuk: ITuk | string;
}

declare interface IUnit {
  _id: string;
  kode: string;
  judul: string;
  id_skema: ISkema | string;
}

declare interface IElemen {
  _id: string;
  judul_elemen: string;
  id_unit: IUnit;
}

declare interface IKuk {
  _id: string;
  pertanyaan: pertanyaan;
  id_elemen: IElemen;
}

declare interface IAppContext {
  token: string;
  username: string;
  login: (token: string, username: string, callback: () => void) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}

declare interface IPemohon {
  _id: string;
  username: string;
  email: string;
  password: string;
  roles: string;
  fullname: string;
  date: string;
  gender: string;
  nationaly: string;
  address: string;
  education: string;
}

declare interface IBerkas {
  _id: string;
  username: IPemohon;
  pas_foto: string;
  laporan_hasil_studi: string;
  surat_keterangan: string;
}

declare interface IRelevansi {
  _id: string;
  username: IPemohon;
  rincian: string;
  lampiran: string;
}

declare interface IAdmin {
  username?: string;
  password?: string;
}

declare interface ILogin {
  token?: string;
  username?: string;
}
