import React, { useState, useEffect } from 'react';

function ListPage() {
    const [list, setList] = useState([{ hotel: "Voyage Hotel", rating: 9.7, time: 1655146561 }, { hotel: "Maxx Royal Hotel", rating: 8.3, time: 1655146606 }, { hotel: "Vogue Hotel", rating: 7.5, time: 1655147906 }]);

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

    function mapper(array) {
        var str = "[";
        for (let i = 0; i < array.length; i++) {
            str = str + '"' + array[i] + '"'
            if (i == array.length - 1) {
                str = str + "]"
            } else {
                str = str + ","
            }
        }
        return str
    }

    return (
        <div className='header'>
            <div className='row'>
                <button className='add-hotel-button'>+</button>
                <h1 className='title'>OTEL EKLE</h1>
            </div>
            <div className='filter-button'>
                Sıralama
            </div>

            {
                list.map((item, index) => {
                    return (
                        <div className='hotel-box' key={"hotel-" + index}>
                            <div className='row'>
                                <div className='hotel-image'>
                                    <img className="image" src="image/hotel-image.png" alt="hotel-image" />
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
    )
}
export default ListPage