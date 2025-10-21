import './style.css';

const Author = ({image, name}) => {
    return (
        <div className="author">
            <img src={image} alt={name} className="author__image" />
            <h4 className="author__name">{name}</h4>
        </div>
    )
};

export default Author;