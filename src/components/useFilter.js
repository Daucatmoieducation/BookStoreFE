import { useState, useEffect } from 'react';

const useFilter = (books) => {
    const [categories, reCate] = useState([]);
    const [sellers, reSell] = useState([]);

    useEffect(() => {
        let seenCat = new Set();
        let seenSeller = new Set();

        books.forEach(book => {
            if (book.categories && book.categories.name) {
                seenCat.add(book.categories.name);
            }
            if (book.current_seller && book.current_seller.name) {
                seenSeller.add(book.current_seller.name);
            }
        });

        reCate(Array.from(seenCat));
        reSell(Array.from(seenSeller));
    }, [books]);

    return { categories, sellers };
};

export default useFilter;