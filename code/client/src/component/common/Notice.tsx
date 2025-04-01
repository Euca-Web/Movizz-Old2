import { useEffect, useState } from "react";

const Notice = () => {
    const [notice, setNotice] = useState<string>();

    
    useEffect(() => {
        const message = window.sessionStorage.getItem("notice");
        // window.sessionStorage.removeItem("notice");
        if
            (message) {
            setNotice(message as string);
            window.sessionStorage.removeItem("notice");
        }
}, []);
return notice ? <p>{notice}</p> : null;
}
export default Notice