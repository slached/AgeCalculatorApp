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

    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [isMobile, setIsMobile] = useState(false)

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

    useEffect(() => {

        window.addEventListener('resize', () => {
            window.innerWidth > 640 ? setIsMobile(false) : setIsMobile(true)
            setScreenWidth(window.innerWidth)
        })

    }, [screenWidth])

    const submitCheck = () => {

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
            let day, month

            if (dayInput.length === 1) {
                setDayInput(`0${dayInput}`)
                day = `0${dayInput}`
            } else day = dayInput
            if (monthInput.length === 1) {
                setMonthInput(`0${monthInput}`)
                month = `0${monthInput}`
            } else month = monthInput

            if (validateDate(`${month}/${day}/${yearInput}`) === "Invalid Date") {
                setErrorCodeOfDay("Must be a valid date")
                setIsThereError(true)
            }
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
        <div className={"flex items-center justify-center min-h-screen bg-grey-background"}>
            {/*Main Container*/}
            <div
                style={{
                    borderRadius: "1.5rem 1.5rem 120px 1.5rem"

                }}
                className={"flex flex-col gap-y-5 bg-white px-2 py-8 sm:px-8 sm:gap-y-1 font-body"}>

                {/*Upper input section*/}
                <div className={"flex gap-x-3 justify-center sm:justify-normal"}>
                    <div className={"flex flex-col max-w-24 sm:max-w-32"}>
                        <label style={{color: labelColor}} className={"tracking-widest text-sm font-semibold mb-1"}
                               htmlFor={"day"}>DAY</label>
                        <input
                            style={{
                                border: borderColor
                            }}
                            className={"border text-2xl sm:text-3xl pl-2 sm:pl-3 py-1 rounded focus:outline-none focus:ring-1 focus:ring-purple-500 font-semibold"}
                            placeholder={"DD"}
                            type={"text"}
                            id={"day"}
                            value={dayInput}
                            onChange={inputChangeListener}
                            maxLength={2}/>
                        <div className={"text-xs text-red-600 italic mt-1"}>{errorCodeOfDay}</div>

                    </div>
                    <div className={"flex flex-col max-w-24 sm:max-w-32"}>
                        <label style={{color: labelColor}} className={"tracking-widest text-sm font-semibold mb-1"}
                               htmlFor={"month"}>MONTH</label>
                        <input
                            style={{
                                border: borderColor
                            }}
                            className={"border text-2xl sm:text-3xl pl-2 sm:pl-3 py-1 rounded focus:outline-none focus:ring-1 focus:ring-purple-500 font-semibold"}
                            placeholder={"MM"} type={"text"}
                            id={"month"}
                            value={monthInput}
                            onChange={inputChangeListener}
                            maxLength={2}/>

                        <div className={"text-xs text-red-600 italic mt-1"}>{errorCodeOfMonth}</div>
                    </div>
                    <div className={"flex flex-col max-w-24 sm:max-w-32"}>
                        <label style={{color: labelColor}} className={"tracking-widest text-sm font-semibold mb-1"}
                               htmlFor={"year"}>YEAR</label>
                        <input
                            style={{
                                border: borderColor
                            }}
                            className={"border text-2xl sm:text-3xl pl-2 sm:pl-3 py-1 rounded focus:outline-none focus:ring-1 focus:ring-purple-500 font-semibold"}
                            placeholder={"YYYY"} type={"text"}
                            id={"year"}
                            value={yearInput}
                            onChange={inputChangeListener}
                            maxLength={4}/>
                        <div className={"text-xs text-red-600 italic mt-1"}>{errorCodeOfYear}</div>

                    </div>
                </div>

                {/*Middle button section first for mobile second for 1440p*/}
                <div>
                    {isMobile ?
                        <div className={"flex items-center justify-center"}>
                            <hr style={{maxWidth: "150px"}} className={"grow"}/>
                            <button type={"submit"} onClick={submitCheck} id={"clicker"}
                                    className={"rounded-full p-4 bg-purple-button active:bg-black"}>
                                <img className={"w-8"} alt={"btn"} src={iconArrow}/>
                            </button>
                            <hr style={{maxWidth: "150px"}} className={"grow"}/>
                        </div>
                        :
                        <div className={"flex items-center"}>
                            <hr style={{minWidth: "500px"}} className={"grow"}/>
                            <button type={"submit"} onClick={submitCheck} id={"clicker"}
                                    className={"rounded-full p-4 mr-2 bg-purple-button active:bg-black"}>
                                <img className={"w-8"} alt={"btn"} src={iconArrow}/>
                            </button>
                        </div>}
                </div>

                {/*Below age section*/}
                <div className={"flex flex-col gap-y-2 my-4 ms-3"}>
                    <div className={"flex gap-x-3 text-6xl sm:text-7xl font-extrabold italic"}>
                        <div style={{color: "hsl(259, 100%, 65%)"}}>{yearDigits}</div>
                        <div>years</div>
                    </div>
                    <div className={"flex gap-x-3 text-6xl sm:text-7xl font-extrabold italic"}>
                        <div style={{color: "hsl(259, 100%, 65%)"}}>{monthDigits}</div>
                        <div>months</div>
                    </div>
                    <div className={"flex gap-x-3 text-6xl sm:text-7xl font-extrabold italic"}>
                        <div style={{color: "hsl(259, 100%, 65%)"}}>{dayDigits}</div>
                        <div>days</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

}