import React from "react"
import { HuLogo } from "../../../assets/huIcons/huIcons"
import { zeroStringIfNullish } from "../../../helpers"
import "./dialogSection.css"

const BorrowRateSection = (props) => {
    return (
        <div className="dialog-section">
            <div className="dialog-section-title">
                Borrow Rate
            </div>
            <div className="dialog-section-content">
                <div className="logo-holder">
                    <img className="rounded-circle"
                        style={{ width: "20px", height: "20px", margin: "0px 0px 0px 0px" }}
                        src={props.market?.logoSource}
                    alt=""/>
                </div>
                <div className="fill">Borrow APY</div>
                <div className="dialog-section-content-value" style={{ margin: "0px 0px 0px 0px" }}>
                    {`${props.market?.borrowApy
                        ?.times(100)
                        .toFixed(2)}%`}
                </div>
            </div>
            <div className="dialog-section-content">
                <div className="logo-holder">
                    <HuLogo darkMode={props.darkMode} size={"20px"}/>
                    </div>
                <div className="fill">PCT APY</div>
                <div className="dialog-section-content-value" style={{ margin: "0px 0px 0px 0px" }}>
                    {`${zeroStringIfNullish(
                        props.market?.borrowPctApy?.times(100).toFixed(2),2)}%`}
                </div>
            </div>
        </div>
    )
}

export default BorrowRateSection