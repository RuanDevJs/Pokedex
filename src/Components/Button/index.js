import React from "react";
import "./style.css";

export default function Button({onFetchMore}) {
    return <button className="fs-24 fw-700 onFetchMore" onClick={onFetchMore}>+</button>;
}
