import React, { useState, useEffect } from 'react';
import { Check } from 'react-bootstrap-icons';
import mapper from "../helpers/mapper"

function AddPage() {
    const [value, setValue] = useState("");
    const [add, isAdd] = useState(false)
    const [list, setList] = useState([]);

    useEffect(() => {
        if (window.localStorage.getItem("hotelData")) {
            setList(JSON.parse(window.localStorage.getItem("hotelData")));
        }
        else {
            setList([]);
            window.localStorage.setItem("hotelData", "[]")
        }
    }, [])

    const Submit = () => {
        var listArray = list.concat({ hotel: value, rating: 0.0, time: parseFloat(Date.now() / 1000).toFixed(0) });

        setList(list.concat({ hotel: value, rating: 0.0, time: parseFloat(Date.now() / 1000).toFixed(0) }));

        isAdd(true);

        window.localStorage.setItem("hotelData", mapper(listArray));
    }

    return (
        <div className='header'>
            <p className='input-label'>Otel Adı</p>
            <input className='input-text' onChange={(event) => { setValue(event.target.value) }} />
            <div className='button-area'>
                {
                    add ?
                        <button className='submit-success'>
                            <Check className='check-icon' />
                            <span className='success-text'>EKLENDİ</span>
                        </button>
                        :
                        <button className='submit-add' onClick={() => { Submit() }}>
                            EKLE
                        </button>
                }

            </div>
        </div>
    )
}
export default AddPage