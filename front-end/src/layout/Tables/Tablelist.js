import React, {useState} from "react";
import { listTables } from "../../utils/api";

function Tablelist ({tables}) {
const [isFree, setIsFree] = useState(true)

const tables = listTables();
const tableList =  tables.map(table => {
        return (
            <div>
                <div data-table-id-status={table.table_id}>
                    {isFree === true ? "Free" : "Occupied"}
                </div>
                {/*
                <div>
             <p>{table.name}</p>
             <p>{table.capacity}</p>
                </div>
                */}
            </div>
        )
        })
    

    return (
        <div>
        <div>
            <p>Tablelist</p>
            </div>
        </div>
    )
}

export default Tablelist;