import React, { useEffect } from 'react'
import { useAppBarContext } from '../../layouts/main/MainLayout';

const SettingsScreen = () => {
    const appBarContext = useAppBarContext();

    useEffect(() => {
        appBarContext.setTitle('Settings');
    }, []);

    return (
        <div>
            
        </div>
    )
}

export default SettingsScreen
