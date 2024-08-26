'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const HeaderSection = () => {
    const [searchText, setSearchText] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams(); // Get search parameters

    useEffect(() => {
        // Check for 'input_query' in the URL and set it as the initial value
        const inputQuery = searchParams.get('input_query');
        if (inputQuery) {
            setSearchText(inputQuery);
        }
    }, [searchParams]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Create URLSearchParams from existing searchParams
        const queryParams = new URLSearchParams(searchParams.toString());

        // Update or add the 'input_query' parameter
        if (searchText.trim()) {
            queryParams.set('input_query', searchText.trim());
        } else {
            // to show toast notification here
            return;
        }

        // Construct the new URL
        const newUrl = `${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        // Push new URL with or without query parameters
        router.push(newUrl);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                type='text'
                name='input_query'
                className='border border-2'
            />
            <button type='submit'>Submit</button>
        </form>
    );
};

export default HeaderSection;
