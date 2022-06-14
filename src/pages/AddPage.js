import React, { useState, useEffect } from 'react';
import { Check } from 'react-bootstrap-icons';
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

    const Submit = (event) => {
        var listArray = list.concat({ hotel: event, rating: 0.0, time: parseFloat(Date.now() / 1000).toFixed(0) })
        setList(list.concat({ hotel: event, rating: 0.0, time: parseFloat(Date.now() / 1000).toFixed(0) }));
        isAdd(true);

        var str = "[";
        for (let i = 0; i < listArray.length; i++) {
            str = str + '{"hotel":"' + listArray[i].hotel + '",' + '"rating":"' + listArray[i].rating + '",' + '"time":"' + listArray[i].rating + '"}'
            if (i == listArray.length - 1) {
                str = str + "]"
            } else {
                str = str + ","
            }
        }
        window.localStorage.setItem("hotelData",str)
    }

    return (
        <div className='header'>
            <p className='input-label'>Otel Adı</p>
            <input className='input-text' onChange={(event) => { setValue(event.target.value) }} />
            <div className='button-area'>
                <button className='submit-add' style={add ? { backgroundColor: "#63cd25" } : {}} onClick={() => { Submit() }}>
                    {add ? <Check className='check-icon' /> : null}
                    {add ? "EKLENDİ" : "EKLE"}
                </button>
            </div>
        </div>
    )
}
export default AddPage