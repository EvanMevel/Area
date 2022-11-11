import {useParams} from "react-router-dom";

export default function App() {
    let { id } = useParams();
    return (
        <div>
            <h3>ID: {id}</h3>
        </div>
    );
}