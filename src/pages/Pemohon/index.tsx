import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { PemohonService } from "../../services/PemohonService"

interface IState {
    pemohon: IPemohon[]
    data: any
    loading: boolean
    error?: Error
}

const fields: IField[] = [
    {
        name: "username",
        label: "Username",
        validations: ["required"],
    },
    {
        name: "email",
        label: "Email",
        validations: ["required"],
    },
]

export default class Pemohon extends Component<{}, IState> {
    public state: IState = {
        pemohon: [],
        data: [
            {"username":"ffadilaputra","email":"i.fadilaputra@gmail.com"},
            {"username":"alfonso","email":"alfonso.tigerhearts@gmail.com"}
        ],
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
                    data={this.state.data}
                    loading={this.state.loading}
                    fields={fields}
                    onCreate={(input) => ''}
                    onUpdate={(input) => ''}
                    onDelete={(input) => ''}
                />
            </Fragment>
        )
    }
}
