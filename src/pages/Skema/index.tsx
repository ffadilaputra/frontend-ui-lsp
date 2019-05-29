import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { TukService } from "../../services/TukService"
import { SkemaService } from "../../services/SkemaService"

interface IState {
    skema: ISkema[]
    tuk: ITuk[]
    loading: boolean
    error?: Error
}

const fields: IField[] = [
    {
        name: "nama_skema",
        label: "Nama Skema",
        validations: ["required"],
    },
    {
        name: "id_tuk",
        label: "Tuk",
        type: "option",
        validations: ["required"],
        optionData: {
            data: [],
            textKey: "nama",
            valueKey: "nama",
        },
        hide:true
    }
]

export default class Skema extends Component<{}, IState> {
    public state: IState = {
        tuk: [],
        skema: [],
        loading: false,
    }

    public skemaService = new SkemaService()
    public tukService = new TukService()

    public componentDidMount() {
        this.getTuk()
        this.getSkema()
    }

    public getTuk() {
        this.tukService.get().then((tuk) => this.setState({ tuk }))
    }

    public getSkema() {
        this.setState({ loading: true })
        this.skemaService
            .get()
            .then((skema) => this.setState({ skema }))
            .catch((error) => this.setState({ error }))
            .finally(() => this.setState({ loading: false }))
    }

    public createSkema(input: ISkema) {
        this.setState({ loading: true })
        this.skemaService
            .create(input)
            .then(() => this.getSkema())
            .catch((error) => this.setState({ error, loading: false }))
    }

    public updateSkema(input: ISkema, id: string) {
        this.setState({ loading: true })
        this.skemaService
            .update(input, id)
            .then(() => this.getSkema())
            .catch((error) => this.setState({ error, loading: false }))
    }

    public async deleteSkema(id: string) {
        this.setState({ loading: true })
        this.skemaService
            .delete(id)
            .then(() => this.getSkema())
            .catch((error) => this.setState({ error, loading: false }))
    }

    public setOptionsData() {
        fields[1].optionData!.data = this.state.tuk
    }

    public render() {
        this.setOptionsData()
        return (
            <Fragment>
                <Header content="Skema" subheader="Data Skema" />
                <ErrorMessage
                    error={this.state.error}
                    onDismiss={() => this.setState({ error: undefined })}
                />
                <DataTable<ISkema>
                    data={this.state.skema}
                    loading={this.state.loading}
                    fields={fields}
                    onCreate={(input) => this.createSkema(input)}
                    onUpdate={(input) => this.updateSkema(input, input._id)}
                    onDelete={(input) => this.deleteSkema(input._id)}
                />
            </Fragment>
        )
    }
}
