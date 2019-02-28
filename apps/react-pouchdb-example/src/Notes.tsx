import * as React from "react";
import { PuttableProps } from "@stanlemon/react-pouchdb";

type Props = PuttableProps & {
  notes?: { note: string }[];
};

interface State {
  note: string;
}

export class Notes extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    notes: []
  };

  state = {
    note: ""
  };

  updateNote = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    this.setState({
      note: e.currentTarget.value
    });
  };

  addNote = (): void => {
    // If there is no actual note, skip
    if (this.state.note.trim() === "") {
      return;
    }

    this.props.putDocument({
      notes: [...this.props.notes, { note: this.state.note }]
    });

    this.setState({ note: "" });
  };

  addNoteWithEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.addNote();
    }
  };

  removeNote(note: { note: string }): void {
    this.props.putDocument({
      notes: this.props.notes.filter(n => n.note !== note.note)
    });
  }

  render(): React.ReactNode {
    return (
      <div>
        <h2 className="is-size-2">Notes:</h2>
        <ul>
          {this.props.notes.map((note, i) => (
            <li key={i}>
              <div className="columns is-mobile">
                <div className="column is-four-fifths">{note.note}</div>
                <div className="column has-text-right">
                  <button
                    className="button is-small is-danger"
                    onClick={this.removeNote.bind(this, note)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <br />
        <div className="field">
          <div className="control">
            <textarea
              className="textarea"
              onChange={this.updateNote}
              onKeyPress={this.addNoteWithEnter}
              value={this.state.note}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-primary" onClick={this.addNote}>
              Add Note
            </button>
          </div>
        </div>
      </div>
    );
  }
}
