import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { UnitService } from "../../services/UnitService"
import { ElemenService } from "../../services/ElemenService"

interface IState {
    unit: IUnit[]
    elemen: IElemen[]
    loading: boolean
    error?: Error
}

const fields: IField[] = [
    {
        name: "judul_elemen",
        label: "Judul Elemen",
        validations: ["required"],
    },
    {
        name: "id_unit",
        label: "Kode Unit",
        validations: ["required"],
    },
    {
        name: "id_unit",
        label: "Kode Unit",
        type:"option",
        validations: ["required"],
        optionData: {
            data: [],
            textKey: "judul_unit",
            valueKey: "kode_unit",
        },
        hide:true
    }
]

export default class Elemen extends Component<{}, IState> {
    public state: IState = {
        unit: [],
        elemen:[],
        loading: false,
    }

    public unitService = new UnitService()
    public elemenService = new ElemenService()

    public componentDidMount() {
        this.getUnit()
        this.getElemen()
    }

    public getUnit(){
        this.unitService.get().then((unit) => this.setState({ unit }))
    }

    public getElemen() {
        this.setState({ loading: true })
        this.elemenService
            .get()
            .then((elemen) => this.setState({ elemen }))
            .catch((error) => this.setState({ error }))
            .finally(() => this.setState({ loading: false }))
    }

    public createElemen(input: IElemen) {
        this.setState({ loading: true })
        this.elemenService
            .create(input)
            .then(() => this.getElemen())
            .catch((error) => this.setState({ error, loading: false }))
    }

    public updateElemen(input: IElemen, id: string) {
        this.setState({ loading: true })
        this.elemenService
            .update(input, id)
            .then(() => this.getElemen())
            .catch((error) => this.setState({ error, loading: false }))
    }

    public async deleteElemen(id: string) {
        this.setState({ loading: true })
        this.elemenService
            .delete(id)
            .then(() => this.getElemen())
            .catch((error) => this.setState({ error, loading: false }))
    }
    public setOptionsData() {
        fields[2].optionData!.data = this.state.unit
    }
    public render() {
        this.setOptionsData()
        return (
            <Fragment>
                <Header content="Elemen" subheader="Data Elemen" />
                <ErrorMessage
                    error={this.state.error}
                    onDismiss={() => this.setState({ error: undefined })}
                />
                <DataTable<IElemen>
                    data={this.state.elemen}
                    loading={this.state.loading}
                    fields={fields}
                    onCreate={(input) => this.createElemen(input)}
                    onUpdate={(input) => this.updateElemen(input, input._id)}
                    onDelete={(input) => this.deleteElemen(input._id)}
                />
            </Fragment>
        )
    }
}
