import './style/global.css'
import iconArrow from './static-images/icon-arrow.svg'
import {useEffect, useRef, useState} from "react";

export default function AgeCalculator() {

    const [dayInput, setDayInput] = useState("")
    const [monthInput, setMonthInput] = useState("")
    const [yearInput, setYearInput] = useState("")

    const [errorCodeOfDay, setErrorCodeOfDay] = useState("")
    const [errorCodeOfMonth, setErrorCodeOfMonth] = useState("")
    const [errorCodeOfYear, setErrorCodeOfYear] = useState("")

    const [isThereError, setIsThereError] = useState(false)
    const [borderColor, setBorderColor] = useState("1px solid rgba(71, 85, 105, 0.25)")
    const [labelColor, setLabelColor] = useState("hsl(0, 1%, 44%)")

    const hasPageRendered = useRef(false)

    const validateDate = require('validate-date')
    useEffect(() => {

        if (hasPageRendered.current) {
            if (isThereError) {
                setBorderColor("1px solid #dc2626")
                setLabelColor("#dc2626")
            }
            //no error condition
            else {
                setBorderColor("1px solid rgba(71, 85, 105, 0.25)")
                setLabelColor("hsl(0, 1%, 44%)")
                validateDate(`${monthInput}/${dayInput}/${yearInput}`)
            }
        }
        hasPageRendered.current = true
        // eslint-disable-next-line
    }, [isThereError]);

    const submitCheck = (e) => {

        if (dayInput.length === 0) {
            setErrorCodeOfDay("This field is required")
            setIsThereError(true)
        } else if (dayInput > 31) {
            setErrorCodeOfDay("Must be a valid day")
            setIsThereError(true)
        } else {
            setErrorCodeOfDay("")
            setIsThereError(false)
        }

        if (monthInput.length === 0) {
            setErrorCodeOfMonth("This field is required")
            setIsThereError(true)
        } else if (monthInput > 12) {
            setErrorCodeOfMonth("Must be a valid month")
            setIsThereError(true)
        } else {
            setErrorCodeOfMonth("")
            setIsThereError(false)
        }


        if (yearInput.length === 0) {
            setErrorCodeOfYear("This field is required")
            setIsThereError(true)
        } else if (yearInput > 2024) {
            setErrorCodeOfYear("Must be in the past")
            setIsThereError(true)
        } else {
            setErrorCodeOfYear("")
            setIsThereError(false)
        }

    }

    const inputChangeListener = (e) => {

        switch (e.target.id) {
            case "day":
                setDayInput(e.target.value)
                break
            case "month":
                setMonthInput(e.target.value)
                break
            case "year":
                setYearInput(e.target.value)
                break
            default:
                break
        }
    }

    return <div>
        {/*Outer Centralizer*/}
        <div className={"flex items-center justify-center min-h-screen"}>
            {/*Main Structure*/}
            <div
                style={{
                    borderRadius: "1.5rem 1.5rem 200px 1.5rem"
                }}
                className={"flex flex-col gap-y-1 bg-white p-12 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl"}>
                {/*Upper input section*/}
                <div className={"flex gap-x-3"}>
                    <div className={"flex flex-col max-w-32 gap-y-3"}>
                        <label style={{color: labelColor}} className={"text-xs font-bold"}
                               htmlFor={"day"}>DAY</label>
                        <input
                            style={{
                                border: borderColor
                            }}
                            className={"border pl-3 py-1 leading-3 rounded focus:outline-none focus:ring-1 focus:ring-purple-500 font-semibold"}
                            placeholder={"DD"} type={"text"}
                            id={"day"}
                            value={dayInput}
                            onChange={inputChangeListener}
                            maxLength={2}/>
                        <div className={"text-xs text-red-600 italic"}>{errorCodeOfDay}</div>

                    </div>
                    <div className={"flex flex-col max-w-32  gap-y-3"}>
                        <label style={{color: labelColor}} className={"text-xs font-bold"}
                               htmlFor={"month"}>MONTH</label>
                        <input
                            style={{
                                border: borderColor
                            }}
                            className={"border pl-3 py-1 rounded focus:outline-none focus:ring-1 focus:ring-purple-500 font-semibold"}
                            placeholder={"MM"} type={"text"}
                            id={"month"}
                            value={monthInput}
                            onChange={inputChangeListener}
                            maxLength={2}/>

                        <div className={"text-xs text-red-600 italic"}>{errorCodeOfMonth}</div>
                    </div>
                    <div className={"flex flex-col max-w-32  gap-y-3"}>
                        <label style={{color: labelColor}} className={"text-xs font-bold"}
                               htmlFor={"year"}>YEAR</label>
                        <input
                            style={{
                                border: borderColor
                            }}
                            className={"border pl-3 py-1 rounded focus:outline-none focus:ring-1 focus:ring-purple-500 font-semibold"}
                            placeholder={"YYYY"} type={"text"}
                            id={"year"}
                            value={yearInput}
                            onChange={inputChangeListener}
                            maxLength={4}/>
                        <div className={"text-xs text-red-600 italic"}>{errorCodeOfYear}</div>

                    </div>
                </div>
                {/*Middle button section*/}
                <div className={"flex items-center"}>
                    <hr style={{minWidth: "450px"}} className={"grow"}/>
                    <button onClick={submitCheck} id={"clicker"} className={"rounded-full p-2"}>
                        <img alt={"btn"} src={iconArrow}/>
                    </button>
                </div>
                {/*Below age section*/}
                <div className={"flex flex-col gap-y-3"}>
                    <div className={"flex gap-x-3 text-6xl font-extrabold italic"}>
                        <div style={{color: "hsl(259, 100%, 65%)"}}>-</div>
                        <div style={{color: "hsl(259, 100%, 65%)"}}>-</div>
                        <div>years</div>
                    </div>
                    <div className={"flex gap-x-3 text-6xl font-extrabold italic"}>
                        <div style={{color: "hsl(259, 100%, 65%)"}}>-</div>
                        <div style={{color: "hsl(259, 100%, 65%)"}}>-</div>
                        <div>months</div>
                    </div>
                    <div className={"flex gap-x-3 text-6xl font-extrabold italic"}>
                        <div style={{color: "hsl(259, 100%, 65%)"}}>-</div>
                        <div style={{color: "hsl(259, 100%, 65%)"}}>-</div>
                        <div>days</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

}