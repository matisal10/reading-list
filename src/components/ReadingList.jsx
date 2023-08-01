import { useState, useEffect } from 'react';
import api from '../books.json';
import { CloseButton } from '@chakra-ui/react'


const ReadingList = ({ searchValue, onAddBook }) => {
    const [arrayBooks, setArrayBooks] = useState([]);

    useEffect(() => {
        if (searchValue.trim() !== '') {
            const foundBook = api.library.find(
                (book) => book.book.title.trim().toLowerCase() === searchValue.trim().toLowerCase()
            );
            if (foundBook && !arrayBooks.some((book) => book.book.title === foundBook.book.title)) {
                setArrayBooks([...arrayBooks, foundBook]);
            }
        } else {
            setArrayBooks([]);
        }
    }, [searchValue, arrayBooks]);


    const deleteBook = (title) => {
        const updatedArrayBooks = arrayBooks.filter((book) => book.book.title !== title);
        setArrayBooks(updatedArrayBooks);
    }

    return (
        <div className='containerReading'>
            <h1>Lista de lectura</h1>
            {arrayBooks ? (
                <div className='containerList'>
                    {
                        arrayBooks.map((b, i) => (
                            <div key={i} style={{ padding: "10px 5px 5px 5px" }}>
                                <div className='containerIcon'>
                                    <CloseButton size='sm' onClick={() => deleteBook(b.book.title)} />
                                </div>

                                <img src={b.book.cover} alt={b.book.title} width={120} style={{ height: '160px' }} />
                            </div>
                        ))
                    }
                </div>
            ) : (
                <p>No se encontró ningún libro con el título {searchValue}</p>
            )}
        </div>
    );
};



export default ReadingList;
