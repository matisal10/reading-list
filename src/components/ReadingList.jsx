import { useState, useEffect } from 'react';
import api from '../books.json';
import { CloseButton } from '@chakra-ui/react'


const ReadingList = ({ searchValue, onAddBook, onRemoveBook, disabledBooks }) => {
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const initBooks = () => {
        const storedData = JSON.parse(localStorage.getItem('readingList'));
        return Array.isArray(storedData) ? storedData : [];
    };
    const [arrayBooks, setArrayBooks] = useState([]);

    useEffect(() => {
        const books = JSON.parse(localStorage.getItem('readingList'));
        const foundBooks = books.map((title) => {
            return api.library.find(
                (book) => book.book.title.trim().toLowerCase() === title.trim().toLowerCase()
            );
        })
        setArrayBooks(foundBooks);

        if (searchValue.trim() !== '') {
            const foundBook = api.library.find(
                (book) => book.book.title.trim().toLowerCase() === searchValue.trim().toLowerCase()
            );
            if (foundBook && !arrayBooks.some((book) => book.book.title === foundBook.book.title)) {
                setArrayBooks([...arrayBooks, foundBook]);
            }
        }
        
    },[searchValue]);

    // useEffect(() => {
    //     // Guardar datos en localStorage cuando la lista de lectura cambie
    //     localStorage.setItem('readingList', JSON.stringify(arrayBooks));
    // }, [arrayBooks]);

    

    const deleteBook = (title) => {
        const updatedArrayBooks = arrayBooks.filter((book) => book.book.title !== title);
        setArrayBooks(updatedArrayBooks);
        onRemoveBook(title);
        setShouldUpdate(!shouldUpdate);
    }


    return (
        <div className='containerReading'>
            <h1>Lista de lectura</h1>
            {arrayBooks.length > 0 ? (
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