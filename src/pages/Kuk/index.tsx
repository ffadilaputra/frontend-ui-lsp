import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { KukService } from "../../services/KukService"
import { ElemenService } from "../../services/ElemenService"

interface IState {
    kuk: IKuk[]
    elemen: IElemen[]
    loading: boolean
    error?: Error
}

const fields: IField[] = [
    {
        name: "pertanyaan",
        label: "Pertanyaan",
        validations: ["required"],
    },
    {
        name: "id_elemen",
        label: "Elemen",
        validations: ["required"],
    },
    {
        name: "id_elemen",
        label: "Elemen",
        type:"option",
        validations: ["required"],
        optionData: {
            data: [],
            textKey: "judul_elemen",
            valueKey: "judul_elemen",
        },
        hide: true,
    }
]

export default class Kuk extends Component<{}, IState> {
    public state: IState = {
        kuk: [],
        elemen:[],
        loading: false,
    }

    public kukService = new KukService()
    public elemenService = new ElemenService()

    public componentDidMount() {
        this.getKuk()
        this.getElemen()
    }

    public getElemen(){
        this.elemenService.get().then((elemen) => this.setState({ elemen }))
    }

    public getKuk() {
        this.setState({ loading: true })
        this.kukService
            .get()
            .then((kuk) => this.setState({ kuk }))
            .catch((error) => this.setState({ error }))
            .finally(() => this.setState({ loading: false }))
    }

    public createKuk(input: IKuk) {
        this.setState({ loading: true })
        this.kukService
            .create(input)
            .then(() => this.getKuk())
            .catch((error) => this.setState({ error, loading: false }))
    }

    public updateKuk(input: IKuk, id: string) {
        this.setState({ loading: true })
        this.kukService
            .update(input, id)
            .then(() => this.getKuk())
            .catch((error) => this.setState({ error, loading: false }))
    }

    public async deleteKuk(id: string) {
        this.setState({ loading: true })
        this.kukService
            .delete(id)
            .then(() => this.getElemen())
            .catch((error) => this.setState({ error, loading: false }))
    }
    public setOptionsData() {
        fields[2].optionData!.data = this.state.elemen
    }
    public render() {
        this.setOptionsData()
        return (
            <Fragment>
                <Header content="Kuk" subheader="Data Kuk" />
                <ErrorMessage
                    error={this.state.error}
                    onDismiss={() => this.setState({ error: undefined })}
                />
                <DataTable<IKuk>
                    data={this.state.kuk}
                    loading={this.state.loading}
                    fields={fields}
                    onCreate={(input) => this.createKuk(input)}
                    onUpdate={(input) => this.updateKuk(input, input._id)}
                    onDelete={(input) => this.deleteKuk(input._id)}
                />
            </Fragment>
        )
    }
}
