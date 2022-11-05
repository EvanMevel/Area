import TokenGuard from "../components/TokenGuard";
import CreateArea from "../components/CreateArea";
import {useRouter} from "next/router";

export default function create() {
    const router = useRouter();

    function created() {
        router.push("/app")
    }

    return <TokenGuard>
        <CreateArea created={created}/>
    </TokenGuard>
}