import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import "./EditButton.css"

export default function EditButton() {
  return (<button className="button">
    <FontAwesomeIcon icon={faPen} size="xs" />
  </button>);
}
