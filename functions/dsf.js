import React, { useEffect, useState } from 'react';

function Me(props) {

    const [cry, setCry] = useState(false)
    const [happy, setHappy] = useState(true)
    const [relationship, setRelationship] = useState(false)

    useEffect(() => {

        setHappy(true)
        setCry(true)

        if (relationship) {
            setHappy(true)
        } else {
            setCry(true)
        }

    }, [relationship])

    return (
        <div>
            is happy {happy ? 'yes' : 'no'}
            is crying {cry ? 'yes' : 'no'}
        </div>
    );
}

export default Me;