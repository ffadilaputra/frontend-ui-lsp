import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { BerkasService } from "../../services/BerkasService"
import { PemohonService } from "../../services/PemohonService";

interface IState {
    berkas: IBerkas[]
    pemohon: IPemohon[]
    loading: boolean
    error?: Error
}

let options = [
    { text: 'Laki-Laki', value: 'Laki-Laki' },
    { text: 'Perempuan', value: 'Perempuan' },
]

const fields: IField[] = [
    {
        name: "username",
        label: "Username",
    },
    {
        name: "username",
        label: "Username",
        type: "option",
        optionData: {
            data: [],
            textKey: "username",
            valueKey: "username",
        },
        validations: ["required"],
        hide: true,
    },
    {
        name: "bukti_ktp",
        label: "Bukti Ktp",
    },
    {
        name: "pas_foto",
        label: "Pas Foto",
    },
    {
        name: "laporan_hasil_studi",
        label: "Laporan",
    },
    {
        name: "surat_keterangan",
        label: "Surat Keterangan"
    }
]

export default class Berkas extends Component<{}, IState> {
    public state: IState = {
        pemohon: [],
        berkas: [],
        loading: false,
    }

    public berkasService = new BerkasService()
    public pemohonService = new PemohonService()

    public componentDidMount() {
        this.getBerkas()
        this.getPemohon()
    }

    public getPemohon() {
        this.setState({ loading: true })
        this.pemohonService
            .get()
            .then((pemohon) => this.setState({ pemohon }))
            .catch((error) => this.setState({ error }))
            .finally(() => this.setState({ loading: false }))
    }

    public getBerkas() {
        this.setState({ loading: true })
        this.berkasService
            .get()
            .then((berkas) => this.setState({ berkas }))
            .catch((error) => this.setState({ error }))
            .finally(() => this.setState({ loading: false }))
    }

    public createBerkas(input: IBerkas) {
        this.setState({ loading: true })
        this.berkasService
            .create(input)
            .then(() => this.getBerkas())
            .catch((error) => this.setState({ error, loading: false }))
    }

    public updateBerkas(input: IBerkas, id: string) {
        this.setState({ loading: true })
        this.berkasService
            .update(input, id)
            .then(() => this.getBerkas())
            .catch((error) => this.setState({ error, loading: false }))
    }

    public async deleteBerkas(id: string) {
        this.setState({ loading: true })
        this.berkasService
            .delete(id)
            .then(() => this.getBerkas())
            .catch((error) => this.setState({ error, loading: false }))
    }

    public setOptionsData() {
        fields[1].optionData!.data = this.state.pemohon
    }

    public render() {
        this.setOptionsData()
        return (
            <Fragment>
                <Header content="Berkas" subheader="Data Berkas" />
                <ErrorMessage
                    error={this.state.error}
                    onDismiss={() => this.setState({ error: undefined })}
                />
                <DataTable<IBerkas>
                    data={this.state.berkas}
                    loading={this.state.loading}
                    fields={fields}
                    onCreate={(input) => this.createBerkas(input)}
                    onUpdate={(input) => this.updateBerkas(input, input._id)}
                    onDelete={(input) => this.deleteBerkas(input._id)}
                />
            </Fragment>
        )
    }
}
