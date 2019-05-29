import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { UnitService } from "../../services/UnitService"
import { SkemaService } from "../../services/SkemaService"

interface IState {
    skema: ISkema[]
    unit: IUnit[]
    loading: boolean
    error?: Error
}

const fields: IField[] = [
    {
        name: "kode_unit",
        label: "Kode Unit",
        validations: ["required"],
    },
    {
        name: "judul_unit",
        label: "Judul Unit",
        validations: ["required"],
    },
    {
        name: "id_skema",
        label: "Nama Skema",
        validations: ["required"],
    },
    {
        name: "id_skema",
        label: "Nama Skema",
        type:"option",
        validations: ["required"],
        optionData: {
            data: [],
            textKey: "nama_skema",
            valueKey: "nama_skema",
        },
        hide:true
    }
]

export default class Unit extends Component<{}, IState> {
    public state: IState = {
        unit: [],
        skema: [],
        loading: false,
    }

    public skemaService = new SkemaService()
    public unitService = new UnitService()

    public componentDidMount() {
        this.getUnit()
        this.getSkema()
    }

    public getSkema() {
        this.skemaService.get().then((skema) => this.setState({ skema }))
    }

    public getUnit() {
        this.setState({ loading: true })
        this.unitService
            .get()
            .then((unit) => this.setState({ unit }))
            .catch((error) => this.setState({ error }))
            .finally(() => this.setState({ loading: false }))
    }

    public createUnit(input: IUnit) {
        this.setState({ loading: true })
        this.unitService
            .create(input)
            .then(() => this.getUnit())
            .catch((error) => this.setState({ error, loading: false }))
    }

    public updateUnit(input: IUnit, id: string) {
        this.setState({ loading: true })
        this.unitService
            .update(input, id)
            .then(() => this.getUnit())
            .catch((error) => this.setState({ error, loading: false }))
    }

    public async deleteUnit(id: string) {
        this.setState({ loading: true })
        this.unitService
            .delete(id)
            .then(() => this.getUnit())
            .catch((error) => this.setState({ error, loading: false }))
    }
    public setOptionsData() {
        fields[3].optionData!.data = this.state.skema
    }
    public render() {
        this.setOptionsData()
        return (
            <Fragment>
                <Header content="Unit" subheader="Data Unit" />
                <ErrorMessage
                    error={this.state.error}
                    onDismiss={() => this.setState({ error: undefined })}
                />
                <DataTable<IUnit>
                    data={this.state.unit}
                    loading={this.state.loading}
                    fields={fields}
                    onCreate={(input) => this.createUnit(input)}
                    onUpdate={(input) => this.updateUnit(input, input._id)}
                    onDelete={(input) => this.deleteUnit(input._id)}
                />
            </Fragment>
        )
    }
}
