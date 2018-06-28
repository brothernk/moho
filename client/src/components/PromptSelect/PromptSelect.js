import React, { Component } from "react";

class PromptSelect extends Component {

    state = {
        theme: "",
        category: ""
    }

    selectedTheme = (event) => {

        let divTarget = event.target
        let theme = divTarget.getAttribute('id')
        let categoryString = divTarget.getAttribute('data')
        let categoryArray = categoryString.split(',')
        let selectedCategory = categoryArray[Math.floor(Math.random() * categoryArray.length)]

        let selectedObject = {
            "theme": theme,
            "category": selectedCategory
        }
        
        this.props.socket.emit('categorytheme selected', selectedObject)
    }

    render() {
        return (
            <div onClick={this.selectedTheme} className="promptSelect-component"> 
                <h5 style={{background:this.props.color}} className="prompt-card" id={this.props.theme} data={this.props.categories}>
                    <i className={this.props.icon}></i>{this.props.theme}
                </h5>
            </div>
        )
    }
}

export default PromptSelect;