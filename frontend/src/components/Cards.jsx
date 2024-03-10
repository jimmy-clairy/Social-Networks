export default function Cards({ item }) {
    // console.log(item);
    return (
        <div className="card-container">
            <h2>{item.posterPseudo}</h2>
            <h3>{item.message}</h3>
            <img src={'./public/uploads/' + item.picture} width={300} alt="img user" />
        </div>
    )
}