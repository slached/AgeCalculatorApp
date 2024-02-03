import './style/global.css'
import iconArrow from './static-images/icon-arrow.svg'
import {useEffect, useState} from "react";

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

    const [yearDigits, setYearDigits] = useState("- -")
    const [monthDigits, setMonthDigits] = useState("- -")
    const [dayDigits, setDayDigits] = useState("- -")


    const validateDate = require('validate-date')

    useEffect(() => {

        if (isThereError) {
            setBorderColor("1px solid #dc2626")
            setLabelColor("#dc2626")
        }
        //no error condition
        else {
            setBorderColor("1px solid rgba(71, 85, 105, 0.25)")
            setLabelColor("hsl(0, 1%, 44%)")
        }


    }, [isThereError]);

    const submitCheck = (e) => {

        let error = 0

        if (dayInput.length === 0) {
            setErrorCodeOfDay("This field is required")
            setIsThereError(true)
            error = 0
        } else if (dayInput > 31) {
            setErrorCodeOfDay("Must be a valid day")
            setIsThereError(true)
            error = 0
        } else {
            setErrorCodeOfDay("")
            error++
        }

        if (monthInput.length === 0) {
            setErrorCodeOfMonth("This field is required")
            setIsThereError(true)
            error = 0

        } else if (monthInput > 12) {
            setErrorCodeOfMonth("Must be a valid month")
            setIsThereError(true)
            error = 0

        } else {
            setErrorCodeOfMonth("")
            error++
        }


        if (yearInput.length === 0) {
            setErrorCodeOfYear("This field is required")
            setIsThereError(true)
            error = 0

        } else if (yearInput > 2024) {
            setErrorCodeOfYear("Must be in the past")
            setIsThereError(true)
            error = 0

        } else {
            setErrorCodeOfYear("")
            error++

        }


        if (error === 3) {
            let day = 0
            let month = 0

            if (dayInput.length === 1) {
                setDayInput(`0${dayInput}`)
                day = `0${dayInput}`
            } else day = dayInput
            if (monthInput.length === 1) {
                setMonthInput(`0${monthInput}`)
                month = `0${monthInput}`
            } else month = monthInput

            if (validateDate(`${month}/${day}/${yearInput}`) === "Invalid Date") setErrorCodeOfDay("Must be a valid date")
            //no error condition
            else {

                let yearCal = 0
                let monthCal = 0
                let dayCal

                setIsThereError(false)
                let dateDifferenceAsDay = Math.abs(new Date(parseInt(yearInput), parseInt(month) - 1, parseInt(day)) - new Date()) / 86400000;

                while (dateDifferenceAsDay >= 365.25) {
                    dateDifferenceAsDay -= 365.25
                    yearCal++
                }
                while (dateDifferenceAsDay >= 30) {
                    dateDifferenceAsDay -= 30
                    monthCal++
                }
                dayCal = Math.floor(dateDifferenceAsDay)

                setYearDigits(yearCal.toString())
                setMonthDigits(monthCal.toString())
                setDayDigits(dayCal.toString())
            }
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
                    borderRadius: "1.5rem 1.5rem 170px 1.5rem"
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
                    <button type={"submit"} onClick={submitCheck} id={"clicker"} className={"rounded-full p-4"}>
                        <img className={"w-8"} alt={"btn"} src={iconArrow}/>
                    </button>
                </div>
                {/*Below age section*/}
                <div className={"flex flex-col gap-y-3"}>
                    <div className={"flex gap-x-3 text-6xl font-extrabold italic"}>
                        <div style={{color: "hsl(259, 100%, 65%)"}}>{yearDigits}</div>
                        <div>years</div>
                    </div>
                    <div className={"flex gap-x-3 text-6xl font-extrabold italic"}>
                        <div style={{color: "hsl(259, 100%, 65%)"}}>{monthDigits}</div>
                        <div>months</div>
                    </div>
                    <div className={"flex gap-x-3 text-6xl font-extrabold italic"}>
                        <div style={{color: "hsl(259, 100%, 65%)"}}>{dayDigits}</div>
                        <div>days</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

}