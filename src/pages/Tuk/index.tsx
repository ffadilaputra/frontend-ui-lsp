import React, { Component, Fragment } from "react"
import { Header } from "semantic-ui-react"
import DataTable from "../../components/DataTable"
import ErrorMessage from "../../components/ErrorMessage"
import { TukService } from "../../services/TukService"

interface IState {
    tuk: ITuk[]
    loading: boolean
    error?: Error
}

const fields: IField[] = [
    {
        name: "nama",
        label: "Nama TUK",
    },
]

export default class Tuk extends Component<{}, IState> {
    public state: IState = {
        tuk: [],
        loading: false,
    }

    public tukService = new TukService()

    public componentDidMount() {
        this.getTuk()
    }

    public getTuk() {
        this.setState({ loading: true })
        this.tukService
            .get()
            .then((tuk) => this.setState({ tuk }))
            .catch((error) => this.setState({ error }))
            .finally(() => this.setState({ loading: false }))
    }

      public createTuk(input: ITuk) {
        this.setState({ loading: true })
        this.tukService
          .create(input)
          .then(() => this.getTuk())
          .catch((error) => this.setState({ error, loading: false }))
      }

      public updateTuk(input: ITuk, id: string) {
        this.setState({ loading: true })
        this.tukService
          .update(input, id)
          .then(() => this.getTuk())
          .catch((error) => this.setState({ error, loading: false }))
      }

      public async deleteTuk(id: string) {
        this.setState({ loading: true })
        this.tukService
          .delete(id)
          .then(() => this.getTuk())
          .catch((error) => this.setState({ error, loading: false }))
      }

    public render() {
        return (
            <Fragment>
                <Header content="Tuk" subheader="Data TUK" />
                <ErrorMessage
                    error={this.state.error}
                    onDismiss={() => this.setState({ error: undefined })}
                />
                <DataTable<ITuk>
                    data={this.state.tuk}
                    loading={this.state.loading}
                    fields={fields}
                    onCreate={(input) => this.createTuk(input)}
                    onUpdate={(input) => this.updateTuk(input,input._id)}
                    onDelete={(input) => this.deleteTuk(input._id) }
                />
            </Fragment>
        )
    }
}
