import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddPage from '../pages/AddPage';
import ListPage from '../pages/ListPage';


const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ListPage />} />
                    <Route path="/add" element={<AddPage />} />
                    <Route path="*" element={<ListPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};
export default Router;