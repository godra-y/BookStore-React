import './style.css';

const Genre = ({image, title}) => {
    return (
        <div className="genre">
            <img src={image} alt={title} className="genre__image" />
            <h4 className="genre__title">{title}</h4>
        </div>
    )
};

export default Genre;