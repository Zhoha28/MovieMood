import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";


const Search = ({searchTerm, setSearchTerm}) => {
    return (
        <div className="search">
            <div>
            <FontAwesomeIcon icon={faSearch} />
                <input type='text' placeholder='Search through thousands of movies...'
                       onChange={(event) => setSearchTerm(event.target.value)}
                />
            </div>
        </div>
    );
};

export default Search;