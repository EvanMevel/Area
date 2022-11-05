import React, {useEffect, useState} from "react";
import {getAreaList} from "../api";
import Area from "./Area";

export default function AreaList() {
    const [areas, setAreas] = useState(null);

    async function callAreas() {
        const token = localStorage.getItem("token");
        try {
            const {data} = await getAreaList(token);

            const rows = data.map((area) => <Area data={area} token={token} refresh={callAreas}></Area>)

            setAreas(rows);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        callAreas();
    }, [])

    return <div>
        {
            areas != null && (
                <div>
                    <div>AREAS {areas.length}</div>
                    {areas}
                </div>
            )
        }
    </div>

}