import React from 'react'
import { Button } from 'react-bootstrap';

export default function Navbar(props) {

  if (props.user){

  } else {

    return (
    <div className="nav">
         <Button variant="primary" onClick={props.handleShow}>
            Login
          </Button>
    </div>
    )
  }

}