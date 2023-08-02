import { useState, useEffect } from 'react'
import './App.css'
import api from "./books.json"
import { Select } from '@chakra-ui/react'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react'

import ReadingList from './components/ReadingList';

function App() {
  const [books, setBooks] = useState([])
  const [filterArray, setFilterArray] = useState([])
  const [reading, setReading] = useState(0)
  const [selectedBookTitle, setSelectedBookTitle] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedPages, setSelectedPages] = useState(30);
  const [maxPages, setMaxPages] = useState(0)
  const [minPages, setMinPages] = useState(0)
  const [disabledBooks, setDisabledBooks] = useState([]);

  useEffect(() => {
    setBooks(api.library)
    setFilterArray(api.library)
    maxAndMinPages()
  }, [])

  // const addBooks = (title) => {
  //   setSelectedBookTitle(title)
  //   setReading(reading + 1)
  // }

  const handleGenreFilter = (event) => {
    const selectedGenreValue = event.target.value;
    setSelectedGenre(selectedGenreValue);
    if (selectedGenreValue) {
      const filterArray = api.library.filter(
        (book) => book.book.genre.trim().toLowerCase() === selectedGenreValue.trim().toLowerCase()
      );
      setBooks(filterArray)
      setFilterArray(filterArray);
      maxAndMinPages()
    } else {
      setBooks(api.library)
      setFilterArray(api.library);
    }
  };

  const maxAndMinPages = () => {
    let max = 0
    let min = 10000
    books.map((book) => {
      if (book.book.pages > max) {
        max = book.book.pages
      }
      else if (book.book.pages < min) {
        min = book.book.pages
      }
    })
    setMaxPages(max)
    setMinPages(min)
  }


  const handlePagesFilter = (value) => {
    setSelectedPages(value);
    const preArray = books
    const filterArray = preArray.filter((book) => book.book.pages <= value);
    setFilterArray(filterArray);
  };

  const handleRemoveFromReadingList = (title) => {
    setReading(reading - 1);
    setDisabledBooks(disabledBooks.filter((bookTitle) => bookTitle !== title));
  };

  const handleAddToReadingList = (book) => {
    setSelectedBookTitle(book.book.title);
    if (!disabledBooks.includes(book.book.title)) {
      setReading(reading + 1);
      setDisabledBooks([...disabledBooks, book.book.title]);
    }
  };

  return (
    <div className='container'>
      <div>
        <div style={{ paddingLeft: "10px" }}>
          <h1>{books.length - disabledBooks.length} Libros disponibles</h1>
          {
            reading > 0 ?
              <h3 style={{ paddingLeft: "10px" }}>{reading} en lista de lectura</h3>
              :
              <></>
          }
        </div>

        <div className='filters'>
          <div style={{ paddingRight: "80px" }}>
            <span>Filtro por páginas</span>
            <Slider
              aria-label='slider-ex-1'
              defaultValue={1000}
              min={minPages} max={1000} step={50}
              onChange={(value) => handlePagesFilter(value)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </div>
          <div>
            <span>Filtro por Género</span>
            <Select
              placeholder='Select option'
              size={'sm'}
              onChange={handleGenreFilter}
              color='white'
            >
              <option value=''>Todos</option>
              <option value='Fantasía'>Fantasía</option>
              <option value='Ciencia ficción'>Ciencia ficción</option>
              <option value='Terror'>Terror</option>
            </Select>
          </div>
        </div>
        <div className="containerBooks">
          {filterArray.map((book, i) => (
            <div
              key={i}
              className={`cbooks ${disabledBooks.includes(book.book.title) ? 'disabled' : ''}`}
              onClick={() => handleAddToReadingList(book)}
            >
              <img className="book" src={book.book.cover} width={200} style={{ height: '290px' }} />
            </div>
          ))}
        </div>
      </div>

      {reading > 0 && (
        <ReadingList
          searchValue={selectedBookTitle}
          onAddBook={handleAddToReadingList}
          onRemoveBook={handleRemoveFromReadingList}
          disabledBooks={disabledBooks}
        />
      )}
    </div>
  )
}

export default App
