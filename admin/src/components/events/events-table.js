import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchAllEvents,
  toggleSelection as handleSelect,
  eventListSelector,
  loadedSelector,
  loadingSelector
} from '../../ducks/events'
import Loader from '../common/loader'

export class EventsTable extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchAllEvents && this.props.fetchAllEvents()
  }

  render() {
    if (this.props.loading) return <Loader />
    return (
      <table>
        <tbody>{this.getRows()}</tbody>
      </table>
    )
  }

  getRows = () => this.props.events.map(this.getRow)

  getRow = (event) => (
    <tr
      key={event.uid}
      className="test--event-list_item"
      onClick={this.handleRowClick(event)}
    >
      <td>{event.title}</td>
      <td>{event.when}</td>
      <td>{event.where}</td>
    </tr>
  )

  handleRowClick = (event) => () => {
    this.props.handleSelect(event.uid)
  }
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { fetchAllEvents, handleSelect }
)(EventsTable)
