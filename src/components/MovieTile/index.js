import './index.css';

const MovieTile = (props) => {
    const { movie_title
        , posterUrl, actors, onMovieClick } = props;

    const imgStyle = {
        backgroundImage: `url(${posterUrl})`
    }

    return (
        <div className="tileContainer" onClick={onMovieClick}>
            <div className="tileContent" style={imgStyle} />
            <div>{movie_title}</div>
            <div className="actorsText">{actors}</div>
        </div>
    )
};

export default MovieTile;