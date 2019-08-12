import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { PemohonService } from "../../services/PemohonService"

interface IState {
    pemohon: IPemohon[]
    loading: boolean
    error?: Error
}

const fields: IField[] = [
    {
        name: "fullname",
        label: "Fullname",
        validations: ["required"],
    },
    {
        name: "username",
        label: "Username",
        validations: ["required"],
    },
    {
        name: "password",
        label: "Password",
        validations: ["required"],
        hide:true
    },
    {
        name: "email",
        label: "Email",
        validations: ["required"],
    },
    {
        name: "gender",
        label: "Gender",
        type: "option",
        optionData: {
            data: [{"gender":"Perempuan"},{"gender":"Laki-Laki"}],
            textKey: "gender",
            valueKey: "gender",
        },
        validations: ["required"],
        hide:true,
    },
    {
        name: "date",
        label: "Date",
        type: "date",
        validations: ["required"],
    },
    {
        name: "nationality",
        label: "Nationality",
        validations: ["required"],
        hide:true,
    },
    {
        name: "address",
        label: "Address",
        validations: ["required"],
        hide:true,
    },
    {
        name: "education",
        label: "Education",
        validations: ["required"],
        hide:true,
    },
]

export default class Pemohon extends Component<{}, IState> {
    public state: IState = {
        pemohon: [],
        loading: false,
    }

    public PemohonService = new PemohonService()
    public componentDidMount() {
        this.getPemohon()
    }

    public getPemohon() {
        this.setState({ loading: true })
        this.PemohonService
            .get()
            .then((pemohon) => this.setState({ pemohon }))
            .catch((error) => this.setState({ error }))
            .finally(() => this.setState({ loading: false }))
    }

    public createPemohon(input: IPemohon) {
        this.setState({ loading: true })
        this.PemohonService
            .create(input)
            .then(() => this.getPemohon())
            .catch((error) => this.setState({ error, loading: false }))
    }

    public updatePemohon(input: IPemohon, id: string) {
        this.setState({ loading: true })
        this.PemohonService
            .update(input, id)
            .then(() => this.getPemohon())
            .catch((error) => this.setState({ error, loading: false }))
    }

    public async deletePemohon(id: string) {
        this.setState({ loading: true })
        this.PemohonService
            .delete(id)
            .then(() => this.getPemohon())
            .catch((error) => this.setState({ error, loading: false }))
    }

    public render() {
        return (
            <Fragment>
                <Header content="Pemohon" subheader="Data Pemohon" />
                <ErrorMessage
                    error={this.state.error}
                    onDismiss={() => this.setState({ error: undefined })}
                />
                <DataTable
                    data={this.state.pemohon}
                    loading={this.state.loading}
                    fields={fields}
                    onCreate={(input) => this.createPemohon(input)}
                    onUpdate={(input) => this.updatePemohon(input, input._id)}
                    onDelete={(input) => this.deletePemohon(input._id)}
                />
            </Fragment>
        )
    }
}
