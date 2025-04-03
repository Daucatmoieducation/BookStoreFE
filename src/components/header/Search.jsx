import "../../App.css"
import React, { useState } from 'react';

function Search({onSearch}){
    const [searchTerm, setSearchTerm] = useState('');
 
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <form className="w-auto" role="search">
            <div className="input-group d-flex align-items-center" role="group">
                <div className="bg-white pe-1 ps-4 border border-end-0 input-group-text" 
                    id="btnGroupAddon" >
                    <i className="bi bi-search text-secondary" />
                </div>
                <input
                    className="form-control ps-1 border border-start-0 shadow-none"
                    type="search"
                    placeholder="Freeship đến 30K"
                    aria-label="Search"
                    onChange={handleSearchChange} 
                    value={searchTerm}
                    />
                <button 
                    className="btn btn-outline-primary border border-start-0 d-md-block d-none"  
                    type="submit">
                    Tìm Kiếm
                </button>
            </div>
        </form>
    )
}

export default Search