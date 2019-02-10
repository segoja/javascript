import * as React from "react";
import { Database, Aware, withDocument } from "./PouchDb";
import Counter from "./Counter";
import { Notes } from "./Notes";
import { DatabaseInfo } from "./DatabaseInfo";
import "./App.css";
import { withContainer, Header } from "./withContainer";

const WrappedCounter = withDocument("counter", Counter);
const WrappedNotes = withDocument("notes", Notes);

const WrappedHeader = withContainer(Header);

export default class App extends React.Component {
  render(): React.ReactNode {
    return (
      <Database database="local" remote="http://127.0.0.1:5984/test">
        <div className="app">
          <WrappedHeader>Counter App!</WrappedHeader>
          <WrappedCounter count={0} loading={<div>Loading...</div>} />
          <WrappedNotes loading={<div>Loading...</div>} />
          <Aware>
            <DatabaseInfo />
          </Aware>
        </div>
      </Database>
    );
  }
}
