import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { RelevansiService } from "../../services/RelevansiService";
import { PemohonService } from "../../services/PemohonService";

interface IState {
    relevansi: IRelevansi[]
    pemohon: IPemohon[]
    loading: boolean
    error?: Error
}

const fields: IField[] = [
    {
        name: "rincian",
        label: "Rincian",
        validations: ["required"],
    },
    {
        name: "username",
        label: "Pemohon Username",
        type: "option",
        validations: ["required"],
        optionData: {
            data: [],
            textKey: "username",
            valueKey: "username",
        },
        hide: true
    },
    {
        name: "lampiran",
        label: "Lampiran",
        validations: ["required"],
    },
    {
        name: "lampiran",
        label: "Lampiran",
        type: "option",
        validations: ["required"],
        optionData: {
            data: [
                { "lampiran": "ada" }, { "lampiran": "tidak" }
            ],
            textKey: "lampiran",
            valueKey: "lampiran",
        },
        hide: true
    }
]

export default class Relevansi extends Component<{}, IState> {
    public state: IState = {
        relevansi: [],
        pemohon: [],
        loading: false,
    }

    public relevansiService = new RelevansiService()
    public pemohonService = new PemohonService()

    public componentDidMount() {
        this.getPemohon()
        this.getRelevansi()
    }

    public getPemohon() {
        this.setState({ loading: true })
        this.pemohonService
            .get()
            .then((pemohon) => this.setState({ pemohon }))
            .catch((error) => this.setState({ error }))
            .finally(() => this.setState({ loading: false }))
    }

    public getRelevansi() {
        this.setState({ loading: true })
        this.relevansiService
            .get()
            .then((relevansi) => this.setState({ relevansi }))
            .catch((error) => this.setState({ error }))
            .finally(() => this.setState({ loading: false }))
    }

    public createRelevansi(input: IRelevansi) {
        this.setState({ loading: true })
        this.relevansiService
            .create(input)
            .then(() => this.getRelevansi())
            .catch((error) => this.setState({ error, loading: false }))
    }

    public updateRelevansi(input: IRelevansi, id: string) {
        this.setState({ loading: true })
        this.relevansiService
            .update(input, id)
            .then(() => this.getRelevansi())
            .catch((error) => this.setState({ error, loading: false }))
    }

    public async deleteRelevansi(id: string) {
        this.setState({ loading: true })
        this.relevansiService
            .delete(id)
            .then(() => this.getRelevansi())
            .catch((error) => this.setState({ error, loading: false }))
    }

    public setOptionsData() {
        fields[1].optionData!.data = this.state.pemohon
    }

    public render() {
        this.setOptionsData()
        return (
            <Fragment>
                <Header content="Relvansi Pemohon" subheader="Relevansi data pemohon" />
                <ErrorMessage
                    error={this.state.error}
                    onDismiss={() => this.setState({ error: undefined })}
                />
                <DataTable<IRelevansi>
                    data={this.state.relevansi}
                    loading={this.state.loading}
                    fields={fields}
                    onCreate={(input) => this.createRelevansi(input)}
                    onUpdate={(input) => this.updateRelevansi(input, input._id)}
                    onDelete={(input) => this.deleteRelevansi(input._id)}
                />
            </Fragment>
        )
    }
}
