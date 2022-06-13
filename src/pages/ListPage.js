import React, { useState, useEffect } from 'react';

function ListPage() {
    const [list, setList] = useState([{ hotel: "Voyage Hotel", score: 9.7, time: 1655146561 }, { hotel: "Maxx Royal Hotel", score: 8.3, time: 1655146606 }])
    return (
        <div>
            <h1>OTEL EKLE</h1>
        </div>
    )
}
export default ListPage