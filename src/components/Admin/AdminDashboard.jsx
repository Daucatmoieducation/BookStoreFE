import React, { useState } from 'react';
import Sidebar from './Sidebar';
import BookManagement from './BookManagement';
import AccountManagement from './AccountManagement';
import CategoryManagement from './CategoryManagement';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('books');
    const navigate = useNavigate();

    const handleLogout = () => {
        // Xóa token/session nếu cần
        localStorage.removeItem('authToken');
        navigate('/');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'books':
                return <BookManagement />;
            case 'accounts':
                return <AccountManagement />;
            case 'categories':
                return <CategoryManagement />;
            default:
                return <BookManagement />;
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.sidebarContainer}>
                <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
                <button 
                    onClick={handleLogout}
                    style={styles.sidebarLogoutButton}
                >
                    <i className="bi bi-box-arrow-right"></i> Đăng xuất
                </button>
            </div>
            
            <div style={styles.mainContent}>
                
                
                <div style={styles.content}>
                    <div style={styles.card}>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f4f9',
        minHeight: '100vh',
    },
    sidebarContainer: {
        width: '240px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#343a40',
        color: 'white',
        position: 'relative', // Cần thiết để nút logout định vị đúng
    },
    sidebarLogoutButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        padding: '12px 15px',
        borderRadius: '0',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        width: '100%',
        position: 'absolute',
        bottom: '0',
        left: '0',
        transition: 'background-color 0.3s',
    },
    mainContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '0 20px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: '1.5rem',
        color: '#333',
        margin: 0,
    },
    content: {
        padding: '20px',
        flex: 1,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '20px',
    },
};

export default AdminDashboard;
