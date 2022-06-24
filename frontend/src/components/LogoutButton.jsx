import React from 'react';

export default function LogoutButton({handleLogout}) {
    function logout () {
        handleLogout();
    }

    return (
    <div>
        <button onClick={logout} className='logoutbutton' type="button">
            Logout
        </button>
    </div>
  )
}
