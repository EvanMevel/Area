import React, {useEffect, useState} from "react";
import {getAreaList, getUserInfo} from "../api";
import Area from "./Area";

export default function AreaList() {
    const [areas, setAreas] = useState(null);

    async function callAreas() {
        const {data, error} = await getAreaList();
        if (error) {
            return console.error(error);
        }

        const rows = data.map((area) => <Area area={area} refresh={callAreas}></Area>)

        setAreas(rows);
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