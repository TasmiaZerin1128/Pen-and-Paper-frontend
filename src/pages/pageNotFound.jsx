import Navbar from "../components/navbar/navbar";

export default function PageNotFound () {
    return (
        <>
        <Navbar />
            <div className="notFound" style={{width: "100%", textAlign: "center"}}>
                <img style={{width: "50%", margin: "3rem auto 2rem"}} src="\src\assets\images\notFound.png" />
            </div>
            <h2 style={{textAlign: "center", fontWeight: "100"}}>We can’t seem to find the page you’re looking</h2>
        </>
    )
}