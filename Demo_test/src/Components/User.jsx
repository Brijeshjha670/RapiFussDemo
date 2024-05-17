import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "./User.css";

const User = () => {
    const [userData, setUserData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUserData, setFilteredUserData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
                setUserData(response.data.data);
                setTotalPages(response.data.total_pages);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch user data.');
                setLoading(false);
            }
        };

        fetchUserData();
    }, [page]);

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            setFilteredUserData([]);
            return;
        }
        const searchResult = userData.filter(user => user.id.toString() === searchQuery.trim());
        setFilteredUserData(searchResult);
    };

    return (
        <div>
            <div  className='main_div'>
                <h3>User Data</h3>
                <div className="user-grid">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Enter User ID"
                    />
                    <button className='pagination_btn' onClick={handleSearch}>Search</button>
                </div>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading && <p>Loading...</p>}

            {filteredUserData.length > 0 ? (
                <div className='user_card_style' >
                    {filteredUserData.map(user => (
                        <div key={user.id} className='searched_card' >
                            <p>{user.first_name} {user.last_name}</p>
                            <p>{user.email}</p>
                            <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className='user_card_style'>
                    {userData.map(user => (
                        <div key={user.id} className="user-card">
                            <p>{user.first_name} {user.last_name}</p>
                            <p>{user.email}</p>
                            <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
                        </div>
                    ))}
                </div>
            )}
            <div className='preview_btn'  >
                <button className='pagination_btn' onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                <button className='pagination_btn' onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default User;
