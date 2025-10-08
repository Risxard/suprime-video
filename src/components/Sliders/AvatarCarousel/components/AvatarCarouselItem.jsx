import "./AvatarCarouselItem.css";

const AvatarCarouselItem = ({ avatar, onSelect }) => {
  return (
    <div className="avatar-carousel-item" onClick={() => onSelect(avatar)}>
      <div className="avatar-carousel-item-image">
        <img src={avatar.img?.url} alt="" />
      </div>
    </div>
  );
};

export default AvatarCarouselItem;
