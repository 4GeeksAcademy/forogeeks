import React, { useEffect } from "react";


export const UserThreads = ({id}) => {
    const {store, actions} = useContext(Context);

    useEffect(() => {
        actions.getAllTreadsByUserId(id)
    }, []);
    return (
        <div>
            <h1>UserThreads</h1>
        </div>
    );
}