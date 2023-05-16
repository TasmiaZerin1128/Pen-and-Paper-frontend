import { useNavigate } from "react-router-dom";

export default function PageNotFound () {
    const navigate = useNavigate();

    return (
        <>
            <div className="notFound" style={{width: "100%", textAlign: "center"}}>
                <img style={{width: "50%", margin: "3rem auto 2rem"}} src="/images/notFound.png" />
            </div>
            <h2 style={{textAlign: "center", fontWeight: "100"}}>We can’t seem to find the page you’re looking</h2>
            <h1 style={{textAlign: "center", marginTop: "2rem", cursor: "pointer"}} onClick={() => navigate('/')}>←  Go back</h1>
        </>
    )
}