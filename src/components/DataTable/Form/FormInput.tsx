import React, { Component } from "react"
import { Input, TextArea } from "semantic-ui-react"
import InputDropdown from "./InputDropdown"
import InputImage from "./InputImage"

interface IProps {
  field: IField
  onChange: (value: any) => void
  value: any
  readOnly: boolean
}

export default class FormInput extends Component<IProps> {
  public renderInput() {
    const { field, value } = this.props
    if (field.type === "option") {
      return (
        <InputDropdown
          field={field}
          onChange={(value) => this.props.onChange(value)}
          value={value}
          readOnly={this.props.readOnly}
        />
      )
    } else if (field.type === "image") {
      return (
        <InputImage
          field={field}
          onChange={(value) => this.props.onChange(value)}
          value={value}
          readOnly={this.props.readOnly}
        />
      )
    } else if (field.type === "date") {
      return (
        <Input
          type={field.type}
          label={field.label}
          fluid
          onChange={(event) => this.props.onChange(event.target.value)}
          value={String(value).slice(0, 10)}
          readOnly={this.props.readOnly}
        />
      )
    } else {
      return (
        <Input
          placeholder={`Masukkan ${field.label}`}
          type={field.type}
          label={field.label}
          fluid
          onChange={(event) => this.props.onChange(event.target.value)}
          value={value}
          readOnly={this.props.readOnly}
        />
      )
    }
  }

  public render() {
    return this.renderInput()
  }
}
