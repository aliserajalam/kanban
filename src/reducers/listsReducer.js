import { CONSTANTS } from "../actions"

let listID = 3
let cardID = 7

const initialState = [
    {
        title: "To Do",
        id: `list-${0}`,
        cards: [
            {
                id: `card-${0}`,
                text: "Lorem Ipsum"
            },
            {
                id: `card-${1}`,
                text: "Test"
            },
            {
                id: `card-${2}`,
                text: "Hello"
            }
        ]
    },
    {
        title: "In Progress",
        id: `list-${1}`,
        cards: [
            {
                id: `card-${3}`,
                text: "Lorem Ipsum"
            },
            {
                id: `card-${4}`,
                text: "Test"
            }
        ]
    },
    {
        title: "Completed",
        id: `list-${2}`,
        cards: [
            {
                id: `card-${5}`,
                text: "Lorem Ipsum"
            },
            {
                id: `card-${6}`,
                text: "Test"
            }
        ]
    }
]

const listsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_LIST:
            const newList = {
                title: action.payload,
                id: `list-${listID}`,
                cards: []
            }
            listID += 1
            return [...state, newList]
        case CONSTANTS.ADD_CARD: {
            const newCard = {
                text: action.payload.text,
                id: `card-${cardID}`
            }
            cardID += 1

            const newState = state.map(list => {
                if (list.id === action.payload.listID) {
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    }
                } else {
                    return list
                }
            })

            return newState
        }
        
        case CONSTANTS.DRAG_HAPPENED:
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId,
                type
            } = action.payload
            const newState = [...state]

            // Dragging lists
            if(type === "list") {
                const list = newState.splice(droppableIndexStart, 1)
                newState.splice(droppableIndexEnd, 0, ...list)
                return newState
            }

            // In the same list
            if(droppableIdStart === droppableIdEnd) {
                const list = state.find(list => droppableIdStart === list.id)
                const card = list.cards.splice(droppableIndexStart, 1)
                list.cards.splice(droppableIndexEnd, 0, ...card)
            }

            // Different list
            if (droppableIdStart !== droppableIdEnd) {
                // find the list where the drag started
                const listStart = state.find(list => droppableIdStart === list.id)

                // pull out the card from the list
                const card = listStart.cards.splice(droppableIndexStart, 1)

                // find the list where the drag ended
                const listEnd = state.find(list => droppableIdEnd === list.id)

                // put the card in the new list
                listEnd.cards.splice(droppableIndexEnd, 0, ...card)
            }

            return newState
        default:
            return state
    }
}

export default listsReducer