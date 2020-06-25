import React from 'react'
import { ButtonToolbar, Dropdown, DropdownButton } from 'react-bootstrap';

class Buttons extends React.Component {
    handleSelect = (evt) => {
          this.props.gridSize(evt);
    }
  
    render() {
        return (
            <div className="center">
                <ButtonToolbar>
                    <button className="btn btn-default" onClick={this.props.playButton}>
                        Start
                    </button>
                    <button className="btn btn-default" onClick={this.props.stopButton}>
                        Stop
                    </button>
                    <button className="btn btn-default" onClick={this.props.clear}>
                        Clear
                    </button>
                    <button className="btn btn-default" onClick={this.props.slow}>
                        Slow Speed
                    </button>
                    <button className="btn btn-default" onClick={this.props.normal}>
                        Normal Speed
                    </button>
                    <button className="btn btn-default" onClick={this.props.fast}>
                        Fast Speed
                    </button>
                    <button className="btn btn-default" onClick={this.props.reset}>
                        Generate Seed
                    </button>
                    <DropdownButton
                        title="Resize Grid"
                        id="size-menu"
                        onSelect={this.handleSelect}
                    >
                        <Dropdown onClick={this.props.gridSize} eventKey="1">30x30</Dropdown>
                        <Dropdown onClick={this.props.gridSize}eventKey="2">40x40</Dropdown>
                        <Dropdown onClick={this.props.gridSize} eventKey="3">50x50</Dropdown>
                    </DropdownButton>
                </ButtonToolbar>
            </div>
        )
    }
}

export default Buttons