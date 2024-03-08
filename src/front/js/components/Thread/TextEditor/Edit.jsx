import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Editpost from './Editpost.jsx';

export const Edit = (props) => {
    useEffect(() => {
        viewPostId(props.match.params.postID);
    }, []);

    const [ispostId, setpostId] = useState([]);
    const viewPostId = async (ids) => {
        try {
            await axios.post(`http://localhost:8080/getPostId`, {
                ids: props.match.params.postID
            })
                .then(res => {
                    if (res.data.success === true) {
                        setpostId(res.data.listId);
                    }
                })
        } catch (error) { throw error; }
    }

    return (
        <>
            {ispostId.length > 0 ? <>
                <Editpost postList={ispostId} editPostID={props.match.params.postID} />
            </> : null}

        </>
    )
}
