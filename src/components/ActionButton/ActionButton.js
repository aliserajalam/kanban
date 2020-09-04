import React from 'react'
import Textarea from 'react-textarea-autosize'

import "./ActionButton.sass"
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon';

import { connect } from "react-redux"
import { addList, addCard } from "../../actions"


class ActionButton extends React.Component {

    state = {
        formOpen: false,
        text: ""
    }

    openForm = () => { 
        this.setState({
            formOpen: true
        })
    }

    closeForm = (e) => {
        this.setState({
            formOpen: false
        })
    }

    handleInputChange = e => {
        this.setState({
            text: e.target.value
        })
    }

    handleAddList = () => {
        const { dispatch } = this.props
        const { text } = this.state

        if (text) {
            this.setState({
                text: ""
            })
            dispatch(addList(text))
        }

        return
    }

    handleAddCard = () => {
        const { dispatch, listID } = this.props
        const { text } = this.state

        if (text) {
            this.setState({
                text: ""
            })
            dispatch(addCard(listID, text))
        }
    }

    renderAddButton = () => {
        const { list } = this.props

        const buttonType = list ? "list-button action" : "card-button action"
        const buttonText = list ? "Add another list" : "Add another card"
    

        return (
            <div onClick = {this.openForm} className={buttonType}>
                <Icon className="add">add</Icon>
                <p>{buttonText}</p>
            </div>
        )
    }

    renderForm = () => {

        const { list } = this.props
        const placeholderText = list 
        ? "Enter list title..."
        : "Enter a title for this card..."

        const buttonTitle = list
        ? "Add List"
        : "Add Card"

        return (
            <div>
            <Card className="form-card">
                <Textarea
                className="form-textarea" 
                placeholder={placeholderText}
                autoFocus
                onBlur={this.closeForm}
                value={this.state.text}
                onChange={this.handleInputChange} />
            </Card>
            <div className="button-group">
                <Button onMouseDown={ list ? this.handleAddList : this.handleAddCard } variant="contained" className="add-button"style={{
                    color: "white",
                    backgroundColor: "#5AAC44"
                }}>{buttonTitle}</Button>
                <Icon className="close">close</Icon>
            </div>
            </div>
        )
    }

    render() {
        return this.state.formOpen ? this.renderForm() :  this.renderAddButton()
    }
}

export default connect()(ActionButton);