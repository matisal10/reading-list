import { useState, useEffect } from 'react';
import api from '../books.json';

const ReadingList = ({ searchValue, onAddBook }) => {
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        if (searchValue.trim() !== '') {
            const foundBook = api.library.find(
                (book) => book.book.title.trim().toLowerCase() === searchValue.trim().toLowerCase()
            );
            setSearchResult([...searchResult, foundBook] || null);
        } else {
            setSearchResult(null);
        }
    }, [searchValue]);

    return (
        <div className='containerReading'>
            {searchResult ? (
                <div className='containerList'>
                {
                    searchResult.map((b,i)=>(
                        <div key={i} style={{padding:"5px"}}>
                            <img src={b.book.cover} alt={b.book.title} width={100} />
                        </div>
                    ))
                }
                    {/* <img src={searchResult.book.cover} alt={searchResult.book.title} width={200} /> */}
                </div>
            ) : (
                <p>No se encontró ningún libro con el título {searchValue}</p>
            )}
        </div>
    );
};



export default ReadingList;
