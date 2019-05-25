declare interface IRoute {
  label?: string
  icon?: string
  path: string
  component: React.FunctionComponent | React.Components
  hide?: boolean
  private?: boolean
}

declare interface IField {
  name: string
  label: string
  type?: "text" | "password" | "option" | "image" | "date"
  validations?: string[]
  optionData?: IOptionData
  hide?: boolean
}

declare interface IOptionData {
  data: any[]
  textKey: string
  valueKey: string
}

declare interface ITuk {
  _id: string
  nama: string
}

declare interface IAppContext {
  token: string
  setToken: (token: string) => void
  isLoggedIn: () => boolean
}

interface ILogin {
  success: boolean
  token?: string
}
