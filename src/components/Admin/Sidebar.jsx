import React from 'react';

const Sidebar = ({ activeTab, onTabChange }) => {
    const menus = [
        { key: 'books', icon: 'bi-book', label: 'Quản lý sách' },
        { key: 'accounts', icon: 'bi-people', label: 'Quản lý tài khoản' },
        { key: 'categories', icon: 'bi-tags', label: 'Quản lý danh mục' },
    ];

    return (
        <div style={{ padding: '20px', flex: 1 }}>
            <h2 className="text-center mb-4" style={{ color: 'white' }}>Admin Panel</h2>
            <ul className="nav flex-column">
                {menus.map(menu => (
                    <li className="nav-item mb-2" key={menu.key}>
                        <button
                            className={`nav-link text-start w-100 btn ${activeTab === menu.key ? 'active btn-primary' : 'text-white'}`}
                            onClick={() => onTabChange(menu.key)}
                            style={{ 
                                backgroundColor: activeTab === menu.key ? '#007bff' : 'transparent',
                                border: 'none'
                            }}
                        >
                            <i className={`bi ${menu.icon} me-2`}></i>
                            {menu.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;