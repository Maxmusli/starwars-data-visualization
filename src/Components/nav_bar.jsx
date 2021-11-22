import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationBar = () => {
    return (
        <div className="navigation-wrapper">
            <div className="navigation-container">
                <NavLink
                    to="/bar-chart"
                    activeClassName="active"
                >
                    Bar Chart
                </NavLink>
                <NavLink
                    to="/table"
                    activeClassName="active"
                >
                    Table
                </NavLink>
            </div>
        </div>
    )
}

export default NavigationBar;