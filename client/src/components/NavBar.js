import React from 'react'
import "./NavBar.css"

export default function NavBar({ showAddItemForm, setShowAddItemForm }) {



    return (
        <div id="nav-bar">
            <i class="fas fa-stroopwafel"></i>
            <h1 onClick={() => setShowAddItemForm(false)}>Maria's closet</h1>
            {showAddItemForm ?
                <button onClick={() => setShowAddItemForm((showItemForm) => !showItemForm)} id="add-item-button"> Your Closet</button> :
                <button onClick={() => setShowAddItemForm((showItemForm) => !showItemForm)} id="add-item-button"> Add New Items</button>}

        </div>
    )
}
