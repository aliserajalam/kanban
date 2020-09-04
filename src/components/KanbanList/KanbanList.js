import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import KanbanCard from '../KanbanCard/KanbanCard.js'
import ActionButton from '../ActionButton/ActionButton.js'

import "./KanbanList.sass"


const KanbanList = ({ title, cards, listID, index }) => {
    return (
        <Draggable draggableId={String(listID)} index={index}>
            {provided => (
                <div className="list-container"
                {...provided.draggableProps} 
                ref={provided.innerRef} 
                {...provided.dragHandleProps}
                >
                <Droppable droppableId={String(listID)}>
                {provided => (
                    <div {...provided.droppableProps} ref={provided.innerRef} >
                        <h3>{title}</h3>
                        { cards.map((card, index) => ( 
                            <KanbanCard key={card.id} index={index} text={card.text} id={card.id} />
                        ))}
                        {provided.placeholder}
                        <ActionButton listID={listID} />
                    </div>
                )}
                
                </Droppable>
             </div>
            )}
        </Draggable>
    )
}

export default KanbanList