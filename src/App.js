import React, { Component } from 'react'
import KanbanList from './components/KanbanList/KanbanList.js'
import { connect } from 'react-redux'
import ActionButton from "./components/ActionButton/ActionButton.js"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { sort } from "./actions"

import "./App.sass"

class App extends Component {
  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result

    if(!destination) {
      return
    }

    this.props.dispatch(sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type
    ))


  }

  render() {

    const { lists } = this.props

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="App">
          <div className="wrapper">
            <h2>Kanban board</h2>
            <Droppable droppableId="all-lists" direction="horizontal" type="list">
              {provided => (
                <div className="lists-container" {...provided.draggablePros} ref={provided.innerRef}>
                { lists.map((list, index) => (
                  <KanbanList 
                  key={list.id}
                  listID = {list.id}
                  title={list.title}
                  cards={list.cards}
                  index={index} />)
                )}
                {provided.placeholder}
                <ActionButton list />
              </div>
              )}
            </Droppable>
            
          </div>
        </div>
      </DragDropContext>
    )
  }

}

const mapStateToProps = state => ({
  lists: state.lists
})

export default connect(mapStateToProps)(App);
