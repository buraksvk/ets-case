import React, { useState, useEffect } from 'react';
import { ArrowDownUp, ChevronDown, X, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import mapper from '../helpers/mapper';
import pageCalculator from '../helpers/pageCalculator';
import Popup from 'reactjs-popup';

function ListPage() {
    const [list, setList] = useState([]);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [pagesArray, setPagesArray] = useState([])
    const [filterBy, setFilterBy] = useState("Sıralama");

    useEffect(() => {
        if (window.localStorage.getItem("hotelData")) {
            setList(JSON.parse(window.localStorage.getItem("hotelData")).sort((a, b) => parseFloat(b.time) - parseFloat(a.time)));
        }
        else {
            setList([]);
            window.localStorage.setItem("hotelData", "[]")
        }
    }, [])

    useEffect(() => {
        setPagesArray(pageCalculator(list.length));

        if(filterBy === "Puan (Artan)"){
            setList(list.sort((a, b) => {
                if(parseFloat(b.rating) !== parseFloat(a.rating)){
                    return parseFloat(b.rating) - parseFloat(a.rating)
                }
                else{
                    return parseFloat(b.lastVote) - parseFloat(a.lastVote)
                }
            }));
        }
        else if(filterBy === "Puan (Azalan)"){
            setList(list.sort((a, b) => {
                if(parseFloat(a.rating) !== parseFloat(b.rating)){
                    return parseFloat(a.rating) - parseFloat(b.rating)
                }
                else{
                    return parseFloat(b.lastVote) - parseFloat(a.lastVote)
                }
            }));
        }

    }, [list])

    const upRate = (index) => {
        let arr = list[index];
        if (arr.rating <= 9.9) {
            arr.rating = (parseFloat(parseFloat(arr.rating) + 0.1).toFixed(1))
            arr.lastVote = (parseFloat(Date.now() / 1000).toFixed(0))
            setList(list.filter(function (item) {
                return item.hotel !== arr.hotel
            }))
            setList([...list]);
            window.localStorage.setItem("hotelData", mapper(list))
        }

    }
    const downRate = (index) => {
        let arr = list[index];
        if (arr.rating >= 0.1) {
            arr.rating = (parseFloat(parseFloat(arr.rating) - 0.1).toFixed(1))
            arr.lastVote = (parseFloat(Date.now() / 1000).toFixed(0))
            setList(list.filter(function (item) {
                return item.hotel !== arr.hotel
            }))
            setList([...list]);
            window.localStorage.setItem("hotelData", mapper(list))
        }
    }

    const removeHotel = (index) => {
        setList(list.filter(function (item) {
            return item.hotel !== list[index].hotel
        }))
        window.localStorage.setItem("hotelData", mapper(
            list.filter(function (item) {
                return item.hotel !== list[index].hotel
            })
        ))
    }

    const selectFilter = (type) => {
        setFilterBy(type);
        if (type === "Puan (Artan)") {
            setList(list.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)));
        } else if (type === "Puan (Azalan)") {
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
                    <span style={{ marginLeft: "7px" }}>{filterBy}</span>
                </span>
                <span>
                    <ChevronDown color="#aaa" className='icon' />
                </span>
            </div>
            {
                open ?
                    <div className='selection-box'>
                        <div className='option' style={filterBy === "up" ? { backgroundColor: "#4894fd" } : {}} onClick={() => { selectFilter("Puan (Artan)") }}>{"Puan (Artan)"}</div>
                        <div className='option' style={filterBy === "down" ? { backgroundColor: "#4894fd" } : {}} onClick={() => { selectFilter("Puan (Azalan)") }}>{"Puan (Azalan)"}</div>
                    </div>
                    : null
            }
            <div className='hotel-list'>
                {
                    list.map((item, index) => {
                        if (index >= ((page - 1) * 5) && index < (page * 5)) {
                            return (
                                <div className='hotel-box' key={"hotel-" + index}>
                                    <div className='row'>
                                        <div className='hotel-image'>
                                            <img className="image" src="image/hotel-image.png" alt="hotel-content" />
                                        </div>
                                        <div className='hotel-content-col'>
                                            <div style={{ position: "relative" }}>
                                                <Popup
                                                    trigger={<button className='button-remove'><X style={{ marginLeft: "-3px", marginTop: "1px" }} /></button>}
                                                    modal
                                                    
                                                >
                                                    {close => (
                                                        <div className="modal">
                                                            <button className="close" onClick={close}>
                                                                &times;
                                                            </button>
                                                            <div className="header"> Oteli Sil </div>
                                                            <div className="content">
                                                                {' '}
                                                                <b>{item.hotel}</b>’i silmek istediğinizden
                                                                emin misiniz?
                                                            </div>
                                                            <div className="actions">
                                                                <button className="modal-delete-button" onClick={() => {removeHotel(index); close()}}>OTELİ SİL</button>
                                                                <button className="modal-cancel-button" onClick={() => {close()}}>VAZGEÇ</button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Popup>
                                            </div>
                                            <p className='hotel-title'>{item.hotel}</p>
                                            <div className="hotel-rating-box">
                                                <p className='hotel-rating'>{parseFloat(item.rating).toFixed(1)} Puan
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
                        }

                    })
                }
            </div>
            <div className='pagination'>
                <button className='page-chevron' onClick={() => { page > 1 ? setPage(page - 1) : setPage(page) }}><ChevronLeft /></button>
                {
                    pagesArray.map((item, index) => {
                        return <button className='page-button' key={"page-" + index} style={page === index + 1 ? { fontWeight: "bold" } : {}} onClick={() => { setPage(item) }}>{item}</button>
                    })
                }
                <button className='page-chevron' onClick={() => { page < (pagesArray.length) ? setPage(page + 1) : setPage(page) }}><ChevronRight /></button>
            </div>
        </div >
    )
}
export default ListPage