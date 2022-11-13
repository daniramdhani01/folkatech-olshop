import React from "react";
import { Collapse } from "react-bootstrap";

function CheckboxGroup(props:any) {
    const {show, setShow, label, data} = props
  const btnCss = `w-100 py-2 px-4 border-0 border-bottom d-flex justify-content-between align-items-center text-muted fw-bold`;

  return (
    <div className="mb-2">
      <button className={btnCss} onClick={() => setShow((prev:any) => !prev)} >
        {label} <i className="fa fa-angle-up fa-lg"></i>
      </button>
      <Collapse in={show} className="text-muted">
        <div id="example-collapse-text">
          {data.map((el:any, i:number) => (
            <label className="d-flex justify-content-between px-4" key={i}>
              <div>
                <input type="checkbox" className="me-2" />
                {el.name}
              </div>
              ({el.count})
            </label>
          ))}
        </div>
      </Collapse>
    </div>
  );
}

export default CheckboxGroup;
