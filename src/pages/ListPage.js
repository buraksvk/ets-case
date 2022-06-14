import React, { useState, useEffect } from 'react';
import { ArrowDownUp, ChevronDown } from 'react-bootstrap-icons';
function ListPage() {
    const [list, setList] = useState([]);
    const [open, setOpen] = useState(false)
    const [filterBy, setFilterBy] = useState("up")

    useEffect(() => {
        if (window.localStorage.getItem("hotelData")) {
            setList(JSON.parse(window.localStorage.getItem("hotelData")).sort((a, b) => parseFloat(b.time) - parseFloat(a.time)));
        }
        else {
            setList([]);
            window.localStorage.setItem("hotelData", "[]")
        }
    }, [])

    const upRate = (index) => {
        let arr = list[index];
        if (arr.rating <= 9.9) {
            arr.rating = (parseFloat(parseFloat(arr.rating) + 0.1).toFixed(1))
            setList(list.filter(function (item) {
                return item.hotel !== arr.hotel
            }))
            setList([...list]);
        }

    }
    const downRate = (index) => {
        let arr = list[index];
        if (arr.rating >= 0.1) {
            arr.rating = (parseFloat(parseFloat(arr.rating) - 0.1).toFixed(1))
            setList(list.filter(function (item) {
                return item.hotel !== arr.hotel
            }))
            setList([...list]);
        }
    }

    const selectFilter = (type) => {
        setFilterBy(type);
        if (type === "up") {
            setList(list.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)));
        } else if (type === "down") {
            setList(list.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating)));
        }
        setOpen(false);
    }



    return (
        <div className='header'>
            <div className='row'>
                <a className='add-hotel-button' href='/add'>+</a>
                <h1 className='title'>OTEL EKLE</h1>
            </div>
            <div className='filter-button space-between' onClick={() => { setOpen(!open) }}>
                <span>
                    <ArrowDownUp className='icon' />
                    <span style={{ marginLeft: "7px" }}>Sıralama</span>
                </span>
                <span>
                    <ChevronDown color="#aaa" className='icon' />
                </span>
            </div>
            {
                open ?
                    <div className='selection-box'>
                        <div className='option' style={filterBy === "up" ? { backgroundColor: "#4894fd" } : {}} onClick={() => { selectFilter("up") }}>{"Puan (Artan)"}</div>
                        <div className='option' style={filterBy === "down" ? { backgroundColor: "#4894fd" } : {}} onClick={() => { selectFilter("down") }}>{"Puan (Azalan)"}</div>
                    </div>
                    : null
            }
            <div className='hotel-list'>
                {
                    list.map((item, index) => {
                        return (
                            <div className='hotel-box' key={"hotel-" + index}>
                                <div className='row'>
                                    <div className='hotel-image'>
                                        <img className="image" src="image/hotel-image.png" alt="hotel-content" />
                                    </div>
                                    <div className='hotel-content-col'>
                                        <p className='hotel-title'>{item.hotel}</p>
                                        <div className="hotel-rating-box">
                                            <p className='hotel-rating'>{item.rating} Puan
                                            </p>
                                        </div>
                                        <div className='hotel-rating-button'>
                                            <button onClick={() => { upRate(index) }}>puan artır</button>
                                            <button onClick={() => { downRate(index) }}>puan azalt</button>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        )
                    })
                }
            </div>
        </div>
    )
}
export default ListPage