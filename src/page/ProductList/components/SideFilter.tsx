import { Slider } from "@mui/material";
import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import { numberFormat } from "../../../utils/numberFormat";
import CheckboxGroup from "./CheckboxGroup";
import { origin, species, roast_level, tasted, process } from "./dataDummy";

function SideFilter(props: any) {
  const { range, setRange } = props;
  const [showOrigin, setShowOrigin] = useState(true);
  const [showSpecies, setShowSpecies] = useState(true);
  const [showRoast, setShowRoast] = useState(true);
  const [showTasted, setShowTasted] = useState(true);
  const [showProcessing, setShowProcessing] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const btnCss = `w-100 py-2 px-4 border-0 d-flex justify-content-between align-items-center bg-transparent text-muted fw-bold`;

  function valuetext(value: number) {
    return `${value}°C`;
  }
  return (
    <>
      <div className="mb-2">
        <button
          className={btnCss}
          onClick={() => setShowPrice((prev: any) => !prev)}
        >
          URUTKAN BERDASARKAN <i className="fa fa-angle-up fa-lg"></i>
        </button>
        <Collapse in={showPrice} className="text-muted">
          <div id="example-collapse-text px-4 text-muted">
            <div className="px-4 fw-bold">HARGA</div>
            <div className="px-4">
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={range}
                onChange={(e: any, n: any) => setRange(n)}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                min={0}
                max={3000000}
                //@ts-ignore
                color="error"
              />
            </div>
            <div className="px-4 fs-7 w-100 text-muted d-flex justify-content-between">
              <label className="p-0">
                Rp
                <input
                  className="ms-1"
                  style={{ width: "74%" }}
                  value={numberFormat(range[0])}
                  onChange={(e) => setRange((prev:any)=>[e.target.value, prev[1]])}
                  readOnly
                />
              </label>
              <span className="px-1">-</span>
              <label className="p-0">
                Rp
                <input
                  // type={"number"}
                  className="ms-1"
                  style={{ width: "74%" }}
                  value={numberFormat(range[1])}
                  onChange={(e) => setRange((prev:any)=>[ prev[0], e.target.value])}
                  readOnly
                />
              </label>
            </div>
          </div>
        </Collapse>
      </div>
      <CheckboxGroup
        show={showOrigin}
        setShow={setShowOrigin}
        label={"Origin"}
        data={origin}
      />
      <CheckboxGroup
        show={showSpecies}
        setShow={setShowSpecies}
        label={"Species"}
        data={species}
      />
      <CheckboxGroup
        show={showRoast}
        setShow={setShowRoast}
        label={"Roast Level"}
        data={roast_level}
      />
      <CheckboxGroup
        show={showTasted}
        setShow={setShowTasted}
        label={"Tasted"}
        data={tasted}
      />
      <CheckboxGroup
        show={showProcessing}
        setShow={setShowProcessing}
        label={"Processing"}
        data={process}
      />
    </>
  );
}

export default SideFilter;
