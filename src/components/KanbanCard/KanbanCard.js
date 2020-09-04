import React from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Draggable } from 'react-beautiful-dnd'

import './KanbanCard.sass'

const KanbanCard = ({ text, id, index }) => {
    return (
        <Draggable draggableId={String(id)} index={index}>
            {provided => (
                <div className="card-container"
                    ref={provided.innerRef}
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                >
                    <Card className="card">
                        <CardContent>
                            <Typography gutterBottom>{text}</Typography>
                        </CardContent>
                    </Card>
                </div>
            )}
            
        </Draggable>
    )
}

export default KanbanCard